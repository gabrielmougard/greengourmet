import React, { Component } from 'react';
import RecipesCard from './recipesCard';
import RecipesFilter from './filterCard';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import './Recipes.css'
const RecipiesWrapper = styled.div`
    padding-top: 10px;
    width: 60vw;
    height: 70vh;
    overflow-y: auto;
`

class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard-root-content">
            <Grid container className="dashboard-root-content"
                    direction="row"
                    justify="flex-start"
                    >
                        
            <Grid md={2.5}>
            <Card id='filterList' className="scanner-card" variant="outlined">
                    <CardContent>
                    <Typography variant="h5" component="h2">
                       Filtres  
                    </Typography>
                    <br></br>
                    <br></br>
                    <div className="generate-recipe-button-wrapper">     
                       <RecipesFilter/>       
                    </div>  
                    </CardContent>
                </Card>
        </Grid>
    <Grid md={7} >
<Card id='recipesList' className="scanner-card" variant="outlined">
    <CardContent>
    <Typography variant="h5" component="h2">
        Recettes                            
    </Typography>
    <br></br>
    <br></br>
        <div>
            <>
            <RecipiesWrapper>
                <RecipesCard name={"pates boloniase"} numerateur ={"4"} denominateur ={'5'} recommendation={'4.9'} level={'facile'} picture={'https://cutt.ly/Oyg38LY'}/>
                <br></br>
                <RecipesCard name={"curry d'agneau"} numerateur ={"3"} denominateur = {'6'}recommendation={'3.8'} level={'difficile'}/>
                <br></br>
                <RecipesCard name={"porc au caramel"} numerateur ={"1"} denominateur ={'4'} recommendation={'4.2'} level={'moyen'} picture={'https://cutt.ly/yyg8qju'} />
                <br></br>
                <RecipesCard name={"poulet roti"} numerateur ={"3"} denominateur ={'3'} recommendation={'4'} level={'facile'}/>
            </RecipiesWrapper>
            </>
        </div>
    </CardContent>
</Card>
    </Grid>
    </Grid>
    </div>
        )
    }
}

export default Recipes;