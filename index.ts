import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
const app = express();
const port = 8000;

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
  res.setHeader("Access-Control-Max-Age", "3000")
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, x-access-token, x-user-id,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next()
})



const prisma = new PrismaClient();

app.get('/posts', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

app.post('/posts', async ( req:Request, res:Response ) => {
  const { title, status, detail } = req.body;
  try{
  const post = await prisma.post.create({
    data: {
      title,
      status,
      detail,
    },
  });
  return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
})

app.put('/posts/:id', async ( req:Request, res:Response ) => {
  const { title, status, detail } = req.body;
  const id = Number(req.params.id);

  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        status,
        detail, 
      }
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
})

app.delete('/posts/:id', async ( req:Request, res:Response ) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
    return res.json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));