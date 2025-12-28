// import { useState,useEffect } from 'react'
// import './App.css'
// import axios from 'axios'

// function App() {
 
// const[title,setTitle]=useState("");
// const[description,setDescription]=useState("");
// const[genre,setGenre]=useState("");
// const[releaseYear,setReleaseYear]=useState("");
// const[moviePoster,setMoviePoster]=useState(null);

// const[movies,setMovies]=useState([]);
// const [editId, setEditId] = useState(null);
// const [isEdit, setIsEdit] = useState(false)


// const handleSubmit=async()=>{
//   const formdata=new FormData();
// formdata.append("title",title);
// formdata.append("description",description);
// formdata.append("genre",genre);
// formdata.append("releaseYear",releaseYear);

// formdata.append("moviePoster",moviePoster);

//   try{
//    const result= await axios.post('http://localhost:4040/',formdata);
//    alert("Movie Added !..")
//    getMovies();
   
  
//   }catch(e){
//     console.log(e);
//     alert("movie not added")
//   }
// }


// const getMovies=async()=>{
//   const result=await axios.get("http://localhost:4040/");
//   setMovies(result.data);
// }

// useEffect(()=>{
//   getMovies()
// },[])


// const handleEdit=(movie)=>{
//    setTitle(movie.title)
//   setDescription(movie.description)
//   setGenre(movie.genre)
//   setReleaseYear(movie.releaseYear)

//   setEditId(movie._id)
//    setIsEdit(true)
// }

// const deleteMovie = async (id) => {
//   try {
//     await axios.delete(`http://localhost:4040/${id}`)
//    getMovies();
//     setMovies(prevMovies =>
//       prevMovies.filter(movie => movie._id !== id)
//     )

//   } catch (err) {
//     alert("Delete failed")
//   }
// }

// const updateMovie = async () => {
//   try {
//     const formdata = new FormData()
//     formdata.append("title", title)
//     formdata.append("description", description)
//     formdata.append("genre", genre)
//     formdata.append("releaseYear", releaseYear)

//     if (moviePoster) {
//       formdata.append("moviePoster", moviePoster)
//     }

//     await axios.put(`http://localhost:4040/${editId}`, formdata)
//      getMovies();
//     setMovies(prevMovies =>
//       prevMovies.map(movie =>
//         movie._id === editId
//           ? { ...movie, title, description, genre, releaseYear }
//           : movie
//       )
//     )

//     // reset
//     setIsEdit(false)
//     setEditId(null)
//     setTitle("")
//     setDescription("")
//     setGenre("")
//     setReleaseYear("")
//     setMoviePoster(null)

//     alert("Movie updated successfully")

//   } catch (err) {
//     alert("Update failed")
//   }
// }


//   return (
//     <>
   
//      <div><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter Movie "/></div>
//      <div><input type="text" value={description}  onChange={(e)=>setDescription(e.target.value)}  placeholder="Enter Description "/></div>
//      <div><input type="text" value={genre}  onChange={(e)=>setGenre(e.target.value)}  placeholder="Enter Genre "/></div>
//      <div><input type="number" value={releaseYear}  onChange={(e)=>setReleaseYear(e.target.value)}  placeholder="Enter release Year"/></div>
//      <div><input type="file"  onChange={(e)=>setMoviePoster(e.target.files[0])} /></div>
//     <button onClick={isEdit ? updateMovie : handleSubmit}>
//   {isEdit ? "Update" : "Submit"}
// </button>

   
//      <hr />

//     <h2>Movie List</h2>

//     {movies.map(movie => (
//       <div key={movie._id} style={{ border: "1px solid gray", margin: 10 }}>
//         <h3>{movie.title}</h3>
//         <p>{movie.description}</p>
//         <p>{movie.genre} | {movie.releaseYear}</p>

//         <img
//           src={`http://localhost:4040/uploads/${movie.moviePoster}`}
//           width="150"
//         />

//         <br />
//         <button onClick={() => deleteMovie(movie._id)}>Delete</button>
//         <br/>
//         <button onClick={() => handleEdit(movie)}>Edit</button>

//       </div>
//     ))}
       
//     </>
//   )
// } 

// export default App


import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [releaseYear, setReleaseYear] = useState("")
  const [moviePoster, setMoviePoster] = useState(null)

  const [movies, setMovies] = useState([])
  const [editId, setEditId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const getMovies = async () => {
    const res = await axios.get("http://localhost:4040/")
    setMovies(res.data)
  }

  useEffect(() => {
    getMovies()
  }, [])

  const handleSubmit = async () => {
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("genre", genre)
    formdata.append("releaseYear", releaseYear)
    formdata.append("moviePoster", moviePoster)

    await axios.post("http://localhost:4040/", formdata)
    getMovies()
    resetForm()
  }

  const handleEdit = (movie) => {
    setTitle(movie.title)
    setDescription(movie.description)
    setGenre(movie.genre)
    setReleaseYear(movie.releaseYear)
    setEditId(movie._id)
    setIsEdit(true)
  }

  const updateMovie = async () => {
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("genre", genre)
    formdata.append("releaseYear", releaseYear)
    moviePoster && formdata.append("moviePoster", moviePoster)

    await axios.put(`http://localhost:4040/${editId}`, formdata)
    getMovies()
    resetForm()
  }

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:4040/${id}`)
    getMovies()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setGenre("")
    setReleaseYear("")
    setMoviePoster(null)
    setEditId(null)
    setIsEdit(false)
  }

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        🎬 Movie Manager
      </header>

      {/* Form */}
      <section className="form-card">
        <h2>{isEdit ? "Update Movie" : "Add New Movie"}</h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Movie Title"
        />

        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
        />

        <input
          value={releaseYear}
          onChange={e => setReleaseYear(e.target.value)}
          placeholder="Release Year"
        />

        <input
          type="file"
          onChange={e => setMoviePoster(e.target.files[0])}
        />

        <button
          className="primary"
          onClick={isEdit ? updateMovie : handleSubmit}
        >
          {isEdit ? "Update Movie" : "Add Movie"}
        </button>
      </section>

      {/* Movie List */}
      <section className="movie-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>

            <img
              src={`http://localhost:4040/uploads/${movie.moviePoster}`}
              alt={movie.title}
            />

            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="desc">{movie.description}</p>
              <span className="tag">
                {movie.genre} • {movie.releaseYear}
              </span>

              <div className="actions">
                <button className="edit" onClick={() => handleEdit(movie)}>
                  Edit
                </button>
                <button className="delete" onClick={() => deleteMovie(movie._id)}>
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </section>

    </div>
  )
}

export default App
