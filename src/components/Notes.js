import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Button, Input  } from 'antd';
import { SmileOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import db from '../firebaseConfig'
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;

function Note() {
  const [title, setTitle] = useState('');
  const [pageData, setPageData] = useState([]);

  const addPage = e => {
    // e.preventDefault()
    if(title !== '') {
      db.collection('pages').doc(title).set({
        title: title,
    })
    .then(() => {
      console.log("Data successfully written!");
      setTitle("")
  })
    }
  }

  const fetchData = async () =>{
    const usersRes = await db.collection('pages').get() 
    const usersData = usersRes.docs.map(user => user.data())
    setPageData(usersData)
  }

  useEffect(()=>{
    fetchData()
  },[title])

  
    return (
      <Menu
        onClick={addPage}
        style={{ width: 256, height: window.length }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<SmileOutlined />} title="Betul's Notion">
  
            {console.log(pageData)}
            {pageData.map((m) => <Link to={m.title}><Menu.Item key={m.title}>{m.title} </Menu.Item> </Link>  )}
           
    
          <Input placeholder="New Page" onChange={e => setTitle(e.target.value)}/>
          <Button icon={<PlusOutlined />} onClick={addPage}/>
        </SubMenu>
      </Menu>
    );
}

export default Note;