import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  /* LOGIC */

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
    }})
  }

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

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }

    render() {
      return (
        <div>
          <ParticlesBg type="cobweb" num={150} bg={true} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
            </div>
          : (
            this.state.route === 'signin' 
            ? <Signin  onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
            }
        </div>
      );

    }
}

export default App;
