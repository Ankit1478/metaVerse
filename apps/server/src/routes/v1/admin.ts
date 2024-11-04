import { Router } from "express";
import express from 'express'
const app = express()

import { isAdminAuthenticated } from "../../middlewares/admin";
import { prisma } from "../../prismaClient";
import { CreatAvatarSchema, CreatElementSchema, CreatMapSchema, UpdateElementSchema } from "../../types";

app.use(isAdminAuthenticated)
export const adminRouter = Router();



adminRouter.post("/element", async (req, res) => {
    const parsedData = CreatElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }

    const element = await prisma.element.create({
        data: {
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static,
            imageUrl: parsedData.data.imageUrl,
        }
    })

    res.json({
        id: element.id
    })
})
//@ts-ignore
adminRouter.put("/element/:elementId",async(req,res)=>{
    const parseBody = UpdateElementSchema.safeParse(req.body);

    if(!parseBody.success){
        res.status(400).json({message:parseBody.error})
        return
    }
    
    await prisma.element.update({
        where:{
            id:req.params.elementId
        },
        data:{
            imageUrl:parseBody.data.imageUrl
        }
    })
    return res.json({"message ":"element updated"})

})

adminRouter.post("/avatar", async (req, res) => {
    const parsedData = CreatAvatarSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const avatar = await prisma.avatar.create({
        data: {
            name: parsedData.data.name,
            imageUrl: parsedData.data.imageUrl
        }
    })
    res.json({avatarId: avatar.id})
})



adminRouter.post("/map", async (req, res) => {
    const parsedData = CreatMapSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const map = await prisma.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data.defaultElements.map(e => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y
                }))
            }
        }
    })

    res.json({
        id: map.id
    })
})
