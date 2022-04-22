import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import Weather from './Weather';
import Movie from './Movie';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      navigationData: [],
      navigationName: 'Location: ',
      lon: 0,
      lat: 0,
      clickExplore: false,
      url: '',
      error: false,
      errorMessage: '',
      city: '',
      weather: [],
      showWeather:false,
      movies:[],
      showMovies: false
    };
  }





  handleCityInput = (e) => {
    console.log(e.target.value);
    this.setState({
      city: e.target.value

    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

      let navigationData = await axios.get(url);
      let lon = navigationData.data[0].lon
      let lat = navigationData.data[0].lat
      let displayName = navigationData.data[0].display_name
      let base_Url = 'https://maps.locationiq.com/v3/staticmap';
      let map_Url = `${base_Url}?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=10&format=jpg`;


      

      
      this.setState({
        lon: lon,
        lat: lat,
        displayName: displayName,
        url: map_Url,
      });
      
      this.getWeather(this.state.city);
      this.getMovies(this.state.city);
  
    } catch (error){
      
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`
      })
    }
  }
  
  getWeather = async (name) => {
    try{
      console.log(name);
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${name}`
      let weatherResponse = await axios.get(url)
      

      console.log(weatherResponse);
      this.setState({
        weather: weatherResponse.data,
        showWeather: true
      })
    }catch(error){
      this.setState({
        error: true,
        errorMessage: error.message,
        showWeather: false
      })

    }
  } 
    
    // ************************ MOVIES ************************

  getMovies = async (cityName) => {
    try{
      
      let url = `${process.env.REACT_APP_SERVER}/movie?searchQuery=${cityName}`
      let movieResponse = await axios.get(url)
      
      console.log('*******************', movieResponse, '*********************************************************************************************ASdfsafdsaf*');
      
      this.setState({
          movies: movieResponse.data,
          showMovies: true
        })

    }catch(error){
      this.setState({
        error: true,
        errorMessage: error.message,
        showMovies: false
      })

    }
  } 

// ************************ MOVIES ************************





    render() {

      return (
        <>
        <Card
          style={{
            height: '60%',
            width: '60%',
            padding: '6em',
            color: 'grey',
            backgroundColor: 'white',
            borderRadius: '6em'
          }}/>
        
        
        <Card.Body>
          <Card.Title>
            {this.state.navigationName}
          </Card.Title>
          <Card.Text>
              Lon: {this.state.lon}
            </Card.Text>
            <Card.Text>
              Lat: {this.state.lat}
            </Card.Text>
        </Card.Body>
        <>
        {this.state.url && <img src={this.state.url} alt={this.state.displayName}></img>}
        
        </>



          <h1> Data from an API</h1>
          <form onSubmit={this.handleSubmit}>

            <label>Pick a City
              <input type="text" onInput={this.handleCityInput} />
            </label>
            <Button type='submit'>Explore</Button>
          </form>

          {/* **************************** WEATHER **************************** */}

          {this.state.showWeather && 
          <Weather weatherData={this.state.weather} />
          }
          {/* **************************** WEATHER **************************** */}


          {/* **************************** MOVIE **************************** */}
          
          {/* {this.state.showMovies &&
          <Movie movieData={this.state.movies} /> */}
          }
          {/* **************************** MOVIE **************************** */}



          {this.state.error && <p>{this.state.errorMessage}</p>}

        </>

      )
    }
  }


export default App;


