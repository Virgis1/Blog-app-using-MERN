import { useState } from 'react';
import Editor from '../Editor';
import { Navigate } from 'react-router-dom';


export default function CreatePost() {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    e.preventDefault();
    console.log(files)
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="summary" value={summary} onChange={e => setSummary(e.target.value)} />
      <input type="file" onChange={e => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ 'marginTop': '5px' }}>Create post</button>
    </form>
  )
}