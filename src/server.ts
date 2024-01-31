import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || "3000";
const debug = process.env.debug;
app.listen(port, (env) => {
  if (debug === 1) {
    console.log(`Server listening on ${port}`);
  }
});
