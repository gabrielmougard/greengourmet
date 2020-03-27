import React, { Component } from "react";
import './Error404.css'
import broken from '../../assets/images/imbroken.gif';

class Error404 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="page-container">
                <div className="bg" style={{ backgroundImage: 'url(' + broken + ')'}}></div>
                <h1 className="title">404</h1>
            </div>
        )
    }
}

export default Error404;