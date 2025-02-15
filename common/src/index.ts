import z from "zod";

export const signupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})

export const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
})

export const blogCreateSchema = z.object({
  title: z.string(),
  content: z.string()
});

export const blogUpdateSchema = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string()
});


//type inference in zod
export type SignupInput = z.infer<typeof signupSchema>
export type SiginInput = z.infer<typeof signinSchema>
export type BlogCreateInput = z.infer<typeof blogCreateSchema>
export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>