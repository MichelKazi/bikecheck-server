import express, { Request, Response, Application } from "express";

const app: Application = express();
const port = process.env.PORT || 1337;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello world!",
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
