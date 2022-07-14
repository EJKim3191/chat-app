import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, sendEmailVerification, updateProfile } from "firebase/auth";
import { authService } from "./firebaseInstance";

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