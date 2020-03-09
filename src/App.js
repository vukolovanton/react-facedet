import React, { Component } from "react";
import "./App.css";

import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Registration/Register";
import Loading from './components/Loading/Loading'

import config from './particles-config'

import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "d1a1c00e0188478abe08f1b99d2434a1"
});

const initialState = {
  input: "",
  imageUrl: "",
  isLoading: false,
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: "0",
    joinded: ""
  },
  details: {
    firstTag: null,
    secondTag: null,
    thirdTag: null
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joinded
      }
    });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input, isLoading: true });

    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
              this.secondDataFetch();
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(error => console.log(error));
  };

  secondDataFetch = () => {
    app.models
      .initModel({
        id: Clarifai.GENERAL_MODEL,
        version: "aa7f35c01e0642fda5cf400f543e7c40"
      })
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        var concepts = response["outputs"][0]["data"]["concepts"];
        for (var i = 0; i < concepts.length; i++) {
          if (concepts[i].value > 0.9) {
            this.setState(
              Object.assign(this.state.details, {
                firstTag: concepts[i].name,
                secondTag: concepts[i + 1].name,
                thirdTag: concepts[i + 2].name
              })
            );
          }
        }
      }).then(this.setState({isLoading: false}));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={config}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <Rank
              name={this.state.user.name}
              enteries={this.state.user.entries}
              firstTag={this.state.details.firstTag}
              secondTag={this.state.details.secondTag}
              thirdTag={this.state.details.thirdTag}
            />
            <Loading isLoading={this.state.isLoading} />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
