import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import {Signin} from './components/Signin/Signin';
import {Register} from './components/Register/Register';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions= {
  particles: {
    number:{
      value:60,
      density: {
        enable:false,
        value_area:200
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box:{},
      celebrityName:'',
      route:'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
}

class App extends Component {

  constructor() {
    super();
    this.state= initialState;
  }

  loadUser = (data) => {
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email:data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: (clarifaiFace.left_col) * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - ((clarifaiFace.right_col) * width),
      bottomRow: height - ((clarifaiFace.bottom_row) * height)
    }
  }

  displayFaceBox = (box, data) => {
    console.log(data);
    this.setState({box: box});
    this.setState({celebrityName: data.outputs[0].data.regions[0].data.face.identity.concepts[0].name});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    fetch('https://immense-thicket-86460.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          }) 
    })
    .then(response=> response.json())
    .then(response => {
      if(response) {
        fetch('https://immense-thicket-86460.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          }) 
        })
        .then(response => response.json())
        .then(count => {
           this.setState(Object.assign(this.state.user, {entries:count}))
        })
        .catch(console.log)
      }
     this.displayFaceBox(this.calculateFaceLocation(response), response)
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout' || route === 'signin' || route === 'register') {
      this.setState(initialState);
    } else {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="Particles"
            params={particlesOptions}
          />
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}/>
        {this.state.route === 'home' ? 
        <div>
          <Logo />
          <Rank 
            name= {this.state.user.name}
            entries={this.state.user.entries}
          />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
          <div className = ''>
            <h2>{this.state.celebrityName}</h2>
          </div>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div> :
        (
          this.state.route === 'register' ?
          <Register 
          loadUser={this.loadUser}
          onRouteChange= {this.onRouteChange}/> :
          <Signin 
            loadUser={this.loadUser}
            onRouteChange= {this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
