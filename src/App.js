import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationData: [],
      navigationName: 'Location: ',
      lon: 0,
      lat: 0,
      clickExplore: false,
      error: false,
      errorMessage: ''
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
      // clickExplore: true


      this.setState({
        lon: lon,
        lat: lat,
        displayName: displayName


      });
      console.log(navigationData);

    } catch (error){
        console.log('error: ', error.response);
        this.setState({
          error: true,
          errorMessage: `An Error Occurred: ${error.response.status}`
        })
      }
  }

    
    

  
  



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
        {
          this.state.Explore
          ?
          <Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONAPI}&center=${this.state.lat},${this.state.lon}&zoom=12`} />
          :
          <Card.Img variant="bottom" />
        }


          <h1> Data from an API</h1>
          <form onSubmit={this.handleSubmit}>

            <label>Pick a City
              <input type="text" onInput={this.handleCityInput} />
            </label>
            <Button type='submit'>Explore</Button>
          </form>
        </>

      )
    }
  }


export default App;


//editing for Allen Brazier comment