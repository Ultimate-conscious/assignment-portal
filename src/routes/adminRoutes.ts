import { Router } from "express";

export const adminRouter = Router();

adminRouter.get('/', (req, res) => {
  res.send('Admin Page');
});

adminRouter.post('/register', (req, res) => {
    res.send('Admin Page');
});
  
adminRouter.post('/login', (req, res) => {
      res.send('Admin Page');
});
  
adminRouter.post('/upload', (req, res) => {
      res.send('Admin Page');
});
  
adminRouter.get('/admins', (req, res) => {
      res.send('Admin Page');
});