import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import Link from 'next/link';
import {
  Breadcrumb, Button, Layout, Menu
} from 'antd';
import type { MenuProps } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  WechatOutlined
} from '@ant-design/icons';
import Users from '../component/Users/index';
import Chattings from '../component/Chattings/index';
import GroupChattings from '../component/GroupChattings/index';
import Settings from '../component/Settings/index';
import { startChat } from '../common/firebase/chat'
import { userSignOut } from '../common/firebase/auth'
const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('유저 목록', 'users', <UserOutlined />), 
  getItem('채팅', 'chatting', <WechatOutlined />),
  getItem('그룹 채팅', 'group_chatting', <TeamOutlined />),
  getItem('세팅', 'settings', <SettingOutlined />),
];

function Next() {
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const startChatWith = (opponentUID, opponentDisplayName) => {
    setSelectedKeys(()=>['1']);
    startChat(opponentUID).then(res=> setCurrentContent(<Chattings roomID={res} displayName={opponentDisplayName}/>));
    
}
  const [currentContent, setCurrentContent] = useState<JSX.Element>(<Users startChatWith={startChatWith}/>);
  

  const onMenuSelect = (e) => {
    switch(e.key){
      case 'users': 
        setSelectedKeys(()=>['1']);
        return setCurrentContent(<Users startChatWith={startChatWith}/>);
      case 'chatting': 
        setSelectedKeys(()=>['2']);
        return setCurrentContent(<Chattings />);
      case 'group_chatting': 
        setSelectedKeys(()=>['3']);
        return setCurrentContent(<GroupChattings />);
      case 'settings': 
        setSelectedKeys(()=>['4']);
        return setCurrentContent(<Settings />);
      default:
        return;
    }
  }

  return (
    <React.Fragment>
      <Layout style={{ width: '100%', height: '100%'}}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" selectedKeys={selectedKeys} mode="inline" items={items} onSelect={e => onMenuSelect(e)} />
        </Sider>
        <Content style={{ padding: '0 50px' }}>
            {currentContent}
        </Content>
        <Button onClick={()=> userSignOut().then(()=>{router.push('./home')})}>로그아웃</Button>
      </Layout>
    </React.Fragment>
  );
};

export default Next;
