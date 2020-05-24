import React, { Component, useEffect } from 'react';
import RecipesCard from './recipesCard';
import RecipesFilter from './filterCard';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import ItemLoader from '../dashbord/ItemLoader';
import MemoryIcon from '@material-ui/icons/Memory';
import Button from '@material-ui/core/Button';

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

const MoreRecipesWrapper = styled.div`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 40px;
`

function Recipes({inventory, recipes, getRecipes}) {

    const loaderRecipes =
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
    const [recipesContent, setRecipesContent] = React.useState([loaderRecipes])
    const [cachedRecipes, setCachedRecipes] = React.useState([])
    const [recipesCount, setRecipesCount] = React.useState(0)

    useEffect(() => {
        //executed when a new batch of recipes is generated (the batch size is 14)
        if (recipes) {
            var recipesArray = cachedRecipes
            for (const idx in recipes.recettes) {
                recipesArray.push(
                    <RecipesCard 
                        inventory={inventory}
                        name={recipes.recettes[idx].name} 
                        numerateur ={"4"} 
                        denominateur ={'5'} 
                        recommendation={recipes.recettes[idx].recommendation} 
                        time={recipes.recettes[idx].temps} 
                        picture={recipes.recettes[idx].imageURL}
                        linkToRecipe={recipes.recettes[idx].MarmittonURL}
                    />
                )
            }

            setRecipesCount(recipesArray.length)
            setRecipesContent(recipesArray)
        }
    }, [recipes])

    useEffect(() => {
        if (inventory) {
            getRecipes({startIdx: recipesCount, inventory: inventory})
        } else {
            //The user has not scanned anything yet.
            setRecipesContent( 
                <EmptyFridgeBox> 
                    <EmptyMessageWrapper>
                        <Typography variant="h5">  Remplis ton frigo avec le scanner avant de générer des recettes ! </Typography>
                    </EmptyMessageWrapper>
                    <EmptyFridgeWrapper src={fridgeImage}></EmptyFridgeWrapper>
                </EmptyFridgeBox>
            )
        }
    }, [inventory])

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            getRecipes({startIdx: recipesCount, inventory: inventory})
            let cpy = cachedRecipes.slice(0, cachedRecipes.length - 1) 
            let newContent = [...cpy, loaderRecipes]
            setRecipesContent(newContent)
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
                                        <RecipesWrapper onScroll={(e) => handleScroll(e)}>
                                            {recipesContent}
                                        </RecipesWrapper>
                                    </>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
    );
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