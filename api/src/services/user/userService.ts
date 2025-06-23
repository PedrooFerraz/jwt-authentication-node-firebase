
import { User } from "@/models/user/user.model";
import { userServiceIFC, userIFC } from "@/interfaces/user/user.interface";

export class UserService implements userServiceIFC {

    async getAllUser(): Promise<userIFC[]> {
        return User.findAll();
    }

    async getUserById(id: number): Promise<userIFC | null> {
        return User.findByPk(id) || null;
    }

    async getUserByEmail(email: string): Promise<userIFC | null> {
        return User.findOne({ where: { email } }) || null;
    }

    async getUserByUid(uid: string): Promise<userIFC | null> {
        return User.findOne({ where: { uid } }) || null;
    }

    async createUser(userData: Partial<userIFC>): Promise<userIFC> {
        const newUser = await User.create({
            uid: userData.uid || '',
            name: userData.name || '',
            email: userData.email || '',
        });
        return newUser;
    }

    async updateUser(id: number, userData: Partial<userIFC>): Promise<userIFC | null> {
        const user = await User.findByPk(id);
        if (!user) return null;

        await user.update(userData);
        return user;
    }

    async desactiveUser(id: number): Promise<void> {
        const user = await User.findByPk(id);
        if (user) {
            user.status = 1; // Set status to inactive
            await user.save();
        }
    }
    async reactivateUser(id: number): Promise<void> {
        const user = await User.findByPk(id);
        if (user) {
            user.status = 0; // Set status to active
            await user.save();
        }
    }

}
