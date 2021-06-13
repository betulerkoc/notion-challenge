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

  const addContent = (e) => {
    if (content !== "") {
      db.collection("pages")
        .doc(id)
        .update({
          // content: notes ? [...notes, content] : [content],
          content: firebase.firestore.FieldValue.arrayUnion(content),
        })
        .then(() => {
          console.log("Data successfully written!");
        });
    }
  };

  const fetchData = async () => {
    const noteRes = await db.collection("pages").doc(id).get();
    //  console.log(noteRes.data().content)
    noteRes.data().content && setAllNotes(noteRes.data().content);
  };

  const deleteNote = (e) => {
    let del = e.target.innerHTML;
    console.log(del);
    // db.collection("pages")
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     console.log("Document successfully deleted!");
    //   });
    // var contentRef = db.collection("pages").doc(id);
    setAllNotes(notes.filter(item => item !== del));
    var removeNote = db.collection("pages").doc(id).update({
      content: firebase.firestore.FieldValue.arrayRemove(del),
    });
    console.log(notes)
    return removeNote;
  };

  useEffect(() => {
    fetchData();
  }, [content]);

  return (
    <div>
      NoteDetail Page
      <Divider orientation="left">My Notes: </Divider>
      <List
        size="large"
        bordered
        dataSource={notes}
        renderItem={(item) => (
          <List.Item onClick={deleteNote}>{item} </List.Item>
        )}
      />
      <Input
        placeholder="Add Note"
        onChange={(e) => setContent(e.target.value)}
      />
      <Button icon={<PlusOutlined />} onClick={addContent} />
    </div>
  );
}

export default NoteDetail;
