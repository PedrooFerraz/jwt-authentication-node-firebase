export interface userIFC {
    id: number
    uid: string
    name: string
    email: string
    status: number // 0: active, 1: inactive
}

export interface userServiceIFC {
    getAllUser() : Promise<userIFC[]>;
    getUserById(id: number) : Promise<userIFC | null>;
    getUserByEmail(email: string) : Promise<userIFC | null>;
    getUserByUid(uid: string) : Promise<userIFC | null>;
    createUser(userData : Partial<userIFC>) : Promise<userIFC>;
    updateUser(id: number, userData: Partial<userIFC>) : Promise<userIFC | null>;
    desactiveUser(id: number) : Promise<void>;
    reactivateUser(id: number) : Promise<void>;
}