import {
    BarsOutlined,
    TeamOutlined,
    DashboardOutlined,
    LogoutOutlined
  } from "@ant-design/icons";

const menuItem  = [
    {
        key: '/',
        icon: <DashboardOutlined />,
        label: "Dashboard",
        title: "Dashboard"
        
    },
    {
        key: '/listemployee',
        icon: <TeamOutlined />,
        label: "Employees",
        
    },
    {
        key: '/listproject',
        icon: <BarsOutlined />,
        label: "Projects"
        
    },
    {
        key: '/signout',
        icon: <LogoutOutlined />,
        label: "logout"
        
    }
]

export default menuItem
