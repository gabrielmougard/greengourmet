import React, { Component } from 'react';
import Article from './articleCard';

class Inventory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Article name={"purée de patate"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/05/01"}/>
            </>
        )
    }
}

export default Inventory;