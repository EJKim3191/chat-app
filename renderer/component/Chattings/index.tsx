import React, { useEffect , useState } from 'react';
import { Avatar, List } from 'antd';
import { getChatRooms, startChat, getChatInfos } from '../../common/firebase/chat'
interface ChattingList {
    chat: string[],
    user: string,
    // displayName: string,
}
function Chattings() {
    const [chatList, setChatList] = useState<ChattingList[]>([]);
    
    useEffect(() => {
        async function fetchChatData(){
            const data = await getChatRooms();
            console.log(data);
            data.forEach(async element => {
                await getChatInfos(element.uid).then((res) => {
                    setChatList(prev => [...prev, res]);
                })
                
            });

        };
        fetchChatData();
    },[])

    useEffect(()=>{
        if(chatList.length >0){

        }
    },[chatList])

    const startChatWith = (opponentUID) => {
        startChat(opponentUID);
    }
    return (
    <React.Fragment>
        <List
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={chat => {

                return(
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a onClick={()=>startChatWith(chat.uid)}>{chat.user}</a>}
                        description={chat.chat[0]}
                        />
                    </List.Item>
            )}}
        />
    </React.Fragment>
    );
};

export default Chattings;
