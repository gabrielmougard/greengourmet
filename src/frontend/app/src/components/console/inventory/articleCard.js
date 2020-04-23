import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';

import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography
} from "@material-ui/core";
import { render } from "react-dom";

let titre = createMuiTheme();
titre = responsiveFontSizes(titre);

const useStyles = makeStyles(theme => ({
  paperCritical: {
    padding: theme.spacing(1),
    maxWidth: 280,
    minHeight: 40,
    background: "#E02020",
    color: "white"
  },
  paperMedium: {
    padding: theme.spacing(1),
    maxWidth: 280,
    minHeight: 40,
    background: "#F7B500",
    color: "white"
  },
  paperOk: {
    padding: theme.spacing(1),
    maxWidth: 280,
    minHeight: 40,
    background: "#00A896",
    color: "white"
  },
  title: {
    marginTop: 3,
    maxWidth: 170,
    maxfontSize: 22
  },
  container: {
    display: "flex",
    flexDirection: "row"
  }
}));

function Article({name, quantity, quantityUnit, peremptionDate}) {
    const classes = useStyles();

    function formatDate(peremptionDate) {
        const peremptionDateFormatted = new Date(peremptionDate);
        const now = new Date(); //"now"
        const diff = Math.abs(now-peremptionDateFormatted); // in milliseconds
        const daysRemaining = Math.ceil(diff/(1000*3600*24))
        return daysRemaining
    } 
    //peremption date format is should be YYYY/MM/DD string for the substract operation
    const formattedDate = formatDate(peremptionDate)
    let paperClass
    if (formattedDate > 14) { //above 2 weeks, we will be in the "OK" threshold
        paperClass = classes.paperOk
    } else if (formattedDate < 14 && formattedDate > 7) {
        paperClass = classes.paperMedium
    } else {
        paperClass = classes.paperCritical
    }

    return (
        <div className={classes.root}>
            <Paper className={paperClass}>
                <div className={classes.container}>
                    <div>
                        <Grid item>
                        <MuiThemeProvider theme={titre}>
                            <Tooltip title={name} placement="bottom">
                                <Typography variant="h5" className={classes.title} noWrap>
                                    {name}
                                </Typography>
                            </Tooltip>
                        </MuiThemeProvider>
                        </Grid>
                    </div>
                    <Grid
                        container
                        justify="flex-start"
                        direction="column"
                        alignItems="flex-end"
                    >
                        <div>
                        <Grid item>
                            <Typography variant="body2">
                                Qté: <b>{quantity} {quantityUnit}</b>
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                            Périme dans:<b> {formattedDate}j </b>
                            </Typography>
                        </Grid>
                        </div>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
}

export default Article;