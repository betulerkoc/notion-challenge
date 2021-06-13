import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import { SmileOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, List, Typography, Divider, Skeleton } from "antd";
import db from "../firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";

function NoteDetail() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [notes, setAllNotes] = useState([]);

  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    fetchData();
  }, [notes]);

  const addContent = (e) => {
    if (content !== "") {
      db.collection("pages")
        .doc(id)
        .update({
          content: firebase.firestore.FieldValue.arrayUnion(content),
        })
        .then(() => {
          console.log("Data successfully written!");
          setContent("");
        });
    }
  };

  const fetchData = async () => {
    const noteRes = await db.collection("pages").doc(id).get();
    //  console.log(noteRes.data().content)
    noteRes.data().content && setAllNotes(noteRes.data().content);
  };

  const deleteNote = (e) => {
    console.log(e);
    // var contentRef = db.collection("pages").doc(id);
    // notes.filter(item => console.log(item));
    for (let i = 0; i < notes.length; i++) {
      if (i === e) {
        console.log(notes[i]);
        db.collection("pages")
          .doc(id)
          .update({
            content: firebase.firestore.FieldValue.arrayRemove(notes[i]),
          });
      }
    }
  };

  const updateNote = (e) => {
    setOpenUpdate(true);
    console.log(e);
    console.log(notes[e])
  };

  const handleSubmit = (e) => {
    // if (content) {
    //   setList(list.concat(content));
    // }
    // setValue("");
    // event.preventDefault();
  };

  return (
    <div>
      NoteDetail Page
      <Divider orientation="left">My Notes: </Divider>
      {notes.map(function (item, index) {
        return (
          <li key={index}>
            {item} <span onClick={() => deleteNote(index)}>Delete</span>{" "}
            <span onClick={() => updateNote(index)}>Update</span>
          </li>
        );
      })}
      {openUpdate && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
      )}
      {/* <List
        size="large"
        bordered
        dataSource={notes}
        renderItem={(item) => (
          <List.Item onClick={deleteNote}>{item} </List.Item>
        )}
      /> */}
      <Input
        placeholder="Add Note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button icon={<PlusOutlined />} onClick={addContent} />
    </div>
  );
}

export default NoteDetail;
