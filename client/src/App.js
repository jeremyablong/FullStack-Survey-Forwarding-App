import React, { Component } from 'react';
import NavbarHome from "./components/navbar/navbar.js";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import { fetchUser } from "./actions/index.js";
import { connect } from "react-redux";
import NavbarSurveys from "./components/navbar/navbar-surveys/navbar-surveys.js";
import NavbarSurveysNew from "./components/navbar/surveys-new/surveys-new.js";
import Jumbotron from "./components/homepage/jumbotron.js";
import SurveyNew from "./components/surveys-new/surveyNew.js";



////////////////// EDIT THESE FILES FOR PRODUCTION ///////////////
// 1. express - routes/authRoutes.js


const Header = () => {
  return <h1>header</h1>
}
const Dashboard = () => {
  return <h1>Surveys dashboard</h1>
}
const Landing = () => {
  return <h1>Landing</h1>
}

class App extends Component {
  componentDidMount () {
     this.props.fetchUser();
  }
  render() {
      return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={NavbarHome}/>
          <Route exact path="/" component={Jumbotron}/>
          <Route exact path="/surveys" component={NavbarSurveys}/>
         {/* <Route exact path="/surveys" component={Dashboard}/>*/}
          <Route exact path="/surveys/new" component={NavbarSurveysNew}/>
          <Route exact path="/surveys/new" component={SurveyNew}/>
        </div>
      </BrowserRouter>
      );
  }
}


export default connect(null, { fetchUser })(App);
