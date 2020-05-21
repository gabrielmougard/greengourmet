import React, { Component } from 'react';
import RecipesCard from './recipesCard';
import RecipesFilter from './filterCard';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import ItemLoader from '../dashbord/ItemLoader';

//images
import fridgeImage from '../../../assets/images/fridge.png'

//redux 
import { connect } from 'react-redux'

//actions
import { getRecipes } from '../../../actions';

import './Recipes.css'
const RecipesWrapper = styled.div`
    padding-top: 10px;
    width: 60vw;
    height: 70vh;
    overflow-y: auto;
`
const EmptyFridgeWrapper = styled.img(props => ({
    src: props.src,
    borderRadius: '50px',
    width: '400px',
    height: '400px',
}));

const EmptyFridgeBox = styled.div`
    text-align: center;
`

const EmptyMessageWrapper = styled.div`
    margin-bottom: 40px;
`


class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        //get the recipes
        let recipesContent
        if (this.props.recipes) {
            if (this.props.recipes.recettes) {
                let recipesArray = []
                for (const idx in this.props.recipes.recettes) {
                    recipesArray.push(
                        <RecipesCard 
                            name={this.props.recipes.recettes[idx].name} 
                            numerateur ={"4"} 
                            denominateur ={'5'} 
                            recommendation={this.props.recipes.recettes[idx].recommendation} 
                            level={'facile'} 
                            picture={this.props.recipes.recettes[idx].imageURL}
                        />
                    )
                }
                recipesContent = recipesArray
            } else {
                //put an error message insode recipesContent
                recipesContent = 
                <EmptyFridgeBox> 
                    <EmptyMessageWrapper>
                        <Typography variant="h5">  Les recettes n'ont pas pu être généré ! </Typography>
                    </EmptyMessageWrapper>
                    <EmptyFridgeWrapper src={fridgeImage}></EmptyFridgeWrapper>
                </EmptyFridgeBox>
            }

        } else {
            //set a loader while recipes are being fetched
            if (this.props.inventory) {
                this.props.getRecipes(this.props.inventory)
                recipesContent = 
                <>
                    <ItemLoader></ItemLoader>
                    <br></br>
                    <ItemLoader></ItemLoader>
                    <br></br>
                    <ItemLoader></ItemLoader>
                    <br></br>
                    <ItemLoader></ItemLoader>
                    <br></br>
                    <ItemLoader></ItemLoader>
                </>
            } else {
                //The user has not scanned anything yet.
                recipesContent =
                <EmptyFridgeBox> 
                    <EmptyMessageWrapper>
                        <Typography variant="h5">  Remplis ton frigo avec le scanner avant de générer des recettes ! </Typography>
                    </EmptyMessageWrapper>
                    <EmptyFridgeWrapper src={fridgeImage}></EmptyFridgeWrapper>
                </EmptyFridgeBox>
            }
            
        }

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
                    <div className="generate-recipe-button-wrapper">     
                       <RecipesFilter/>       
                    </div>  
                    </CardContent>
                </Card>
        </Grid>
    <Grid md={7} >
<Card id='recipesList' className="scanner-card" variant="outlined">
    <CardContent>
    <div>
        <Typography variant="h5" component="h2">
            Recettes                            
        </Typography>
    </div>
    <br></br>
    <br></br>
        <div>
            <>
            <RecipesWrapper>
                {recipesContent}
            </RecipesWrapper>
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

const mapStateToProps = (state) => {
    return {
        inventory: state.inventory,
        recipes: state.recipes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipes: (inventory) => {dispatch(getRecipes(inventory))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);