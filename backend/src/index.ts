import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()//assigning type to DATABASE_URL

app.get("/",(c)=> c.text("Hello Hono"))

//sign in
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app
