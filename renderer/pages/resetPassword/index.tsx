import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    Layout,
    Form,
    Input,
    Typography,
    Button,
} from 'antd';

import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { passwordReset } from '../../common/firebase/auth'
const { Title } = Typography;
const {
    Header,
    Content,
} = Layout;

function resetPassword() {
    const router = useRouter();
    const onFinish = async(values: any) => {
        passwordReset(values.username)
        .then(()=>{
            if(!alert("이메일을 확인해주세요")){
                router.push('./home')
            }
        })
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <React.Fragment>
        <Head>
            <title>Next - Nextron (with-typescript-ant-design)</title>
        </Head>

        <Header>
            <Link href="/home">
            <a>뒤로가기</a>
            </Link>
        </Header>

        <Content style={{ padding: 48 }}>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item>
                    <Title style={{ maxWidth: '100%' }}>비밀번호찾기</Title>
                </Form.Item>
                <Form.Item
                label="아이디"
                name="username"
                rules={[{ required: true, message: '아이디를 입력해주세요' }]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button type="primary" htmlType="submit" block>
                        비밀번호 재설정
                    </Button>
                </Form.Item>

            </Form>
        </Content>
        </React.Fragment>
    );
};

export default resetPassword;