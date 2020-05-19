import React, { Component } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import './filterCard.css'


const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#05668D",
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: "#02c39a"
  }
})(props => <Checkbox color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: "#02c39a"
  }
})(props => <Radio color="default" {...props} />);


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
     /*
      const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };*/
      //const [value, setValue] = React.useState('female');

      const handleChange = (event) => {
        setValue(event.target.value);
      };
/*
const GreenCheckbox = withStyles({
  root: {
    color: "#02c39a"
  }
})(props => <Checkbox color="default" {...props} />);
*/ 

    return (
      <>
      
    <div className={classes.root}>
    <Grid container 
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
    >
      <form>
      <Grid>
        Difficulté
      </Grid>
      
      <br></br>
      <FormControl component="fieldset">
      <RadioGroup aria-label="difficulte" name="difficulte1" value={value} onChange={handleChange}>
        <FormControlLabel value="dtresfacile" control={<GreenRadio />} label="Très Facile" />
        <FormControlLabel value="dfacile" control={<GreenRadio />} label="Facile" />
        <FormControlLabel value="dmoyen" control={<GreenRadio />} label="Moyen" />
        <FormControlLabel value="ddifficile" control={<GreenRadio />} label="Difficile" />
      </RadioGroup>
    </FormControl>
    <Grid>
        Coût
      </Grid>
      <FormControl component="fieldset">
      <RadioGroup aria-label="difficulte" name="difficulte1" value={value} onChange={handleChange}>
        <FormControlLabel value="faible" control={<GreenRadio />} label="Coût faible" />
        <FormControlLabel value="moyen" control={<GreenRadio />} label="Coût moyen" />
        <FormControlLabel value="eleve" control={<GreenRadio />} label="Coût élevé" />
      </RadioGroup>
    </FormControl>
      <br></br>
    <Grid>
        Spécificité
      </Grid>
      <FormControl component="fieldset">
      <RadioGroup aria-label="specificite" name="specificite1" value={value} onChange={handleChange}>
        <FormControlLabel value="vegetarien" control={<GreenRadio />} label="Végétarien" />
        <FormControlLabel value="sansgluten" control={<GreenRadio />} label="Sans Gluten" />
        <FormControlLabel value="vegan" control={<GreenRadio />} label="Vegan" />
        <FormControlLabel value="sanslactose" control={<GreenRadio />} label="Sans Lactose" />
      </RadioGroup>
    </FormControl>
    <br></br>
    <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
        </form>
     </Grid>
      <br></br>
    </div>
    

    </>
    )
  }
  export default RecipesFilter