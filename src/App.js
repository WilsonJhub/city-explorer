import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationData: [],
      navigationName: 'Location: ',
      lon: 0,
      lat: 0,


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

    
    
    
    // get city data?
  
  



    render() {
      return (
        <>
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
