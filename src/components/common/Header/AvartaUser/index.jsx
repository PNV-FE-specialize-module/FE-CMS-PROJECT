import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, message, Space, Menu } from 'antd';

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const items = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    }
];

const menu = (
    <Menu onClick={handleMenuClick}>
        {items.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
            </Menu.Item>
        ))}
    </Menu>
);

const AvatarUsers = () => (
    <Dropdown items={menu} trigger={['click']}>
        <Space>
            hello
            <Avatar icon={<UserOutlined />} />
            <DownOutlined />
        </Space>
    </Dropdown>
);

export default AvatarUsers;
