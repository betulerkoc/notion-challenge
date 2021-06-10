import React, {  useState } from "react"
import { Form, Button,Input ,Card, Alert } from "antd"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    try {
      setMessage("")
      setError("")
      setLoading(true)
       resetPassword(values.email)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  };
  

  return (
    <>
      <Card align="center">
        <div> {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        </div>
        
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
        <Form.Item>
          <Button disabled={loading} type="primary" htmlType="submit">
          Reset Password
          </Button>
        </Form.Item>
      </Form>
      <div >
        <Link to="/login">Log In</Link>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </Card>
 
      </>
  )
}
