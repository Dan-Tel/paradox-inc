import express from "express";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

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
