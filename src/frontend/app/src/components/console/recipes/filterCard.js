import React, { Component } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import './filterCard.css'


const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#05668D",
  },
}));

const GreenRadio = withStyles({
  root: {
    color: "#02c39a"

  }
})(props => <Radio color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: "#02c39a"
  }
})(props => <Checkbox color="default" {...props} />);

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

      const [value, setValue] = React.useState('female');

      const [difficulte, setDifficulte] = React.useState('');
      const [cout, setCout] = React.useState('');
      const [specificite, setSpecificite] = React.useState('');
      const [helperText, setHelperText] = React.useState('');


    return (
      <>
      
    <div className={classes.root}  >
    <Grid container 
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
    >
      
      <Grid>
        Difficulté
      </Grid>
      
      <FormControl>
        <FormGroup aria-label="difficulte" name="difficulte" value={value} onChange={handleChange}>
          <FormControlLabel value="dtresfacile" control={<GreenCheckbox />} label="Très Facile" />
          <FormControlLabel value="dfacile" control={<GreenCheckbox />} label="Facile" />
          <FormControlLabel value="dmoyen" control={<GreenCheckbox />} label="Moyen" />
          <FormControlLabel value="ddifficile" control={<GreenCheckbox />} label="Difficile" />
        </FormGroup>
      </FormControl>
    <br></br>
    <br></br>
      <Grid>
        Coût
      </Grid>
      <FormControl>
      <FormGroup aria-label="difficulte" name="cout" value={value} onChange={handleChange}>
        <FormControlLabel value="faible" control={<GreenCheckbox />} label="Coût faible" />
        <FormControlLabel value="moyen" control={<GreenCheckbox />} label="Coût moyen" />
        <FormControlLabel value="eleve" control={<GreenCheckbox />} label="Coût élevé" />
      </FormGroup>
    </FormControl>
      <br></br>
      <br></br>
    <Grid>
        Spécificité
      </Grid>
      <FormControl>
      <FormGroup aria-label="specificite" name="allergies" value={value} onChange={handleChange}>
        <FormControlLabel value="vegetarien" control={<GreenCheckbox />} label="Végétarien" />
        <FormControlLabel value="sansgluten" control={<GreenCheckbox />} label="Sans Gluten" />
        <FormControlLabel value="vegan" control={<GreenCheckbox />} label="Vegan" />
        <FormControlLabel value="sanslactose" control={<GreenCheckbox />} label="Sans Lactose" />
      </FormGroup>
    </FormControl>
     </Grid>
      <br></br>
      <br></br>
    </div>
    

    </>
    )
  }
  export default RecipesFilter