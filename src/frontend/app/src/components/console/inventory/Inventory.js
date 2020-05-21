import React, { Component } from 'react';
import Article from './articleCard';
import styled from 'styled-components'
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Inventory.css'
const ArticleWrapper = styled.div`
    padding-top: 10px;
    padding-left: 6.7vw;
    width: 60vw;
    height: 51vh;
    overflow-x: hidden;
`

const GlobalMetaWrapper = styled.div`
    padding-left: 10vw;
`

class Inventory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="inventory-root-content">
            <Card id='articleList' className="scanner-card" variant="outlined">
            <CardContent>
                <GlobalMetaWrapper>
                    <Typography variant="h6">
                        nombre d'articles : 12 | ...
                    </Typography>
                </GlobalMetaWrapper>
                <ArticleWrapper>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/21"}/>
                    <br></br>
                    <Article name={"lait d'amende"} quantity={10.0} quantityUnit={"L"} peremptionDate={"2021/04/30"}/>
                    <br></br>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/30"}/>
                    <br></br>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/05/21"}/>
                    <br></br>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/24"}/>
                    <br></br>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/21"}/>
                    <br></br>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/21"}/>
                </ArticleWrapper>
                </CardContent>
                </Card>
            </div>
            
        )
    }
}

export default Inventory;