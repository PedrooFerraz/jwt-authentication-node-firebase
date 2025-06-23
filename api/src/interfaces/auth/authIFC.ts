interface AuthServiceIFC {
    signIn(email : string, password : string) : Promise<string>;
    signOut(sessionCookie : string | null) :  Promise<void>;
    register() : Promise<void>;
    generateToken(idToken : string , csfrToken: string) : Promise<string>; //return a token to use as session Cookie
    verifyToken(sessionCookie: string): Promise<any>; //Return the user UID

}

export { AuthServiceIFC }