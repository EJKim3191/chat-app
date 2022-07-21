import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import { getGroupChatRooms, startGroupChat } from '../../common/firebase/chat'
import GroupChattingRoom from './GroupChattingRoom';

interface GroupChat {
    displayName: string,
    lastChatUpdate: string,
    members: string[],
    uid: string,
}
function GroupChattings() {
    const [chatList, setChatList] = useState<GroupChat[]>([]);
    const [roomState, setRoomState] = useState<boolean>(false);
    const [roomInfo, setRoomInfo] = useState<GroupChat>();
    useEffect(() => {
        async function fetchChatData(){
            getGroupChatRooms().then((res)=>{
                for(let key in res){
                    setChatList(prev=>[...prev, Object.assign(res[key], {uid: key})])
                }
                
            })
            
        };
        fetchChatData();
    },[])

    const enterGroupChat = (roomInfo) => {
        return (<GroupChattingRoom roomInfo={roomInfo} exitChatRoom={exitChatRoom}/>)
    }
    const exitChatRoom = () => {
        setRoomState(false);
        setRoomInfo(null);
    }
    return (
        <React.Fragment>
            {roomState && enterGroupChat(roomInfo)}
            {!roomState && <List
                itemLayout="horizontal"
                dataSource={chatList}
                renderItem={chat => {

                    return(
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<a onClick={()=>{
                                setRoomInfo(chat);
                                setRoomState(true)
                            }}>{chat.displayName}</a>}
                            />
                        </List.Item>
                )}}
            />}
        </React.Fragment>
    );
};

export default GroupChattings;
