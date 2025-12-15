
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
// import axios from "axios"
// import { useState } from "react"

// function App() {

//   const [id, setId] = useState("")
//   const [twit, setTwit] = useState("")
//   const [data, setData] = useState([])

//   // GET
//   const handleFetchAPI = async () => {
//     const res = await axios.get("http://localhost:4000/")
//     setData(res.data)
//   }

//   // POST
//   const handlePostAPI = async () => {
//     const res = await axios.post("http://localhost:4000/", {
//       id: Number(id),
//       twit: twit
//     })
//     setData([...data, res.data])
//     setId("")
//     setTwit("")
//   }

//   // PUT
//  const handlePutAPI = async () => {
//   await axios.put("http://localhost:4000/", {
//     id: Number(id),
//     twit: twit
//   });

//   // update UI manually
//   const updatedData = data.map(item =>
//     item.id === Number(id)
//       ? { id: Number(id), twit: twit }
//       : item
//   );

//   setData(updatedData);
//   setTwit("");
// };


//   // DELETE
//  const handleDeleteAPI = async () => {
//   await axios.delete(`http://localhost:4000/${id}`)

//   const remainingData = data.filter(
//     item => item.id !== Number(id)
//   )

//   setData(remainingData)
//   setId("")
// }


//   return (
//     <>
//       <input
//         type="number"
//         placeholder="Enter ID"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Enter twit"
//         value={twit}
//         onChange={(e) => setTwit(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={handleFetchAPI}>Fetch</button>
//       <button onClick={handlePostAPI}>Post</button>
//       <button onClick={handlePutAPI}>Put</button>
//       <button onClick={handleDeleteAPI}>Delete</button>

//       <hr />

//       {data.map(item => (
//         <p key={item.id}>
//           {item.id} - {item.twit}
//         </p>
//       ))}
//     </>
//   )
// }

// export default App


import axios from "axios";
import { useEffect, useState } from "react";
import "./twitter.css";

export default function App() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTweets();
  }, []);

  const loadTweets = async () => {
    const res = await axios.get("http://localhost:4000/");
    setTweets(res.data.reverse());
  };

  const addTweet = async () => {
    if (!tweet.trim()) return;

    if (editId) {
      await axios.put("http://localhost:4000/", {
        id: editId,
        twit: tweet,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:4000/", {
        id: Date.now(),
        twit: tweet,
      });
    }

    setTweet("");
    loadTweets();
  };

  const deleteTweet = async (id) => {
    await axios.delete(`http://localhost:4000/${id}`);
    loadTweets();
  };

  const editTweet = (item) => {
    setTweet(item.twit);
    setEditId(item.id);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* LEFT SIDEBAR */}
        <div className="col-md-3 d-none d-md-block sidebar">
          <h3 className="text-primary mb-4">🐦 Mini Twitter</h3>
          <div className="menu-item">🏠 Home</div>
          <div className="menu-item">🔍 Explore</div>
          <div className="menu-item">🔔 Notifications</div>
          <div className="menu-item">✉️ Messages</div>
          <div className="menu-item">👤 Profile</div>
          <button className="btn-tweet mt-4 w-100">Tweet</button>
        </div>

        {/* CENTER FEED */}
        <div className="col-md-6 col-12 border-start border-end border-secondary">

          {/* TWEET BOX */}
          <div className="tweet-box p-3 border-bottom border-secondary">
            <div className="d-flex gap-3">
              <img
                src="https://i.pravatar.cc/50"
                className="rounded-circle"
                alt=""
              />
              <textarea
                rows="2"
                className="w-100"
                placeholder="What’s happening?"
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
              />
            </div>
            <div className="text-end mt-2">
              <button className="btn-tweet" onClick={addTweet}>
                {editId ? "Update" : "Tweet"}
              </button>
            </div>
          </div>

          {/* TWEETS */}
          {tweets.map((item) => (
            <div key={item.id} className="tweet-card">
              <div className="d-flex gap-3">
                <img
                  src="https://i.pravatar.cc/50?img=12"
                  className="rounded-circle"
                  alt=""
                />
                <div>
                  <strong>Dummy User</strong>
                  <p>{item.twit}</p>
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => editTweet(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTweet(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-3 d-none d-md-block sidebar">
          <div className="trends">
            <h5>Trends for you</h5>
            <p>#BreakingNews</p>
            <p>#JavaScript</p>
            <p>#ReactJS</p>
            <p>#NodeJS</p>
          </div>
        </div>

      </div>
    </div>
  );
}
