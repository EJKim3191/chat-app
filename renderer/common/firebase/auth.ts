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
        console.log(error.code)
        if(error.code === "auth/email-already-in-use") alert("사용중인 이메일입니다!")
        return error;
    }
    
} 

export const signInWithEmail = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(authService, email, password);
        return response;
    } catch (error) {
        console.log(error);
        if(error.code === "auth/user-not-found") alert("아이디 혹은 비밀번호를 확인해주세요")
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