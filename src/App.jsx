/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import Home from "./Home";
import Navbar from './components/Navbar'


import "./scss/app.scss";


export default class extends Component {
    render() {

        return (
            <>  
             <Navbar/>
              <Home/> 
            </>
        );
    }
}
