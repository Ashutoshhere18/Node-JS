import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
 
const[title,setTitle]=useState("");
const[description,setDescription]=useState("");
const[genre,setGenre]=useState("");
const[releaseYear,setReleaseYear]=useState("");
const[moviePoster,setMoviePoster]=useState(null);

const[movies,setMovies]=useState([]);
const [editId, setEditId] = useState(null);
const [isEdit, setIsEdit] = useState(false)


const handleSubmit=async()=>{
  const formdata=new FormData();
formdata.append("title",title);
formdata.append("description",description);
formdata.append("genre",genre);
formdata.append("releaseYear",releaseYear);

formdata.append("moviePoster",moviePoster);

  try{
   const result= await axios.post('http://localhost:4040/',formdata);
   alert("Movie Added !..")
   getMovies();
   
  
  }catch(e){
    console.log(e);
    alert("movie not added")
  }
}


const getMovies=async()=>{
  const result=await axios.get("http://localhost:4040/");
  setMovies(result.data);
}

useEffect(()=>{
  getMovies()
},[])


const handleEdit=(movie)=>{
   setTitle(movie.title)
  setDescription(movie.description)
  setGenre(movie.genre)
  setReleaseYear(movie.releaseYear)

  setEditId(movie._id)
   setIsEdit(true)
}

const deleteMovie = async (id) => {
  try {
    await axios.delete(`http://localhost:4040/${id}`)
   getMovies();
    setMovies(prevMovies =>
      prevMovies.filter(movie => movie._id !== id)
    )

  } catch (err) {
    alert("Delete failed")
  }
}

const updateMovie = async () => {
  try {
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("genre", genre)
    formdata.append("releaseYear", releaseYear)

    if (moviePoster) {
      formdata.append("moviePoster", moviePoster)
    }

    await axios.put(`http://localhost:4040/${editId}`, formdata)
     getMovies();
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie._id === editId
          ? { ...movie, title, description, genre, releaseYear }
          : movie
      )
    )

    // reset
    setIsEdit(false)
    setEditId(null)
    setTitle("")
    setDescription("")
    setGenre("")
    setReleaseYear("")
    setMoviePoster(null)

    alert("Movie updated successfully")

  } catch (err) {
    alert("Update failed")
  }
}


  return (
    <>
   
     <div><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter Movie "/></div>
     <div><input type="text" value={description}  onChange={(e)=>setDescription(e.target.value)}  placeholder="Enter Description "/></div>
     <div><input type="text" value={genre}  onChange={(e)=>setGenre(e.target.value)}  placeholder="Enter Genre "/></div>
     <div><input type="number" value={releaseYear}  onChange={(e)=>setReleaseYear(e.target.value)}  placeholder="Enter release Year"/></div>
     <div><input type="file"  onChange={(e)=>setMoviePoster(e.target.files[0])} /></div>
    <button onClick={isEdit ? updateMovie : handleSubmit}>
  {isEdit ? "Update" : "Submit"}
</button>

   
     <hr />

    <h2>Movie List</h2>

    {movies.map(movie => (
      <div key={movie._id} style={{ border: "1px solid gray", margin: 10 }}>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p>{movie.genre} | {movie.releaseYear}</p>

        <img
          src={`http://localhost:4040/uploads/${movie.moviePoster}`}
          width="150"
        />

        <br />
        <button onClick={() => deleteMovie(movie._id)}>Delete</button>
        <br/>
        <button onClick={() => handleEdit(movie)}>Edit</button>

      </div>
    ))}
       
    </>
  )
} 

export default App
