import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import {useParams} from "react-router-dom";
import { SmileOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input  } from 'antd';
import db from '../firebaseConfig'

function NoteDetail() {
    const{id} = useParams();  

    const [content, setContent] = useState('');
    const [notes, setAllNotes] = useState([]);
    
    const addContent = e => {
      if(content !== '') {
        db.collection('pages').doc(id).update({
          "content": notes ? [...notes, content] :  [content],
      })
      .then(() => {
        console.log("Data successfully written!");
        setContent("")
    })
      }
    }

    const fetchData = async () =>{
      const noteRes = await db.collection('pages').doc(id).get() 
    //  console.log(noteRes.data().content)
      setAllNotes(noteRes.data().content);
    }

    useEffect(()=>{
      fetchData()
    },[content])

    return (
      <div>
           NoteDetail Page
        <div>{id}</div>
        My Notes: {console.log(notes)}

        <Input placeholder="Add Note" onChange={e => setContent(e.target.value)}/>
          <Button icon={<PlusOutlined />} onClick={addContent}/>
      </div>
    );
}

export default NoteDetail;