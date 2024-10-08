import { Router } from "express";

export const userRouter = Router();

userRouter.post('/register', (req, res) => {
  res.send('Admin Page');
});

userRouter.post('/login', (req, res) => {
    res.send('Admin Page');
});

userRouter.post('/upload', (req, res) => {
    res.send('Admin Page');
});

userRouter.get('/admins', (req, res) => {
    res.send('Admin Page');
});