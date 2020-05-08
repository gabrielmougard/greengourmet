import React, { Component } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from '@material-ui/core/Modal';
import './filterCard.css'

const GreenCheckbox = withStyles({
  root: {
    color: "#02c39a"
  }
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#05668D",
  },
}));
  
  function RecipesFilter(){
    const classes = useStyles();
      const [state, setState] = React.useState({
        checkedF: false,
        checkedM: false,
        checkedD: false,
        checkedE: false,
        checkedH: false,
        checkedP: false,
        checkedA: false,
      });
     
      const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    return (
      <>
    <div className={classes.root}>
    <Grid container 
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
    >
      <Grid>
        Difficulté
      </Grid>
      <br></br>
      <FormGroup column>
      <FormControlLabel
        control={
          <GreenCheckbox
          className = {classes.font}
            checked={state.checkedF}
            onChange={handleChange}
            name="checkedF"
          />
        }
        label="Facile"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checkedM}
            onChange={handleChange}
            name="checkedM"
          />
        }
        label="Moyen"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checkedD}
            onChange={handleChange}
            name="checkedD"
          />
        }
        label="Difficile"
      />
    </FormGroup>
    <br></br>
    <Grid>
        Saison
      </Grid>
      <br></br>
      <FormGroup row>
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checkedE}
            onChange={handleChange}
            name="checkedE"
          />
        }
        label="été"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checkedH}
            onChange={handleChange}
            name="checkedH"
          />
        }
        label="hivers"
      />
      </FormGroup>
      </Grid>
      <FormGroup row>
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checkedP}
            onChange={handleChange}
            name="checkedP"
          />
        }
        label="printemps"
      />
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="automne"
      />
    </FormGroup>
    </div>
    </>
    )
  }
  export default RecipesFilter