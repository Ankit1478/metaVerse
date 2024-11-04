import { Router } from "express";
import { Request, Response } from "express";
import { isUserAuthenticated } from "../../middlewares/user";

import { AddElementSchema, CreateSpaceSchema, DeleteElementSchema } from "../../types";
import express from 'express'
const app = express()
import { PrismaClient, Role } from "@prisma/client";
export const prisma = new PrismaClient();
export const spaceRouter = Router();

app.use(isUserAuthenticated)

//create space 
spaceRouter.post("/", isUserAuthenticated , async (req, res) => {

    const parsedData = CreateSpaceSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log(JSON.stringify(parsedData))
        res.status(400).json({message: "Validation failed"})
        return
    }
    //@ts-ignore
   
    if (!parsedData.data.mapId) {
        const space = await prisma.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),//@ts-ignore
                creatorId: req.user.userId
            }
        });
        res.json({spaceId: space.id})
        return;
    }
    
    const map = await prisma.map.findFirst({
        where: {
            id: parsedData.data.mapId
        }, select: {
            mapElements: true,
            width: true,
            height: true
        }
    })
   
    if (!map) {
        res.status(400).json({message: "Map not found"})
        return
    }

    let space = await prisma.$transaction(async () => {
        const space = await prisma.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,//@ts-ignore
                creatorId: req.user.userId!,
            }
        });

        await prisma.spaceElement.createMany({
            data: map.mapElements.map(e => ({
                spaceId: space.id,
                elementId: e.elementId,
                x: e.x!,
                y: e.y!
            }))
        })

        return space;

    })
   
    res.json({spaceId: space.id})
})


//delete a element inside the space 
spaceRouter.delete("/element",isUserAuthenticated,async(req:Request,res:Response)=>{
    const parsedData = DeleteElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const spaceElement = await prisma.spaceElement.findFirst({
        where: {
            id: parsedData.data.id
        }, 
        include: {
            space: true
        }
    })
    //@ts-ignore
    if (!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.user.userId) {
        res.status(403).json({message: "Unauthorized"})
        return
    }
    await prisma.spaceElement.delete({
        where: {
            id: parsedData.data.id
        }
    })
    res.json({message: "Element deleted"})
})
//Delete a space
spaceRouter.delete("/:spaceId", isUserAuthenticated, async(req, res) => {
    console.log("req.params.spaceId", req.params.spaceId)
    const space = await prisma.space.findUnique({
        where: {
            id: req.params.spaceId
        }, select: {
            creatorId: true
        }
    })
    if (!space) {
        res.status(400).json({message: "Space not found"})
        return
    }

    //@ts-ignore
    if (space.creatorId !== req.user.userId) {
        console.log("code should reach here")
        res.status(403).json({message: "Unauthorized"})
        return
    }

    await prisma.space.delete({
        where: {
            id: req.params.spaceId
        }
    })
    res.json({message: "Space deleted"})
})


//get all Element of a space for that user 
//@ts-ignore
spaceRouter.get("/all",isUserAuthenticated,async(req,res)=>{
    const space = await prisma.space.findMany({
        where:{//@ts-ignore
            creatorId:req.user.userId
        }
    })
    return res.json({spaces : space.map(s =>({
        id:s.id,
        name:s.name,
        dimensions:`${s.width}x${s.height}`,
        thumbnail:s.thumbnail,
    }))})
})

//Add an element to space 
spaceRouter.post("/element", isUserAuthenticated, async (req, res) => {
    const parsedData = AddElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const space = await prisma.space.findUnique({
        where: {
            id: req.body.spaceId, //@ts-ignore
            creatorId: req.userId!,
        }, select: {
            width: true,
            height: true
        }
    })

    if(req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!) {
        res.status(400).json({message: "Point is outside of the boundary"})
        return
    }

    if (!space) {
        res.status(400).json({message: "Space not found"})
        return
    }
    await prisma.spaceElement.create({
        data: {
            spaceId: req.body.spaceId,
            elementId: req.body.elementId,
            x: req.body.x,
            y: req.body.y
        }
    })

    res.json({message: "Element added"})
})






spaceRouter.get("/:spaceId",async (req, res) => {
    const space = await prisma.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            elements: {
                include: {
                    element: true
                }
            },
        }
    })

    if (!space) {
        res.status(400).json({message: "Space not found"})
        return
    }

    res.json({
        "dimensions": `${space.width}x${space.height}`,
        elements: space.elements.map(e => ({
            id: e.id,
            element: {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static
            },
            x: e.x,
            y: e.y
        })),
    })
})