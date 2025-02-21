import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()//assigning type to DATABASE_URL

app.use("/api/*", cors());
app.get("/",(c)=> c.text("Hello Hono"))

//sign in
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


export default app
