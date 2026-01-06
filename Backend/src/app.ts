import express from "express";
import cors from "cors";
import postRoutes from "./routers/post.routes";
import categoryRoutes from "./routers/category.routes";
import tagRoutes from "./routers/tag.routes";
import commentRoutes from "./routers/comment.routes";

const PORT = parseInt(`${process.env.PORT || 3333}`);
const app = express();

app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(categoryRoutes);
app.use(tagRoutes);
app.use(commentRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

export default app;
