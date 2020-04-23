import React, { Component } from 'react';
import Article from './articleCard';
import styled from 'styled-components'
import { Typography } from '@material-ui/core';

const ArticleWrapper = styled.div`
    padding-top: 10px;
    padding-left: 10vw;
    width: 40vw;
    height: 57.5vh;
    overflow: auto;
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
            <div>
                <GlobalMetaWrapper>
                    <Typography variant="h6">
                        nombre d'articles : 12 | ...
                    </Typography>
                </GlobalMetaWrapper>
                <ArticleWrapper>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/21"}/>
                    <br></br>
                    <Article name={"purée de patate de la marque tatat"} quantity={100.0} quantityUnit={"g"} peremptionDate={"2020/04/25"}/>
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
            </div>
            
        )
    }
}

export default Inventory;