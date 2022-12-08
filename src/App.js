import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecgnition/FaceRecognition';
import ParticlesBg from 'particles-bg';


const USER_ID = 'no_cap';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '88af9cf3c0434bdfa1a283e888ccf665';
const APP_ID = 'Face_detection';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';   

/* APP COMPONENt */

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  /* LOGIC */

  // calculation of the box postion 
  calculateFaceLoaction = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width ,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width) ,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // displayFaceBox get the calculation and store 
  // the info into box object in state
  displayFaceBox = (box) => {
    this.setState({box: box})
  }
  
  /* FUNCTIONS */

  // get the value from the input 
  onInputChange = (event) => {
    this.setState({input: event.target.value}) 
  }
  // on click we grab the input URL and display an image also detect faces
  onButtonClick = () => {
    this.setState({imageUrl: this.state.input})
    const IMAGE_URL = this.state.input;
      const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => this.displayFaceBox(this.calculateFaceLoaction(result)))
        .catch(error => console.log('error', error));
    }

    render() {
      return (
        <div>
          <ParticlesBg type="cobweb" num={150} bg={true} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
      );

    }
}

export default App;
