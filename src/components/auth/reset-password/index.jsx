import React from 'react'
import { Form, Button, Input, Flex, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
const BASE_URL = import.meta.env.VITE_BASE_URL_API;



export const ResetPwd = () => {
  const [error, setError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const onFinish = (email) => {
    axios
      .post(`${BASE_URL}/user/reset`, JSON.stringify(email), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setIsShow(true)
      })
      .catch((error) => {
        // console.error(t("main.Error logging in:"), error.response.data.message);
        setError(error.response.data.message);
      });
  };
  const handleClick = () => {
    setIsShow(false);
    navigate('/login');
  }
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
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
          Reset Password       
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
                Send mail
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <Modal
        title="We sent a new password to your email. Please check."
        open={isShow}
        footer={(
          <div>
            <Button key="ok" type="primary" onClick={handleClick}>
              OK
            </Button>
          </div>
        )}
      />
    </Flex>
  )
}
