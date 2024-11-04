import e, { Router } from "express";
import { adminRouter } from "./admin";
import { spaceRouter } from "./space";
import { userRouter } from "./user";
import { SignupSchema, SigninSchema } from "../../types";
import { PrismaClient, Role } from "@prisma/client";
import jwt from "jsonwebtoken";
;

export const router = Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  try {
    const { username, password, type } = SignupSchema.parse(req.body);

    if (type === "user") {
     const user =  await prisma.user.create({
        data: {
          username,
          password,
          role: "User",
        },
      });
      res.status(200).json({id:user.id});
    } else {
      const admin = await prisma.user.create({
        data: {
          username,
          password,
          role: "Admin",
        },
      });
      res.status(200).json({ id:admin.id });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = SigninSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id:true,
        username: true,
        password: true,
        role: true,
      },
    });

    if (user) {
      if (user.password === password) {
       const token = jwt.sign({ userId: user.id,role: user.role }, process.env.JWT_SECRET! || "ankit");
         res.json({
            token
        })
      } else {
        res.status(400).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});


router.get("/avatars",async (req,res)=>{
    //@ts-ignore
   
    const avatars =  await prisma.avatar.findMany()
    res.json({avatars:avatars.map(avatar=>({
        id: avatar.id,
        imageUrl: avatar.imageUrl,
        name: avatar.name,
    }))})
})


router.get("/elements",async(req,res)=>{
    const data = await prisma.element.findMany()
    res.json({data:data.map(element =>({
    id: element.id,
    width: element.width,
    height: element.height,
    static: element.static,
    imageUrl: element.imageUrl,
   }))})
})


router.use("/user", userRouter)
router.use("/space", spaceRouter)
router.use("/admin", adminRouter)