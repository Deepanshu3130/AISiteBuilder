import express from "express";
import { createUserProject, getAllUserProjects, getUserCredits, getUserProjects, togglePublish } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get('/credits' ,protect, getUserCredits);
userRouter.post('/project' ,protect, createUserProject);
userRouter.get('/project/:projectId' ,protect, getUserProjects);
userRouter.get('/projects' ,protect, getAllUserProjects);
userRouter.get('/publish-toggle/:projectId' ,protect, togglePublish);
// userRouter.post('/purchase-credits' ,protect, togglePublish);


export default userRouter