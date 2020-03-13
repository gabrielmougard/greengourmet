import React, { Component } from "react";


class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Hero
                    id='home'
                    scrollId='imagine'
                />
                <Imagine />
                <Access />
                <Form />
            </>
        )
    }
}

export default LandingPage