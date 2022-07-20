import React, { useState, useEffect } from 'react';
import { getUserOnline } from '../../common/firebase/userStatus'
import { Avatar, List } from 'antd';
interface UserList {
    uid: string,
    displayName: string,
}
type UserProps = {
    startChatWith: Function,
}
function Users({startChatWith}: UserProps) {
    const [userList, setUserList] = useState<UserList[]>([]);
    
    useEffect(() => {
        async function fetchUserData(){
            const data = await getUserOnline();
            setUserList(data);
        };
        fetchUserData();
    },[])


    return (
    <React.Fragment>
        <List
            itemLayout="horizontal"
            dataSource={userList}
            renderItem={user => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a onClick={()=>startChatWith(user.uid, user.displayName)}>{user.displayName}</a>}
                />
            </List.Item>
            )}
        />
    </React.Fragment>
    );
};

export default Users;


