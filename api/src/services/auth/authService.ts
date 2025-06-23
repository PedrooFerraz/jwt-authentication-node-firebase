import { AuthServiceIFC } from "@/interfaces/firebase/auth.interface";
import { auth } from "@/config/Firebase/config"
import { admin } from "@/config/Firebase/admin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { serialize } from "cookie";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";


export class AuthService implements AuthServiceIFC {

    async signIn(email: string, password: string): Promise<string> {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken(true);
        const sessionCookie = await this.generateToken(idToken);
        auth.signOut();
        return sessionCookie;
    }

    async signOut(sessionCookie : string | null): Promise<void> {

        if(!sessionCookie){
            return
        }
        const decodedClaims = await this.verifyToken(sessionCookie)
        return admin.auth().revokeRefreshTokens(decodedClaims.sub)
    }

    async register(): Promise<void> {

    }

    async generateToken(idToken: string): Promise<string> {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; //5 days
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn })

        const cookie = serialize("session", sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict"
        });
        return cookie
    }

    async verifyToken(sessionCookie: string): Promise<DecodedIdToken> {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
        return decodedClaims
    }


}