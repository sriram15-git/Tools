import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4001;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "☕ Namma Chai – The Heartbeat of Evenings at VIT",
    content:
      "Amid the buzzing campus life of VIT, there’s one spot that never fails to bring students together — Namma Chai. Whether it’s a rainy evening, a late-night study break, or just a casual chat after class, this cozy tea stall has become the unofficial hangout spot for many With the aroma of freshly brewed chai filling the air, Namma Chai serves comfort in every cup. From classic ginger chai to refreshing lemon tea, and crispy samosas on the side, it’s a treat that perfectly balances taste and nostalgia.",
    author: "sriram",
    date: "10/11/2025, 12:12:42 am",
  },
  {
    id: 2,
    title: "🏢 Technology Tower – The Nerve Centre of Innovation",
    content:
      "Amid the sprawling campus of VIT, the Technology Tower stands tall as a beacon of innovation and progress. Housing cutting-edge labs, collaborative spaces, and startup incubators, it’s where ideas take shape and dreams turn into reality. Whether it’s late-night coding sessions or brainstorming breakthroughs, Tech Tower fuels the spirit of invention at VIT.",
    author: "saranshu❤️",
    date: "15/08/2025, 10:02:42 am",
  },
  {
    id: 3,
    title: "🏫 Silver Jubilee Tower (SJT) – Where Every Path Begins",
    content:
      "The Silver Jubilee Tower, fondly called SJT, is where most journeys at VIT begin. With its bustling classrooms, ever-crowded corridors, and aroma of morning coffee, it captures the true rhythm of student life. From first lectures to final submissions, SJT holds the memories of every VITian’s academic adventure.",
    author: "pranavo",
    date: "06/09/2025, 11:12:22 am",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
