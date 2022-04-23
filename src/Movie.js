import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class Movie extends React.Component {



  render() {
     
      
    return (
      this.props.movieData.map((movie, idx) => (
        
        <div key={idx}>
          {/* place a card here */}
          <Card border="success" style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>
            {movie.title}
          </Card.Title>
          <Card.Img src={movie.image_url} alt={movie.title} variant={'top'} />
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
        </Card>


          {movie.title}
        
        </div>
      ))
    )
  }
}


export default Movie;
