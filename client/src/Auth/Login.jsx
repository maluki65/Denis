import React from "react";
import {Alert, Button, Card, Flex, Form, Input, Spin, Typography} from "antd";
import { Link } from "react-router-dom";
import loginImg from "../assets/download.jpeg";
import useLogin from "../hooks/useLogin";


const Login = () => {
    const { error, loading, loginUser } = useLogin();
    const handleLogin = async (values) => {
        await loginUser(values);
    };
    
    return (
        <Card className="form-container">
            <Flex gap="large" align="center">

             {/*On creating Image*/}
             <Flex flex={1}>
                  <img src={loginImg} className="Auth-img"/>
                </Flex>

                {/*On creating form*/}
                <Flex vertical flex={1}>
                   <Typography.Title level={3} strong className="title">Sign In</Typography.Title>
                   <Typography.Text type="secondary" strong className="slogan">EndLess Possibilities</Typography.Text>
                   <Form
                      layout="vertical" 
                      onFinish={handleLogin}
                      autoComplete="off">

                        <Form.Item label="Email" name="email" rules={[
                           {
                             required: true,
                             message: "Please enter your email!",
                            },
                            {
                                type: "email",
                                message: "Enter a valid email address",
                            },
                          ]}>
                           <Input  size=" large" placeholder="Enter Your email" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[
                           {
                             required: true,
                             message: "Please enter your password",
                            },
                          ]}>
                           <Input.Password  size=" large" placeholder="Enter Your password!" />
                        </Form.Item>

                        {
                            error && 
                            <Alert description={error} 
                            type="error" 
                            showIcon 
                            closable 
                            className="alert"/>
                        }
                        
                        <Form.Item>
                            <Button
                            type={ `${ loading ? "" : "primary" }` }
                            htmlType="submit"
                            size="large"
                            className="btn">
                               { loading ? <Spin/> : "Sign In" }
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Link to="/">
                             <Button size="large" className="btn">
                                Create an account
                             </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Card>
    );
};

export default Login;