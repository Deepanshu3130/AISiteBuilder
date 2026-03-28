import express from "express";
import { createUserProject, getAllUserProjects, getUserCredits, getUserProjects, togglePublish } from "../controllers/userController";
import { protect } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.get('/credits' ,protect, getUserCredits);
userRouter.post('/project' ,protect, createUserProject);
userRouter.post('/project/:projectId' ,protect, getUserProjects);
userRouter.post('/projects' ,protect, getAllUserProjects);
userRouter.post('/publish-toggle/:projectId' ,protect, togglePublish);
// userRouter.post('/purchase-credits' ,protect, togglePublish);


export default userRouter