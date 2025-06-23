import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware';
import { asyncHandler } from './middlewares/asyncHandler';
import { csrfMiddleware } from './middlewares/csrfMiddleware';
import { csrfRouter } from './routes/csrfRoute';
import { authRouter } from './routes/authRoute';
import { userRouter } from './routes/userRoute';
import permissionRouter from './routes/permissionRoute';
import { permissionMiddleware } from './middlewares/permissionMiddleware';
import "@/types/express"

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true,
}))

app.use("/api", csrfRouter)
app.use(csrfMiddleware);
app.use("/api/auth", authRouter)
app.use(asyncHandler(authMiddleware));
app.use(asyncHandler(permissionMiddleware))

// Routes
app.use("/api/permission", permissionRouter)
app.use("/api/user", userRouter);


// Global error handler
app.use(errorHandler);

export default app;