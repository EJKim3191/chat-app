import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import {
  Layout,
  Form,
  Select,
  Input,
  Typography,
  Checkbox,
  DatePicker,
  Switch,
  Slider,
  Button,
  Breadcrumb
} from 'antd';
// import cookies from 'next-cookies'
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { signInWithEmail } from '../common/firebase/auth';
import { onUserConnect } from '../common/firebase/userStatus';
const { Title } = Typography;
const {
  Header,
  Content,
} = Layout;
const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {
  const router = useRouter();

  const onFinish = async(values: any) => {
    console.log('Success:', values);
    const result: any = await signInWithEmail(values.username, values.password);
    if(result._tokenResponse !== undefined && result._tokenResponse.registered === true ){
      if(result.user.emailVerified){
        document.cookie = `member = ${result.user.accessToken}; path=/`;
        onUserConnect();
        router.push('/next');
      }
      else{
        alert("이메일 인증을 해주세요!")
      }
      console.log(result)
    }
    else{
      console.log("로그인 에러")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <React.Fragment>
      <Head>
        <title>채팅 프로그램</title>
      </Head>

      <Header>

      </Header>

      <Content style={{ padding: 48, height: "100%" }}>
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
            <Title style={{ maxWidth: '100%' }}>마음연구소</Title>
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

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" block>
              로그인
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                  <Link href={'/signUp'}>회원가입</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link href={'/resetPassword'}>비밀번호찾기</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  사용자약관
                </Breadcrumb.Item>
              </Breadcrumb>
          </Form.Item>
        </Form>
      </Content>
    </React.Fragment>
  );
};

export default Home;