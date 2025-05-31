import express from "express";
import cors from "cors";
import { router } from "./routes/auth.routes";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startServer();
