import express, { Request, Response } from "express";
import { router } from "./routes/v1"; 
import { PrismaClient, Role } from "@prisma/client";


const app = express();
app.use(express.json());

app.use("/api/v1", router);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

