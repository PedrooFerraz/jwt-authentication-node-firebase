import express from "express";
import { PermissionController } from "@/controllers/user/permissionController";
const Controller = new PermissionController
const permissionRouter = express.Router();

permissionRouter.get("/user/:id", Controller.getPermissionsByUserId)
permissionRouter.get("/module/:id", Controller.getPermissionsByUserId)
permissionRouter.post("/", Controller.createPermission)
permissionRouter.patch("/", Controller.updatePermission)

export default permissionRouter;