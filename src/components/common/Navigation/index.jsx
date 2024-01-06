import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Layout, Menu, Space, Typography } from "antd";
import menuItem from "../Menu";
import userImage from "../../../../public/logocms.png";


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
          <img
              src={userImage}
              alt="User"
              style={{
                width: "50px", // Đặt kích thước tùy ý
                height: "35px", // Đặt kích thước tùy ý
                borderRadius: "50%", // Để bo góc và tạo hình tròn nếu muốn
              }}
          />

          <Title level={5} style={{marginBottom:0}}> CMS SYSTEM</Title>
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