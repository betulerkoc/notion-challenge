import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Form, Divider, Modal } from "antd";
import db from "../firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";
import { Link } from "react-router-dom";

function NoteDetail() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [notes, setAllNotes] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

  const showModal = (index, item) => {
    setIsModalVisible(true);
    setCurrentIndex(index);
    setUpdatedContent(item);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    updateNote();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, [notes]);

  const fetchData = async () => {
    const noteRes = await db.collection("notes").doc(id).get();
    noteRes.data().content && setAllNotes(noteRes.data().content);
  };

  const addContent = (e) => {
    db.collection("notes")
      .doc(id)
      .set(
        { content: firebase.firestore.FieldValue.arrayUnion(content) },
        { merge: true }
      )
      .then(() => {
        setContent("");
      });
  };

  const deleteNote = (current) => {
    console.log(current);
    for (let i = 0; i < notes.length; i++) {
      if (i === current) {
        console.log(notes[i]);
        db.collection("notes")
          .doc(id)
          .update({
            content: firebase.firestore.FieldValue.arrayRemove(notes[i]),
          });
      }
    }
  };

  const updateNote = () => {
    console.log(updatedContent);
    console.log(currentIndex);

    for (let i = 0; i < notes.length; i++) {
      if (i === currentIndex) {
        console.log(notes[i]);
        var newContent = db.collection("notes").doc(id);
        newContent.update({
          content: firebase.firestore.FieldValue.arrayRemove(notes[i]),
        });
        newContent.update({
          content: firebase.firestore.FieldValue.arrayUnion(updatedContent),
        });
      }
    }
  };

  const deletePage = () => {
    db.collection("notes").doc(id).delete();
    console.log(id);
  };

  return (
    <Form>
      <Form.Item>
        NoteDetail Page{" "}
        <Link to="/">
          <span onClick={() => deletePage()}>Delete</span>{" "}
        </Link>
        <Divider orientation="left">My Notes: </Divider>
        {notes.map(function (item, index) {
          return (
            <li key={index}>
              {item} <Button onClick={() => deleteNote(index)}>Delete</Button>{" "}
              <Button onClick={() => showModal(index, item)}>Update</Button>
            </li>
          );
        })}
        <Input
          placeholder="Add Note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={addContent}
          htmlType="submit"
          disabled={!content}
        />
      </Form.Item>

      <Modal
        title="Update Content"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
      >
        <Input
          placeholder="Update note content"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      </Modal>
    </Form>
  );
}

export default NoteDetail;
