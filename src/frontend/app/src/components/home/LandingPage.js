import React, { Component } from "react";
import Header from './Header';
import Hero from './Hero';
import Imagine from './Imagine';
import ContactForm from "./ContactForm";

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Header />
                <Hero />
                <Imagine />
                
            </>
        )
    }
}

export default LandingPage;