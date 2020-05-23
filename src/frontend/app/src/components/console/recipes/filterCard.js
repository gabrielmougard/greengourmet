import React, { Component } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
<<<<<<< HEAD

=======
import RadioGroup from '@material-ui/core/RadioGroup';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import SendIcon from '@material-ui/icons/Send';
>>>>>>> de98c1856f55f38653079712d92af797e06e6723
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

      const [difficulte, setDifficulte] = React.useState('');
      const [cout, setCout] = React.useState('');
      const [specificite, setSpecificite] = React.useState('');
      const [helperText, setHelperText] = React.useState('');

      const handleChangeDif = (event) => {
        setDifficulte(event.target.value);
        console.log(event.target.value);
      };
      
      const handleChangeCout = (event) => {
        setCout(event.target.value);
        console.log(event.target.value);
      };

      const handleChangeSpec = (event) => {
        setSpecificite(event.target.value);
        console.log(event.target.value);
      };
      const getSubmit = (event) => {
        console.log("La difficulté est : " + difficulte);
        console.log("Le cout est : " + cout);
        console.log("La spécificité est : " + specificite);
        setHelperText('Votre filtre est : d:'+difficulte+', c: '+cout+' ,s: '+specificite)
      };


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