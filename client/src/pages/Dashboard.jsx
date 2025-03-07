import React from "react";
import { Button } from "antd";
//import { UserOutlined } from "@ant-design/icons";
//import { Avatar, Button, Card, Flex, Typography } from "antd";
import { useAuth } from "../context/AuthContext";
import Board from "../puzzelGame/board/Board.jsx";
import Chatbox from "./ChatBox.jsx";

const Dashboard = () => {
    const { userData, logout } = useAuth();
    //const { userData, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="App-board"><Board/>
        <Button  size="large" type="primary" className="profile-btn" onClick={handleLogout}>Logout</Button>
        <Chatbox />
        </div>
        
        /*<Card className="profile-card">
            <Flex vertical gap="small" align="center">
                <Avatar size={150} icon= {<UserOutlined />} className="avatar" />
                <Typography.Title level={2} strong className="username">
                    {userData.name}
                </Typography.Title>
                <Typography.Text type="secondary" strong>
                    Email:{userData.email}
                </Typography.Text>
                <Typography.Text type="secondary" strong>
                    Role:{userData.role}
                </Typography.Text>
                <Button  size="large" type="primary" className="profile-btn" onClick={handleLogout}>Logout</Button>
            </Flex>
            
        </Card>*/
        
    );
};


export default Dashboard;