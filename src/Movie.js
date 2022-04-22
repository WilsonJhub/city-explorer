import React from 'react';
import { Card } from 'react-bootstrap';

class Movie extends React.Component {



  render() {
     
      
    return (
      this.props.movieData.map((movie, idx) => (
        
        <div key={idx}>
          {/* place a card here */}

          <Card.Body>
          <Card.Title>
            {movie.title}
          </Card.Title>
          <Card.Text>
               {movie.description}
               {movie.overview}
               {movie.release_date}
               {movie.poster_path}
               {movie.vote_average}
               {movie.vote_count}
               {movie.popularity}
            </Card.Text>
        </Card.Body>


          {movie.title}
        
        </div>
      ))
    )
  }
}


export default Movie;
