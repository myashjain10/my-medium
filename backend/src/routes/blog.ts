import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {blogCreateSchema, blogUpdateSchema} from "@myashjain10/medium-zod-schemas"

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables:{
    userId: string
  }
}>()//assigning type to DATABASE_URL

//auth middleware
blogRouter.use("/*", async (c , next)=>{
  const header = c.req.header("Authorization") || ""; 
  // If sent as Bearer token, then split and extract token
  try{
    const response = await verify(header, c.env.JWT_SECRET);
    if (response){
      c.set('userId', response.id as string)
      await next()
    } else {
      c.status(403);
      return c.json({ error: "unauthorised"});
    }
  }catch(e){
    c.status(403);
    return c.json({
      message: "Please Log in"
    });
  }
})

// create a new blog
blogRouter.post('/', async (c) => {

  const body = await c.req.json();

  const { success } = blogCreateSchema.safeParse(body)
  if(!success){
    c.status(411);
    return c.text("Incorrect inputs");
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userid = c.get("userId")

  try{
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userid
      }
    })

    return c.json({
      id: blog.id
    })
  }catch(e){
    c.status(403);
    return c.text("Incorrect Inputs")
  }

})

// update an existing blog
blogRouter.put('/', async (c) => {
  const body = await c.req.json();

  const { success } = blogUpdateSchema.safeParse(body)
  if(!success){
    c.status(411);
    return c.text("Incorrect inputs");
  }
  
  //db connection
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userid = c.get("userId")
  try{
    const blog = await prisma.blog.update({
      where:{
        id:body.id
      },
      data: {
        title: body.title,
        content: body.content,
        authorId: userid
      }
    })

    return c.json({
      id: blog.id
    })
  }catch(e){
    c.status(403);
    return c.text("Incorrect Inputs while updating blog")
  }  
})

//get blog in bulk
blogRouter.get('/bulk', async (c) => {
  console.log("entered the route")
  const userid = c.get("userId");
  console.log(userid)

  if (!userid) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try{
    const blogs = await prisma.blog.findMany({
      select:{
        id:true,
        title: true,
        content: true,
        published: true,
        author:{
          select:{
            name:true
          }
        }
      }
    });//should be paginated

    return c.json({
      "blogs":blogs
    })
  }catch(e){
    c.status(403);
    return c.text("blogs could not be fetched")
  }
})

//get blog with id
blogRouter.get('/:id', async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userid = c.get("userId")
  try{
    const blog = await prisma.blog.findFirst({
      where:{
        id: id
      },
      select:{
        title: true,
        content: true,
        published: true,
        author:{
          select:{
            name:true
          }
        }
      }
    })

    return c.json({
      blog
    })
  }catch(e){
    c.status(403);
    return c.text("Incorrect Inputs fetching one blog")
  } 

})
