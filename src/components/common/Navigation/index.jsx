import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
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
          <img
              src={userImage}
              alt="User"
              style={{
                width: "70px", // Đặt kích thước tùy ý
                height: "50px", // Đặt kích thước tùy ý
                borderRadius: "50%", // Để bo góc và tạo hình tròn nếu muốn
              }}
          />

          <Title level={5} className={collapsed ? 'hidden-title' : ''} style={{ fontWeight:'700', fontSize:'18px'}}>THE NINEAM</Title>

      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineCollapsed={collapsed}
        style={{fontSize:'15px'}}
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