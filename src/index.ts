import express from 'express';
import { config } from 'dotenv';
import { userRouter } from './routes/userRoutes';
import { adminRouter } from './routes/adminRoutes';
import connectDB from './dbConnect';
config();

const PORT = parseInt(process.env.PORT || '');

const app = express();
connectDB();

//for parsing the body of the request
app.use(express.json());

//segrating the routes for user and admin
app.use('/user',userRouter);
app.use('/admin',adminRouter);

app.get('/health-check', (req, res) => {
  res.json({
    message: 'Server is live'
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})