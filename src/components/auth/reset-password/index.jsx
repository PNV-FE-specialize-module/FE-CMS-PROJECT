import React from 'react'
import { Form, Button, Input, Flex } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ResetPwd = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onFinish = (email) => {
    axios
      .post("http://localhost:3000/user/reset", JSON.stringify(email), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Successfully send mail", response.data);
        alert("Mail sent successfully");
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error logging in:", error.response.data.message);
        setError(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Flex
      align="flex-end"
      vertical
      justify="center"
      style={{
        paddingRight:'5em',
        paddingBottom:'5em',
        height: "100vh",
        backgroundImage:
          "url(https://www.manageengine.com/products/ad-manager/images/admp-pwd-reset.png)",
        backgroundRepeat:'no-repeat'
      }}
    >
      <Flex
        align="center"
        vertical
        justify="center"
        gap={"3em"}
        style={{
          width: "35%",
          backgroundColor: "rgba(93, 95, 239, 0.3)",
          padding: "3em",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            fontFamily: "ubuntu",
            fontSize: "26px",
            fontWeight: "700",
            color: "#5D5FEF",
          }}
        >
          RESET PASSWORD
        </p>
        <Form
          style={{ width: "100%" }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Email is invalid" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          {error && (
            <Flex
              justify="center"
              style={{ fontWeight: "500", color: "red", fontSize: "16px" }}
            >
              <p>{error}</p>
            </Flex>
          )}
          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#5D5FEF",
                height: "3em",
                fontSize: "16px",
                fontWeight: "600",
                color: "#FFF",
              }}
            >
              Send Mail
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}
