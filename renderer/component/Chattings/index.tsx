import React, { useEffect , useState } from 'react';
import { Avatar, List } from 'antd';
import { getChatRooms, startChat, getChatInfos } from '../../common/firebase/chat'
import ChattingRoom from './ChattingRoom';
interface ChattingList {
    chat: string[],
    user: string,
    // displayName: string,
}
interface Chat {
    displayName: string,
    uid: string,
}
type chat = {
    displayName: string,
    uid: string,
}
// user에서 사용자를 클릭하여 들어왔을 때
// 
type ChatProps = {
    roomID?: string,
    displayName?: string,
}
function Chattings({roomID, displayName}: ChatProps) {
    const [chatList, setChatList] = useState<ChattingList[]>([]);
    const [chatRoom, setChatRoom] = useState<boolean>(false);
    const [roomInfo, setRoomInfo] = useState<Chat>();
    useEffect(() => {
        async function fetchChatData(){
            const data = await getChatRooms();
            data.forEach(async element => {
                await getChatInfos(element.uid).then((res) => {
                    Object.assign(res, {uid : element.uid});
                    setChatList(prev => [...prev, res]);
                })
                
            });

        };
        fetchChatData();
        if(roomID!==undefined && displayName!==undefined){
            startChatRoom(roomID, displayName);
        }
    },[])

    const startChatRoom = (uid, displayName) => {
        setChatRoom(true);
        const temp:chat = {
            displayName: displayName,
            uid: uid
        };

        setRoomInfo(temp);
    }
    const enterChatRoom = () => {
        return (<ChattingRoom roomInfo={roomInfo}/>)
        
    }
    return (
    <React.Fragment>
        {chatRoom && enterChatRoom()}
        {!chatRoom && <List
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={chat => {
                return(
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a onClick={()=>startChatRoom(chat.uid, Object.values(chat.user)[0])}>{Object.values(chat.user)[0]}</a>}
                        description={chat.chat[chat.chat.length-1].message}
                        />
                    </List.Item>
            )}}
        />}
    </React.Fragment>
    );
};

export default Chattings;
