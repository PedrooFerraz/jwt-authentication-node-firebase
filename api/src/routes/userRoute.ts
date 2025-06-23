import express from "express";
import { UserController } from "@/controllers/user/userController";
import { AuthorizeAccess } from "@/middlewares/authorizeAccessMiddleware";

const Controller = new UserController();
const userRouter = express.Router();

userRouter.get("/", AuthorizeAccess(1,"can_read"), Controller.getAllUsers);
userRouter.get("/:id", AuthorizeAccess(1,"can_read"), Controller.getUserById);
userRouter.get("/email/:email", AuthorizeAccess(1,"can_read"), Controller.getUserByEmail);
userRouter.get("/uid/:uid", AuthorizeAccess(1,"can_read"), Controller.getUserByUid);
userRouter.post("/", AuthorizeAccess(1,"can_write"), Controller.createUser);
userRouter.patch("/:id", AuthorizeAccess(1,"can_write"), Controller.updateUser);
userRouter.patch("/desactive/:id", AuthorizeAccess(1,"can_write"), Controller.desactiveUser);
userRouter.patch("/reactivate/:id", AuthorizeAccess(1,"can_write"), Controller.reactivateUser);

export { userRouter };