import React, {  useState } from "react";
import { Form, Input, Button, Alert, Card } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function Signup() {
  
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  
  const onFinish = (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }
    console.log(""+values.password);
    try {
      setError("");
      setLoading(true);     
      signup(values.email,values.password);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };
  return (
      <>
      <Card align="center">
        <div> {error && <Alert variant="danger">{error}</Alert>}</div>
      <Form onFinish={onFinish}
        name="basic"
        initialValues={{
          remember: true,
        }}
        >
        <Form.Item
          label="Email"
          name="email"
          type="email"
          
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          type="password"
          
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
         
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button disabled={loading} type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div >
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </Card>
 
      </>
     )
}
