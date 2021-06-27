import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Form, Button, Input } from "antd";
import { SmileOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import db from "../firebaseConfig";
import { Link } from "react-router-dom";
import firebase from "firebase";

const { SubMenu } = Menu;

function Note() {
  const [title, setTitle] = useState("");
  const [pageData, setPageData] = useState([]);

  const addPage = (e) => {
    // e.preventDefault();
    if(title !== "") {
      db.collection("notes").add({
        title: title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log("Data successfully written!");
      setTitle("");
    }
  };

  const fetchData = () => {
    db.collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPageData(snapshot.docs.map((m) => ({ id: m.id, notes: m.data() })));
      });
  };

  useEffect(() => {
    fetchData();
  }, [title]);

  return (
    <Menu
      onClick={addPage}
      style={{ width: 256, height: window.length }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      {console.log(pageData)}
      {pageData.map((m) => (
        <Link to={m.id}>
          <Menu.Item key={m.id}>
            {m.notes.title}
          </Menu.Item>
        </Link>
      ))}

      <Form>
        <Input
          placeholder="New Page"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={addPage}
          htmlType="submit"
          disabled={!title}
        />
      </Form>
    </Menu>
  );
}

export default Note;
