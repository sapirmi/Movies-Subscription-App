import MenuComp from "../generalComps/menu"

function MoviePageComp() {

  return (
    <>
      <h1>Movies</h1><br/>
      <MenuComp text="Movies" linkAll="show-movies" linkAdd="add-movie"/>
    </>
  )
}

export default MoviePageComp
