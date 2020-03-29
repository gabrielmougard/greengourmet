import React, { Component } from "react";

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
        <div>
            <p>coucou {name}, ton mail est : {email}</p>
        {(imgHere) ? (
            <img src= {imgURL} />
        ) : (
            <p>no detected image</p>
        )}
        </div>    
        )
        
    }
}

export default Console;