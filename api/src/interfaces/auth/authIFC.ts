import { UserCredential } from "firebase/auth";

interface AuthServiceIFC {
    signIn(email : string, password : string) : Promise<string>;
    signOut(sessionCookie : string | null) :  Promise<void>;
    register(email: string, password: string) : Promise<UserCredential>;
    generateToken(idToken : string , csfrToken: string) : Promise<string>; //return a token to use as session Cookie
    verifyToken(sessionCookie: string): Promise<any>; //Return the user UID

}

export { AuthServiceIFC }