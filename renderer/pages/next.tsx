import React, { useState } from 'react';
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

  const [currentContent, setCurrentContent] = useState<JSX.Element>(<Users />);
  const onMenuSelect = (e) => {
    console.log(e);
    switch(e.key){
      case 'users': 
        return setCurrentContent(<Users />);
      case 'chatting': 
        return setCurrentContent(<Chattings />);
      case 'group_chatting': 
        return setCurrentContent(<GroupChattings />);
      case 'settings': 
        return setCurrentContent(<Settings />);
      default:
        return;
    }
  }

  return (
    <React.Fragment>
      <Layout style={{ width: '100%', height: '500px'}}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={e => onMenuSelect(e)} />
        </Sider>
        <Content style={{ padding: '0 50px' }}>
            {currentContent}
        </Content>
        <Button onClick={()=> router.push('./home')}>d</Button>
      </Layout>
    </React.Fragment>
  );
};

export default Next;
