import React, { useRef, useEffect, useState } from 'react';
import { startChatRoom, sendChat } from '../../../common/firebase/chat'
import { getMyUID } from '../../../common/firebase/auth'
import {
    UserOutlined,
    LeftSquareFilled,
  } from '@ant-design/icons';
interface Chat {
    displayName: string,
    uid: string,
}
interface ChatUI {
    displayName: string,
    message: string,
    uid: string,
}
type Props = {
    roomInfo: Chat,
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
    marginTop: "3px",
    marginBottom: "3px",
    textAlign: "right",
    wordBreak: "break-all",
}
const chatCssProps: React.CSSProperties  = {
    width: "100%",
    marginTop: "3px",
    marginBottom: "3px",
    textAlign: "left",
    wordBreak: "break-all",
}
function ChattingRoom({roomInfo}: Props) {
    const myUID = getMyUID();
    const ref = useRef(window);
    const [chatInput, setChatInput] = useState<string>('');
    const [isShiftUsed, setIsShiftUsed] = useState<boolean>(false);
    const [chat, setChat] = useState<object[]>([]);
    const messageEndRef = useRef(null);
    const [firstRender, setFirstRender] = useState<boolean>(true);
    useEffect(()=>{
        const handleMessageEvent = (e: CustomEvent)=>{
            console.log(e.detail)
            setChat(e.detail)
        }
        ref.current.addEventListener(`message/${roomInfo.uid}`, handleMessageEvent);
        startChatRoom(roomInfo.uid);

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
        sendChat(roomInfo.uid, chatInput);
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
        <div style={{ display: "inline-block", position: "relative", width: "100%", height: "10%",backgroundColor: "rgb(249,248,248)"}}>
            <div style={{position: "absolute", marginLeft: "10px"}}>
                {roomInfo.displayName}
                <br/>
                <UserOutlined /> 2
            </div>
            <div style={{width: "100%", textAlign: "right"}}>
                <LeftSquareFilled style={{fontSize: "30px", color: "rgb(68,142,247)", marginLeft: "auto"}}/>
            </div>
        </div>

        <div style={chatStyle}>
            {chat.map((chatting: ChatUI, index)=>{
                console.log(index);
                if(index === 0) return;
                if(chatting.uid === myUID){
                    return(
                        <div ref={messageEndRef} style={myChatCssProps}>
                            <div style={{width: "fit-content", backgroundColor: "rgb(248,227,76)", borderRadius: "5px", marginLeft: "auto", padding: "2px", paddingLeft: "5px", paddingRight: "5px"}}>
                                {chatting.message}
                            </div>
                        </div>
                    )
                }
                else{
                    return (<div ref={messageEndRef} style={chatCssProps}>
                        {chatting.displayName}
                        <br />
                        <div style={{width: "fit-content", backgroundColor: "white", borderRadius: "5px", marginRight: "auto", padding: "2px", paddingLeft: "5px", paddingRight: "5px"}}>
                            {chatting.message}
                        </div>
                    </div>)
                }

            })}
        </div>
        
        <div style={{position: "relative", top: "0%", width: "100%", height: "18%"}}>
            <input style={{width: "100%", height: "100%"}} value={chatInput} onChange={(e)=>setChatInput(e.target.value)} onKeyDown={(e)=>keyDownHandler(e)} onKeyUp={(e)=>keyUpHandler(e)}/>
            <button style={{position: "absolute", bottom: "0%", right: "0%", width: "100px", height: "100%"}} onClick={sendMessage} >전송</button>
        </div>
        
    </React.Fragment>
    );
};

export default ChattingRoom;
