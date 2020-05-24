import React, { Component } from 'react';
import LeaderboardCard from './LeaderboardCard';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import './Leaderboard.css'
const RecipiesWrapper = styled.div`
    padding-top: 5px;
    width: 60vw;
    height: 60vh;
    overflow: auto;
    overflow-x: hidden;
    
`

class Leaderboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className ='dashboard-root-content'>
            <Grid container id ="recipesContain"
                    direction="row"
                    justify="center"
                    >
                        
            <Grid md={3}>
            <Card id='RecipesList' className="scanner-card" variant="outlined">
                    <CardContent>
                    <Typography variant="h5" component="h2">
                       Top Reccettes  
                    </Typography>
                    <div className="generate-recipe-button-wrapper">     
                       <LeaderboardCard N1={'pizza 4 fromages'} C1={120} N2={'saumon fumé'} C2={'110'} 
                       N3={'blanquette de veau'} C3={'105'} N4={'poulet roti'} C4={'90'} N5={'gigot d\'agneau'} 
                       C5={'85'} N6={'porc au caramel'} C6={'75'} N7={'curry d\agneau'} C7={'65'} 
                       N8={'pates carbonara'} C8={'60'}/>       
                    </div>  
                    </CardContent>
                </Card>
        </Grid>
        <Grid md={3}>
            <Card id='ScanList' className="scanner-card" variant="outlined">
                    <CardContent>
                    <Typography variant="h5" component="h2">
                       Top Scan   
                    </Typography>
                    <div className="generate-recipe-button-wrapper">     
                    <LeaderboardCard N1={'Cereales'} C1={130} N2={'pain au lait'} C2={125} 
                       N3={'riz'} C3={108} N4={'pates'} C4={90} N5={'gigot d\'agneau'} 
                       C5={85} N6={'sucre'} C6={79} N7={'curry'} C7={70} 
                       N8={'lardon'} C8={50}/>      
                    </div>  
                    </CardContent>
                </Card>
        </Grid>
        <Grid md={3}>
            <Card id='GourmetList' className="scanner-card" variant="outlined">
                    <CardContent>
                    <Typography variant="h5" component="h2">
                       Top Gourmets  
                    </Typography>
                    <div className="generate-recipe-button-wrapper">     
                    <LeaderboardCard N1={'blanquette de veau'} C1={150} N2={'risotto aux cepes'} C2={140} 
                       N3={'boeuf bourgignon'} C3={135} N4={'porc au caramel'} C4={120} N5={'Burger maison'} 
                       C5={115} N6={'tarte au fraise'} C6={90} N7={'curry d\agneau'} C7={85} 
                       N8={'lasagne'} C8={80}/>     
                    </div>  
                    </CardContent>
                </Card>
        </Grid>
        </Grid>
    </div>
        )
        }
    }

export default Leaderboard