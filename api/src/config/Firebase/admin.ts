import admin from "firebase-admin";
const fireConfig = require("./firebaseCredentials.json")

try {
    admin.initializeApp({
      credential: admin.credential.cert(fireConfig as admin.ServiceAccount),
    })
    console.log('Initialized.')
  } catch (error) {

    if (error instanceof Error && !/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack)
    }
  }

export { admin };