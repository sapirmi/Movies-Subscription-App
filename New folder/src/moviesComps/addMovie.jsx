import "../App.css";
import MovieSettingComp from "./movieSetting";

function AddMovieComp() {


  return (
    <>
      <h2>Add New Movie</h2><br/>
      <MovieSettingComp oldMovie={false} movieId={false}/>
    </>
  );
}

export default AddMovieComp;
