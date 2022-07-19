import {
    push,
    ref,
    set,
    serverTimestamp,
    limitToLast,
    onValue,
    onDisconnect,
    get,
    orderByValue,
    query,
    equalTo,
    remove,
} from "@firebase/database";
import { Timestamp } from "firebase/firestore";
import { authService, realtimeDbService } from "./firebaseInstance";

interface UserList {
    uid: string,
    displayName: string,
}

export const onUserConnect = () => {
    const uid = authService.currentUser.uid;
    const myConnectionsRef = ref(realtimeDbService, `users/${uid}/connected`); 
    const myDisplayNameRef = ref(realtimeDbService, `users/${uid}/displayName`) 
    // stores the timestamp of my last disconnect (the last time I was seen online)
    const lastOnlineRef = ref(realtimeDbService, `users/${uid}/lastOnline`);
    const connectedRef = ref(realtimeDbService, '.info/connected');
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        // const con = push(myConnectionsRef);
        set(myConnectionsRef, true);
        set(myDisplayNameRef, authService.currentUser.displayName);
        // When I disconnect, remove this device
        onDisconnect(myConnectionsRef).remove();
    
        // Add this device to my connections list
        // this value could contain info about the device or a timestamp too
        // set(con, true);
    
        // When I disconnect, update the last time I was seen online
        onDisconnect(lastOnlineRef).set(serverTimestamp());
        }
    })
}

export const getUserOnline = async () => {
    const uid = authService.currentUser.uid;
    const connectedRef = ref(realtimeDbService, 'users');
    try {
        let result: UserList[] = [];
        const response = await get(connectedRef);
        const users = Object.keys(response.val());
        users.forEach(user => {
            console.log(user, users)
            if(user !== uid){ 
                if(response.val()[user].connected !== undefined && response.val()[user].connected === true) result.push({uid: user, displayName: response.val()[user].displayName})
            };
        });
        console.log(typeof result)
        return result;
    } catch (error) {
        console.log(error);
    }
}
