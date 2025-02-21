import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinSchema, signupSchema } from "@myashjain10/medium-zod-schemas";

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();


userRouter.post('/signup',async (c) => {
  const body = await c.req.json();
  console.log("before signup validation")

  const { success } = signupSchema.safeParse(body);
  if(!success){
    c.status(411);
    return c.text("Incorrect signup inputs");
  }

  console.log("after signup dvalidation");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    console.log('inside try block')
    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
      }
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
        jwt: token
      });

  }catch(e){
    c.status(403);
    return c.text("Incorrect Inputs")
  }
})

//sign in
userRouter.post('/signin',async (c) => {
  const body = await c.req.json();

  const { success } = signinSchema.safeParse(body)
    if(!success){
      c.status(411);
      return c.text("Incorrect signin inputs");
    }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  try{ 
    const user = await prisma.user.findFirst({
      where:{
        email: body.email,
        password: body.password
      }
    })
    if(!user){
      c.status(403);
      return c.json({
        error: "User not found"
      });
    }
    
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
      jwt: token
    })

  }catch(e){
    c.status(403);
    return c.text("Invalid Inputs for signin")
  }
})
