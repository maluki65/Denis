import React from "react";
import {Alert, Button, Card, Flex, Form, Input, Spin, Typography} from "antd";
import { Link } from "react-router-dom";
import RegisterImg from "../assets/images.jpg";
import useSignUp from "../hooks/useSignUp";


const Register = () => {
    const { loading, error, registerUser } = useSignUp();
    const handleRegistration = (values) => {
        registerUser(values);
    };
    
    return (
        <Card className="form-container">
            <Flex gap="large" align="center">

             {/*On creating form*/}
                <Flex vertical flex={1}>
                   <Typography.Title level={3} strong className="title">Create an Account</Typography.Title>
                   <Typography.Text type="secondary" strong className="slogan">Autism Virtual Health Assistant</Typography.Text>
                   <Form
                      layout="vertical" 
                      onFinish={handleRegistration}
                      autoComplete="off">
                      <Form.Item label="Full Name" name="name" rules={[
                           {
                             required: true,
                             message: "Please enter your full name!",
                            },
                          ]}>
                           <Input  size=" large" placeholder="Enter Your Name" />
                        </Form.Item>

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

                        <Form.Item label="Password" name="passwordConfirm" rules={[
                           {
                             required: true,
                             message: "Please confirm your password",
                            },
                          ]}>
                           <Input.Password  size=" large" placeholder="Re-enter Your password!" />
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
                            type={ `${loading ? "" : "primary" }` }
                            htmlType="submit"
                            size="large"
                            className="btn">
                               { loading ? <Spin/> : "Create Account" }
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Link to="/login">
                             <Button size="large" className="btn">
                                Sign in
                             </Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Flex>

                {/*On creating Image*/}
                <Flex flex={1}>
                  <img src={RegisterImg} className="Auth-img"/>
                </Flex>
            </Flex>
        </Card>
    );
};

export default Register;