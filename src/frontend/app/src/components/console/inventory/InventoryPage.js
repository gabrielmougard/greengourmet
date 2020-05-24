import React, { Component } from 'react';
import Inventory from './Inventory';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import './InventoryPage.css';

class InventoryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard-root-content">
                <Grid
                    container
                    direction='column'
                    justify="center"
                    alignItems="center"
                >
                    <Grid>
                    </Grid>
                    <Grid md={5} >
                        <Card id='articleListExt' variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Inventaire                            
                                </Typography>
                                <br></br>
                                <Inventory {...this.props}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid></Grid>
                </Grid>
            </div>
        )
    }
}

export default InventoryPage;