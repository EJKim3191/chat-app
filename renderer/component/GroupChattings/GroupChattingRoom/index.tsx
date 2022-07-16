import React from 'react';

import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

interface GroupChat {
    displayName: string,
    lastChatUpdate: string,
    members: string[],
    uid: string,
}
type Props = {
    roomInfo: GroupChat,
}
function GroupChattingRoom({roomInfo}: Props) {
    console.log(roomInfo)
    return (
    <React.Fragment>
        <div style={{position: "relative", width: "100%", height: "10%",backgroundColor: "rgb(249,248,248)"}}>
            {roomInfo.displayName}
        </div>
        <div style={{position: "relative", width: "100%", height: "70%",backgroundColor: "rgb(193,208,219)"}}>
            {roomInfo.lastChatUpdate}
        </div>
        
        <div style={{position: "relative", top: "0%", width: "100%", height: "20%"}}>
            <input style={{width: "100%", height: "100%"}} />
            <button style={{position: "absolute", bottom: "0%", right: "0%", width: "100px", height: "100%"}}>전송</button>
        </div>
        
    </React.Fragment>
    );
};

export default GroupChattingRoom;
