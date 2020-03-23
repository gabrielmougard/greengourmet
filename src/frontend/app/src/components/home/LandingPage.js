import React, { Component } from "react";
import Header from './Header';
import Hero from './Hero';
import Imagine from './Imagine';
import ContactForm from "./ContactForm";
import Footer from './Footer';

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <>
                <Header history={this.props.history}/>
                <Hero />
                <Imagine />
                <Footer />
            </>
        )
    }
}

export default LandingPage;