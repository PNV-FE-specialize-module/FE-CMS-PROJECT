import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
import usFlag from "../../../assets/Image/FlagoftheUnitedStates.png";
import vnFlag from "../../../assets/Image/FlagofVietnam.png";

const items = [
  {
    label: (
      <Space>
        <Avatar src={<img src={usFlag} alt="avatar" />} />
        <div>Eng (US)</div>
      </Space>
    ),
    key: "0",
  },
  {
    label: (
      <Space>
        <Avatar src={<img src={vnFlag} alt="avatar" />} />
        <div>Vietnamese</div>
      </Space>
    ),
    key: "1",
  },
];

const Language = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar size={20} icon={<img src={usFlag} alt="avatar" />} />
        <div style={{ fontSize: "1rem", color: "#5D5FEF" }}>Eng (US)</div>
        <DownOutlined style={{ fontSize: 10 }} />
      </Space>
    </a>
  </Dropdown>
);

export default Language;
