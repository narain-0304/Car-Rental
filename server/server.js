import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDb from './configs/db.js';
import userRouter from './routes/userRouter.js';
import profileRouter from './routes/profileRouter.js';
import connectCloudinary from './configs/Cloudinary.js';
import adminRoutes from './routes/adminRoutes.js';
import carRoutes from './routes/carRoutes.js';
import Bookingroutes from './routes/BookingRoutes.js';
import { stripeWebhook } from './controller/bookingController.js';

const app = express();
const allowedOrigins = ['http://localhost:5173','https://rentro-woad.vercel.app']
await connectDb();
await connectCloudinary();
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhook);

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));
app.use('/api/user',userRouter);
app.use('/api/profile',profileRouter)
app.use('/api/admin',adminRoutes)
app.use('/api/cars',carRoutes)
app.use('/api/booking',Bookingroutes)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Api is running successfully!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});