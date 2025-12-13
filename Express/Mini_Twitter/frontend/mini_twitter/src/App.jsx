
// import './App.css'
// import axios from 'axios'
// import {useState} from 'react'
// function App() {
  
//   const [post,setPost]=useState([]);
//   const [put,setPut]=useState([]);
//   const [del,setDel]=useState([]);
//   const handleFetchAPI=async()=>{
//     const res= await axios.get("http://localhost:4000/")
//      console.log(res.data);
//   };
//   const handlePostAPI=async()=>{
//     await axios.post("http://localhost:4000/",{"id":3,"twit":"Who is this?"})
//   };

//   const handlePutAPI=async()=>{
//    await  axios.put("http://localhost:4000/",{"id":1,"twit":"Thios is updated"})
//   }
  
//   const handleDeleteAPI=async()=>{
//     await axios.delete("http://localhost:4000/1")
//   }

//   return (
//     <>
//    <input type="text" placeholder="Enter twit"/>
//    <button onClick={handleFetchAPI}>Fetch</button>
//    <button onClick={handlePostAPI}>Post</button>
//    <button onClick={handlePutAPI}>Put</button>
//    <button onClick={handleDeleteAPI}>Delete</button>
//     </>
//   )
// }

// export default App;
import axios from "axios"
import { useState } from "react"

function App() {

  const [id, setId] = useState("")
  const [twit, setTwit] = useState("")
  const [data, setData] = useState([])

  // GET
  const handleFetchAPI = async () => {
    const res = await axios.get("http://localhost:4000/")
    setData(res.data)
  }

  // POST
  const handlePostAPI = async () => {
    const res = await axios.post("http://localhost:4000/", {
      id: Number(id),
      twit: twit
    })
    setData([...data, res.data])
    setId("")
    setTwit("")
  }

  // PUT
 const handlePutAPI = async () => {
  await axios.put("http://localhost:4000/", {
    id: Number(id),
    twit: twit
  });

  // update UI manually
  const updatedData = data.map(item =>
    item.id === Number(id)
      ? { id: Number(id), twit: twit }
      : item
  );

  setData(updatedData);
  setTwit("");
};


  // DELETE
 const handleDeleteAPI = async () => {
  await axios.delete(`http://localhost:4000/${id}`)

  const remainingData = data.filter(
    item => item.id !== Number(id)
  )

  setData(remainingData)
  setId("")
}


  return (
    <>
      <input
        type="number"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter twit"
        value={twit}
        onChange={(e) => setTwit(e.target.value)}
      />

      <br /><br />

      <button onClick={handleFetchAPI}>Fetch</button>
      <button onClick={handlePostAPI}>Post</button>
      <button onClick={handlePutAPI}>Put</button>
      <button onClick={handleDeleteAPI}>Delete</button>

      <hr />

      {data.map(item => (
        <p key={item.id}>
          {item.id} - {item.twit}
        </p>
      ))}
    </>
  )
}

export default App
