import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Layout, Menu, Space, Typography } from "antd";
import menuItem from "../Menu";
import {
  UserOutlined
} from "@ant-design/icons";

const { Title } = Typography;
const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Sider
      style={{ background: "#ffffff" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical">
        <Space size={16}>
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
            size="large" 
            shape="square"
          />
          <Title level={5} style={{marginBottom:0}}> Design</Title>
        </Space>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineCollapsed={collapsed}

      >
        {menuItem.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Navigation;