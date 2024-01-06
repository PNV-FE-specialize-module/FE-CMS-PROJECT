import React from "react";
import Navigation from "../Navigation";
import HeaderContent from "../Header";
import { Layout, Breadcrumb, theme } from "antd";
import "../../../style/layoutDashboard.css";

const { Content, Footer } = Layout;

export const LayoutDashboard = ({ children, pageTitle }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Navigation />
      <Layout>
        <HeaderContent pageTitle={pageTitle} />
        <Content
          style={{
            margin: "0 16px",
            overflow: "auto",
          }}
        >
          <Breadcrumb
            style={{
              margin: "8px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 580,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              color: "#000000",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
