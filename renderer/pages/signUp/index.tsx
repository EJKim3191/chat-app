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
import { signUpWithEmail, signInWithGoogle, sendEmail } from '../../common/firebase/auth'
const { Title } = Typography;
const {
    Header,
    Content,
} = Layout;

function signUp() {
    const router = useRouter();

    const onFinish = async(values: any) => {
        console.log('Success:', values);
        signUpWithEmail(values.username, values.password, values.nickname)
        .then(async ()=>{
            const result: any = await sendEmail();
            console.log(result);
        });

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
                    <Title style={{ maxWidth: '100%' }}>회원가입</Title>
                </Form.Item>
                <Form.Item
                label="닉네임"
                name="nickname"
                rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
                >
                <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                label="아이디"
                name="username"
                rules={[{ required: true, message: '아이디를 입력해주세요' }]}
                >
                <Input prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                label="비밀번호"
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
                >
                <Input.Password prefix={<KeyOutlined />} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button type="primary" htmlType="submit" block>
                    회원가입
                </Button>
                </Form.Item>

            </Form>
        </Content>
        </React.Fragment>
    );
};

export default signUp;
