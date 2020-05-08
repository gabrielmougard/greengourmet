import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MemoryIcon from '@material-ui/icons/Memory';
import ItemLoader from './ItemLoader';
import Webcam from "react-webcam";
import './Dashboard.css';
import Inventory from '../inventory/Inventory.js';
//import Article from './articleCard';


//redux
import { connect } from 'react-redux'

//actions
import { sendTabPosition } from '../../../actions';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.handleScannerButton = this.handleScannerButton.bind(this);
        this.handleMyRecipesButton = this.handleMyRecipesButton.bind(this);
        this.handleGenerateRecipeButton = this.handleGenerateRecipeButton.bind(this);
    }

    handleScannerButton() {
        this.props.sendTabPosition('scanner');
    }

    handleMyRecipesButton() {
        this.props.sendTabPosition('recipes');
    }

    handleGenerateRecipeButton() {
        this.props.sendTabPosition('recipes');
    }

    render() {

        const videoConstraints = {
            width: 800,
            height: 300,
            facingMode: "user"
        };

        return (
            <div className="dashboard-root-content">
                <div className="split left">
                    <div className="scanner-wrapper">
                        <Card className="scanner-card" variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                Scanner
                                </Typography>
                                
                                    <div className="scanner-preview">
                                        <Webcam
                                            audio={false}
                                            height={300}
                                            width={800}
                                            videoConstraints={videoConstraints}
                                        />
                                    </div>
                                    <div className="scanner-button-wrapper">
                                        <Button variant="outlined" color="primary" startIcon={<VideocamIcon />} onClick={this.handleScannerButton}>
                                            Je scan !
                                        </Button>
                                    </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="recipes-wrapper">
                        <Card className="scanner-card" variant="outlined">
                                <CardContent>
                                <Typography variant="h5" component="h2">
                                    recettes
                                </Typography>
                                <div>
                                <div className="generate-recipe-button-wrapper">    
                                    <Button variant="outlined" color="primary" startIcon={<MemoryIcon />} onClick={this.handleGenerateRecipeButton}>        
                                    Générer une recette !   
                                    </Button>  
                                    </div>     
                                    <br></br>       
                                    <div className="recipes-button-wrapper">
                                    <Button variant="outlined" color="primary" startIcon={<MenuBookIcon />} onClick={this.handleMyRecipesButton}>       
                                    mes recettes   
                                    </Button> 
                                    </div>     
                                    <br></br>           
                                </div>  
                                </CardContent>
                            </Card>
                    </div>
                </div>
                <div className="split right">
                    <Card className="scanner-card" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Inventaire
                            </Typography>
                            <br></br>
                            <br></br>
                            {(true) ? 
                                (<Inventory />) :
                                (
                                    <>
                                        <div className="itemloader-container">
                                            <ItemLoader />
                                        </div>
                                        <div className="itemloader-container">
                                            <ItemLoader />
                                        </div>
                                        <div className="itemloader-container">
                                            <ItemLoader />
                                        </div>
                                        <div className="itemloader-container">
                                            <ItemLoader />
                                        </div>
                                    </>
                                )
                            }
                        </CardContent>
                    </Card>
                </div>  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tabPosition: state.tabPosition,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendTabPosition: (position) => {dispatch(sendTabPosition(position))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);