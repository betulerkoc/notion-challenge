import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Alert, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleOutlined,FacebookOutlined } from '@ant-design/icons';
export default function Login() {

  const { login } = useAuth()
  const {signInWithGoogle}=useAuth();
  const {signInWithFacebook}=useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    try {
      setError("");
      setLoading(true);
      login(values.email,values.password);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };
  function google(){
    try {
      signInWithGoogle();
      history.push("/");
    
    } catch(e) {
      console.log("Failed to log in"+e);
    }
  }
  function facebook(){
    try {
      signInWithFacebook();
      history.push("/");
    
    } catch(e) {
      console.log("Failed to log in"+e);
    }
  }
  
  
  

  return (
    <>
      <Card align="center">
      <div> {error && <Alert variant="danger">{error}</Alert>}</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}>
          <Form.Item
            name="email"
            type="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            type="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              disabled={loading}
              htmlType="submit"
              className="login-form-button">
              Log in
            </Button>
            
            Need an account? <Link to="/signup">Sign Up</Link>
          </Form.Item>
        </Form>
      </Card>
     <Button
          icon={<GoogleOutlined />}
          onClick={() => google()}
        >
          Sign In With Google
        </Button>
        <Button
          icon={<FacebookOutlined />}
          onClick={() => facebook()}
        >
          Sign In With Facebook
        </Button>
    </>
  )
}
