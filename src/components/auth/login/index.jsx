import { Form, Button, Input, Checkbox, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTranslation} from 'react-i18next';

const BASE_URL = import.meta.env.VITE_BASE_URL_API;



const Login = () => {
  const [error, setError] = useState("");
  const { setIsLogin } = useAuth();
  const { t, i18n } = useTranslation();

  const navigate= useNavigate()

  const onFinish = (values) => {
    const requestData = { email: values.email, password: values.password };

    axios
      .post(`${BASE_URL}/user/login`, JSON.stringify(requestData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsLogin(true);
        navigate('/');
      })
      .catch((error) => {
        // console.error(Error logging in, error.response.data.message);
        setError(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Flex
      align="center"
      vertical
      justify="center"
      style={{
        height: "100vh",
        backgroundImage:
          "url(https://live.staticflickr.com/484/18966976963_08c2c5e70c_h.jpg)",
      }}
    >
      <Flex
        align="center"
        vertical
        justify="center"
        gap={"3em"}
        style={{
          width: "35%",
          backgroundColor: "rgba(255,255,255, 0.8)",
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
          THE NINEAM
        </p>
        <Form
          style={{ width: "100%" }}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              { required: true, message:"Email is required" },
              { type: "email", message:"Email is required" },
            ]}
            style={{ fontWeight: "500" }}
          >
            <Input placeholder="Enter your email" style={{height:35}} />
          </Form.Item>
          <Form.Item
            type="password"
            label="Password"
            name="password"
            rules={[{ required: true, message:" Password is required" }]}
            style={{ fontWeight: "500" }}
          >
            <Input.Password placeholder="Enter your password" style={{height:35, minWidth: '100%'}}/>
          </Form.Item>
          <Flex justify="space-between">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox style={{ fontWeight: "400" }}>
               Keep me signed in
              </Checkbox>
            </Form.Item>
            <FormItem>
            <Link style={{ fontStyle: "italic", color: "#5D5FEF" }} to='/resetPwd'>Forgot Password</Link>
              {/* <a style={{ fontStyle: "italic", color: "#5D5FEF" }} >
                Forgot Password?
              </a> */}
            </FormItem>
          </Flex>
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
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};
export default Login;
