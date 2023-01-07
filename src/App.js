import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecgnition/FaceRecognition';
import ParticlesBg from 'particles-bg';
 
// reset to initial State
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

/* APP COMPONENt */

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  /* LOGIC */

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
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
    fetch('http://localhost:3000/imageUrl', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                input: this.state.input
              })
            })
            .then(response => response.json())
            .then(result => {
              if(result) {
                fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id
                  })
                })
                .then(response => response.json())
                .then((count) => {
                  this.setState(Object.assign(this.state.user, {entries: count}))
                })
                .catch(err => {console.log(err)})
              }
              this.displayFaceBox(this.calculateFaceLoaction(result))
            })
            .catch(err => {console.log(`Can't detect face.. ${err}`)})
    
    }

    /* CONPONENTS */
    render() {
      return (
        <div>
          <ParticlesBg type="cobweb" num={150} bg={true} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
            </div>
          : (
            this.state.route === 'signin' 
            ? <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
            }
        </div>
      );

    }
}

export default App;
