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
import FormHelperText from '@material-ui/core/FormHelperText';
import SendIcon from '@material-ui/icons/Send';
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
      <form action={getSubmit} >
      <Grid>
        Difficulté
      </Grid>
      
      <FormControl component="fieldset" >
      <RadioGroup aria-label="difficulte" name="difficulte1" value={difficulte} onChange={handleChangeDif}>
        <FormControlLabel value="1" control={<GreenRadio />} label="Très Facile" />
        <FormControlLabel value="2" control={<GreenRadio />} label="Facile" />
        <FormControlLabel value="3" control={<GreenRadio />} label="Moyen" />
        <FormControlLabel value="4" control={<GreenRadio />} label="Difficile" />
      </RadioGroup>
    
      <br></br>
    <Grid>
        Coût
      </Grid>
      <RadioGroup aria-label="cout" name="cout1" value={cout} onChange={handleChangeCout}>
        <FormControlLabel value="1" control={<GreenRadio />} label="Coût faible" />
        <FormControlLabel value="2" control={<GreenRadio />} label="Coût moyen" />
        <FormControlLabel value="3" control={<GreenRadio />} label="Coût élevé" />
      </RadioGroup>
    
      <br></br>
    <Grid>
        Spécificité
      </Grid>
      
      <RadioGroup aria-label="specificite" name="specificite1" value={specificite} onChange={handleChangeSpec}>
        <FormControlLabel value="1" control={<GreenRadio />} label="Végétarien" />
        <FormControlLabel value="2" control={<GreenRadio />} label="Sans Gluten" />
        <FormControlLabel value="3" control={<GreenRadio />} label="Vegan" />
        <FormControlLabel value="4" control={<GreenRadio />} label="Sans Lactose" />
      </RadioGroup>
    </FormControl>
    <br></br>
    <FormHelperText>{helperText}</FormHelperText>
    <br></br>
    <Button variant="outlined" startIcon={<SendIcon />} color="primary" onClick={getSubmit}>Appliquez les filtres</Button>
    <br></br>

        </form>
     </Grid>
      <br></br>
    </div>
    

    </>
    )
  }
  export default RecipesFilter