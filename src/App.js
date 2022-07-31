import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Routes, Route } from "react-router-dom";
import Temp from "./components/Temp";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress: 0
  }
  setProgress(progress) {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <div className="container">
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={10}
          />
        </div>

        <Routes>
          <Route excat path="/" element={<News apiKey={this.apiKey} key="general" pageSize={5} country={"in"} category={"general"} />} />
          <Route excat path="/business" element={<News apiKey={this.apiKey} key="business" pageSize={5} country={"in"} category={"business"} />} />
          <Route excat path="/entertainment" element={<News apiKey={this.apiKey} key="entertainment" pageSize={5} country={"in"} category={"entertainment"} />} />
          <Route excat path="/general" element={<News apiKey={this.apiKey} key="general" pageSize={5} country={"in"} category={"general"} />} />
          <Route excat path="/health" element={<News apiKey={this.apiKey} key="health" pageSize={5} country={"in"} category={"health"} />} />
          <Route excat path="/science" element={<News apiKey={this.apiKey} key="science" pageSize={5} country={"in"} category={"science"} />} />
          <Route excat path="/sports" element={<News apiKey={this.apiKey} key="sports" pageSize={5} country={"in"} category={"sports"} />} />
          <Route excat path="/technology" element={<News apiKey={this.apiKey} key="technology" pageSize={5} country={"in"} category={"technology"} />} />
          <Route excat path="/temp" element={ <Temp/>} />
      </Routes>
      </div>
    );
  }
}
