import React, { Component } from "react";

import ConsoleHeader from './ConsoleHeader';

class Console extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        const name = this.props.currentUser.name
        const email = this.props.currentUser.email

        let imgURL;
        let imgHere = false;
        if (this.props.currentUser.imageUrl) {
            imgURL = this.props.currentUser.imageUrl;
            imgHere = true
        }
        return (
            <ConsoleHeader />
        )
    }
}

export default Console;