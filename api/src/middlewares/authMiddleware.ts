import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth/authService';
const Service = new AuthService()

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.session;
    if (!token) {
        return res.status(401).json({ message: 'No Token Provided' });
    }

    try {
        const decoded = await Service.verifyToken(token);
        req.user = decoded.uid;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};