import React, { useState } from "react"
import { Form, Input, Button, Alert, Card } from "antd";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onFinish = (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (values.email !== currentUser.email) {
      promises.push(updateEmail(values.email))
    }
    if (values.password) {
      promises.push(updatePassword(values.password))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
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
            <Button
              type="primary"
              disabled={loading}
              htmlType="submit"
              className="login-form-button">
              Update
            </Button>
        
          </Form.Item>
        </Form>
        <div>
        <Link to="/">Cancel</Link>
      </div>
      </Card>
     
    </>
  )
}
