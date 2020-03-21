import React, { Component } from "react";
import Hero from './Hero';
import Imagine from './Imagine';
import Access from './Access';
import Form from './Form';

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Hero />
                <Imagine />
                <Access />
                <Form />
            </>
        )
    }
}

export default LandingPage;