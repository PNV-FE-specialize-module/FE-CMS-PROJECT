import React, { useState } from "react";
import { Layout, Avatar, Input, Tooltip, Space, Dropdown} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  AudioOutlined,
  DownOutlined
} from '@ant-design/icons';
import '../../../style/hearder.css'
import Language from "../Language";

const { Header } = Layout;

export default function HeaderContent({ pageTitle }) {

  const [collapsed, setCollapsed] = useState(false);


  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: "#ffffff" }}
    >
      {pageTitle}
      <Input
        placeholder="Search here..."
        prefix={<SearchOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Micro">
            <AudioOutlined
              style={{
                color: 'rgba(0,0,0,.45)',
              }}
            />
          </Tooltip>
        }
      />
      <Language/>
    </Header>
  );
}