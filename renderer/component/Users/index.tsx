import React from 'react';
import { getUserOnline } from '../../common/firebase/userStatus'
function Users() {
    console.log(getUserOnline())
    return (
    <React.Fragment>
        users
    </React.Fragment>
    );
};

export default Users;
