import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading : true,
    movies : [],
  
  };

  getMovies = async () => {   // axios가 느릴거라 비동기를 걸어줘야함.
    const {data :{ data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating"); // API 호출
                  // await 는 axios가 다 불러올때까지 기다려~~
    this.setState({movies, isLoading : false})  // state의 movies키에 axios의 movies value저장
                }
  componentDidMount() { // rander가 된 후에 호출
    // setTimeout(()=> {  // delay function 6초 뒤에 false로 (비동기)
    //   this.setState({isLoading : false});
    // }, 6000);
    this.getMovies();
    
  }
  render(){
    const {isLoading , movies} = this.state;
  return(
  <section className = "container">
    {isLoading ? 
    (<div className="loader">
      <span className='loader__text'>Loading...</span>
    </div>
   ) : (
      <div className= 'movies'>
        { movies.map(movie => (
            <Movie
              key = {movie.id}
              id={movie.id} 
              year={movie.year} 
              title={movie.title} 
              summary={movie.summary} 
              poster={movie.medium_cover_image }
              genres = {movie.genres}
            />
        ))} 
      </div>  
    )}
  </section>
  )
}
}
export default App;
