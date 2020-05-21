import React, { Component } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
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
      const [value, setValue] = React.useState('female');

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
          alignItems="stretch"
>
      <Grid md={5}>
        Difficulté
      </Grid>
      <form>
      <FormControl component="fieldset">
      <RadioGroup aria-label="difficulte" name="difficulte1" value={value} onChange={handleChange}>
        <FormControlLabel value="dtresfacile" control={<GreenRadio />} label="Très Facile" />
        <FormControlLabel value="dfacile" control={<GreenRadio />} label="Facile" />
        <FormControlLabel value="dmoyen" control={<GreenRadio />} label="Moyen" />
        <FormControlLabel value="ddifficile" control={<GreenRadio />} label="Difficile" />
      </RadioGroup>
    </FormControl>
    <Grid md={3}>
        Coût
      </Grid>
      <FormControl component="fieldset">
      <RadioGroup aria-label="difficulte" name="difficulte1" value={value} onChange={handleChange}>
        <FormControlLabel value="faible" control={<GreenRadio />} label="Coût faible" />
        <FormControlLabel value="moyen" control={<GreenRadio />} label="Coût moyen" />
        <FormControlLabel value="eleve" control={<GreenRadio />} label="Coût élevé" />
      </RadioGroup>
    </FormControl>
    <Grid md ={5}>
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
    <Button type="submit" variant="outlined" startIcon={<SearchIcon />} color="primary" className={classes.button}>
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