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
 
      
    const [value1, setValue1] = React.useState('a');
    const [value2, setValue2] = React.useState('b');
    const [value3, setValue3] = React.useState('c');

      const handleChangeDifficulty = (event) => {
        setValue1(event.target.value);
      };
      const handleChangeCost = (event) => {
        setValue2(event.target.value);
      };
      const handleChangeDiet = (event) => {
        setValue3(event.target.value);
      };
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
      <FormControl component="fieldset">
      <RadioGroup aria-label="difficulte" name="difficulte1" value={value1} onChange={handleChangeDifficulty}>
        <FormControlLabel value="tresfacile" control={<GreenRadio />} label="Très Facile" />
        <FormControlLabel value="facile" control={<GreenRadio />} label="Facile" />
        <FormControlLabel value="moyen" control={<GreenRadio />} label="Moyen" />
        <FormControlLabel value="difficile" control={<GreenRadio />} label="Difficile" />
      </RadioGroup>
    </FormControl>
    <Grid md={3}>
        Coût
      </Grid>
      <FormControl component="fieldset">
      <RadioGroup aria-label="difficulte" name="difficulte1" value={value2} onChange={handleChangeCost}>
        <FormControlLabel value="faible" control={<GreenRadio />} label="Coût faible" />
        <FormControlLabel value="moyen" control={<GreenRadio />} label="Coût moyen" />
        <FormControlLabel value="eleve" control={<GreenRadio />} label="Coût élevé" />
      </RadioGroup> 
    </FormControl>
    <Grid md ={5}>
        Spécificité
      </Grid>
      <FormControl component="fieldset">
      <RadioGroup aria-label="specificite" name="specificite1" value={value3} onChange={handleChangeDiet}>
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
     </Grid>
      <br></br>
    </div>
    

    </>
    )
  }
  export default RecipesFilter