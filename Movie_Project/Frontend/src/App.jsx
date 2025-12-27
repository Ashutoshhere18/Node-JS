import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
 
const[title,setTitle]=useState("");
const[description,setDescription]=useState("");
const[genre,setGenre]=useState("");
const[releaseYear,setReleaseYear]=useState("");
const[file,setFile]=useState("");


const handleSubmit=async()=>{
  const formdata=new FormData();
formdata.append("title",title);
formdata.append("description",description);
formdata.append("genre",genre);
formdata.append("releaseYear",releaseYear);

formdata.append("moviePoster",file);

  try{
   const result= await axios.post('http://localhost:4040/');
  
  }catch(e){
    console.log("Movie Not Added!...");
  }
}
  return (
    <>
     <div><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter Movie "/></div>
     <div><input type="text" value={description}  onChange={(e)=>setDescription(e.target.value)}  placeholder="Enter Description "/></div>
     <div><input type="text" value={genre}  onChange={(e)=>setGenre(e.target.value)}  placeholder="Enter Genre "/></div>
     <div><input type="number" value={releaseYear}  onChange={(e)=>setReleaseYear(e.target.value)}  placeholder="Enter release Year"/></div>
     <div><input type="file"  onChange={(e)=>setFile(e.target.files[0])} /></div>
     <button onClick={handleSubmit}>Submit</button>
    </>
  )
} 

export default App
