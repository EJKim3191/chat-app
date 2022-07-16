import React, { useState, useEffect } from 'react';
import { getUserOnline } from '../../common/firebase/userStatus'
import { Avatar, List } from 'antd';
import { startChat } from '../../common/firebase/chat'
interface UserList {
    uid: string,
    displayName: string,
}

function Users() {
    const [userList, setUserList] = useState<UserList[]>([]);
    
    useEffect(() => {
        async function fetchUserData(){
            const data = await getUserOnline();
            console.log(data);
            setUserList(data);
        };
        fetchUserData();
    },[])

    const startChatWith = (opponentUID) => {
        startChat(opponentUID);
    }

    return (
    <React.Fragment>
        <List
            itemLayout="horizontal"
            dataSource={userList}
            renderItem={user => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a onClick={()=>startChatWith(user.uid)}>{user.displayName}</a>}
                />
            </List.Item>
            )}
        />
    </React.Fragment>
    );
};

export default Users;


