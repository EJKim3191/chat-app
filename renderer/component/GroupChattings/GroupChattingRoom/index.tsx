import React, { useRef, useEffect, useState } from 'react';
import { startGroupChat, sendGroupChat } from '../../../common/firebase/chat'
import { getMyUID } from '../../../common/firebase/auth'
interface GroupChat {
    displayName: string,
    lastChatUpdate: string,
    members: string[],
    uid: string,
}
interface Chat {
    displayName: string,
    message: string,
    writerUID: string,
}
type Props = {
    roomInfo: GroupChat,
}
const chatStyle: React.CSSProperties = {
    display: "inline-block",
    position: "relative", 
    width: "100%", 
    height: "70%",
    backgroundColor: "rgb(193,208,219)",
    overflowY: "scroll",
}
const myChatCssProps: React.CSSProperties = {
    width: "100%",
    textAlign: "right",
    wordBreak: "break-all",
}
const chatCssProps: React.CSSProperties  = {
    width: "100%",
    textAlign: "left",
    wordBreak: "break-all",
}
function GroupChattingRoom({roomInfo}: Props) {
    const myUID = getMyUID();
    const ref = useRef(window);
    const [chatInput, setChatInput] = useState<string>('');
    const [isShiftUsed, setIsShiftUsed] = useState<boolean>(false);
    const [chat, setChat] = useState<object[]>([]);
    const messageEndRef = useRef(null);
    const [firstRender, setFirstRender] = useState<boolean>(true);
    useEffect(()=>{
        const handleMessageEvent = (e: CustomEvent)=>{
            setChat((prev)=>[...prev, e.detail])
        }
        ref.current.addEventListener(`message/${roomInfo.uid}`, handleMessageEvent);
        startGroupChat(roomInfo.uid);

        return () => {
            ref.current.removeEventListener(`message/${roomInfo.uid}`, handleMessageEvent);
        }
    },[])

    useEffect(()=>{
        console.log(chat);
    },[chat])

    const sendMessage = () => {
        if(chatInput === '') return;
        // send message
        sendGroupChat(roomInfo.uid, chatInput);
        setChatInput('');
    }
    const keyUpHandler = (e) => {
        if(e.key === "Shift") setIsShiftUsed(false);
    }
    const keyDownHandler = (e) => {
        if(e.key === "Shift") setIsShiftUsed(true);
        if (e.key === "Enter") {
            if(e.nativeEvent.isComposing === false && isShiftUsed !== true){
                e.preventDefault();
                sendMessage();
            }
        }
    }
    const scrollToBottom = () => {
        if(messageEndRef.current === null) return;
        messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(()=>{
        scrollToBottom();
    },[chat])

    return (
    <React.Fragment>
        <div style={{position: "relative", width: "100%", height: "10%",backgroundColor: "rgb(249,248,248)"}}>
            {roomInfo.displayName}
        </div>
        <div style={chatStyle}>
            {chat.map((chatting: Chat, index)=>{
                console.log(index);
                if(index === 0) return;
                if(chatting.writerUID === myUID){
                    return(
                        <div ref={messageEndRef} style={myChatCssProps}>
                            {chatting.displayName}
                            <br />
                            {chatting.message}
                        </div>
                    )
                }
                else{
                    return (<div ref={messageEndRef} style={chatCssProps}>
                        {chatting.displayName}
                        <br />
                        {chatting.message}
                    </div>)
                }

            })}
        </div>
        
        <div style={{position: "relative", top: "0%", width: "100%", height: "20%"}}>
            <input style={{width: "100%", height: "100%"}} value={chatInput} onChange={(e)=>setChatInput(e.target.value)} onKeyDown={(e)=>keyDownHandler(e)} onKeyUp={(e)=>keyUpHandler(e)}/>
            <button style={{position: "absolute", bottom: "0%", right: "0%", width: "100px", height: "100%"}} onClick={sendMessage} >전송</button>
        </div>
        
    </React.Fragment>
    );
};

export default GroupChattingRoom;
