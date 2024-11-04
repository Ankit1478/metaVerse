import { Router } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { isUserAuthenticated } from "../../middlewares/user";
import { UpdateMetadataSchema } from "../../types";
const prisma = new PrismaClient();
export const userRouter = Router();

//@ts-ignore
userRouter.post("/metadata", isUserAuthenticated, async (req, res) => {
    const { avatarId } = req.body;
    //@ts-ignore
    const userId = req.user?.userId;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing or invalid" });
    }
  
    try {
      // Check if the avatarId exists in the Avatar table
      const avatarExists = await prisma.avatar.findFirst({
        where: { id: avatarId },
      });
  
      if (!avatarExists) {
        return res.status(400).json({ message: "Invalid avatarId, avatar does not exist" });
      }
  
      // Proceed with updating the user's avatarId
      const avatar = await prisma.user.update({
        where: { id: userId },
        data: { avatarId: avatarId },
      });
  
      res.status(200).json({ message: "Avatar updated successfully", avatar });
    } catch (error) {
      console.error("HIII")
      console.error("Error updating avatar:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  
  


  userRouter.get("/metadata/bulk", async (req, res) => {
    const userIdString = (req.query.ids ?? "[]") as string;
    //1st -> remove the first and last character => remove the []
    //2nd -> split the string by comma => split by ,
    //3rd -> remove the empty string => remove the empty string and convert to array
    //exmaple -> "[1, 2, 3 , 4]" => "1, 2, 3 , 4" =>  "1" "2" "3" "4" => ["1", "2", "3", "4"]
    const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
    console.log(userIds)
    const metadata = await prisma.user.findMany({
        where: {
            id: {
                in: userIds
            }
        }, select: {
            avatar: true,
            id: true
        }
    })

    res.json({
        avatars: metadata.map(m => ({
            userId: m.id,
            avatarId: m.avatar?.imageUrl
        }))
    })
})