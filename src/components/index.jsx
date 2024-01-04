import React from 'react'
import Navigation from './common/Navigation'
import HeaderContent from './common/Header'
import { Layout, Breadcrumb,theme } from "antd";
import "../style/layoutDashboard.css"


const { Content, Footer } = Layout;

export const LayoutDashboard = ({children, pageTitle }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      <Navigation />
      <Layout>

      <HeaderContent pageTitle={pageTitle}/>
      <Content
        style={{
          margin: '0 16px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '8px 0',
          }}
        >
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 610,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            color:"#000000"
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
