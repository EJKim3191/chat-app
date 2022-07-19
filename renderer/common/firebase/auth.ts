import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, sendEmailVerification, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { ref, set } from "@firebase/database";
import { authService, realtimeDbService } from "./firebaseInstance";

export const signUpWithEmail = async (email, password, nickname) => {
    try {
        const response = await createUserWithEmailAndPassword(authService, email, password)
        .then((res)=>{
            console.log(res)
            updateProfile(authService.currentUser, {
                displayName: nickname
            })
        })
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
    
} 

export const signInWithEmail = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(authService, email, password);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(authService, provider);
        const response = await getRedirectResult(authService);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const sendEmail = async () => {
    try {
        const response = await sendEmailVerification(authService.currentUser);
        return response;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return [errorCode, errorMessage];
    }
}

export const getMyUID = () => {
    try {
        const uid: string = authService.currentUser.uid;
        return uid;
    } catch (error) {
        console.log(error);
    }
    
}

export const passwordReset = async (email) => {
    try {
        sendPasswordResetEmail(authService, email)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    }
}

export const userSignOut = async () => {
    const uid = authService.currentUser.uid;
    const myConnectionsRef = ref(realtimeDbService, `users/${uid}/connected`); 
    try {
        signOut(authService);
        set(myConnectionsRef, false);
    } catch (error) {
        console.log(error);
    }
    
}