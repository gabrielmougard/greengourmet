import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core";
import {StyledThumbnail} from 'baseui/card';
import Modal from "@material-ui/core/Modal";
import './recipesCard.css';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
} 

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    width: 380,
    height: 100,
    background: "#05668D",
    borderRadius: '2%'
  },
  paperEasy: {
    padding: theme.spacing(1),
    width: 115,
    height: 110,
    background: "#02C39A",
    borderRadius: '15%',
  },
  paperMedium: {
    padding: theme.spacing(1),
    width: 115,
    height: 110,
    background: "#F7B500",
    borderRadius: '15%',


  },
  paperHard: {
    padding: theme.spacing(1),
    width: 115,
    height: 110,
    background: "#E02020",
    borderRadius: '15%',
  },

  title: {
    marginLeft: 10,
    marginBottom: 20,
    maxWidth: 300,
    fontSize: 30,
    color: "white",
    textAlign:'center'
  },
  titleLevel: {
    marginTop: 25,
    fontSize: 30,
    color: "white",
    textAlign:'center'
  },
paperAlt: {
  height: 140,
  width: 140,
  paddingTop: 50,
  textAlign: 'center',
  background: "#D8D8D8",
  fontSize: 15,
  fontWeight: "bold",
  color: "#05668D",
  borderRadius: '50%',
 
},
paperPicture: {
  height: 140,
  width: 140,
  textAlign: 'center',
  background: "#D8D8D8",
  fontSize: 15,
  fontWeight: "bold",
  color: "#05668D",
  borderRadius: '50%',
 
},
scoring:{
  marginLeft: 10,
    fontWeight: "bold",
  color: "#05668D",
},
  paperModal: {
    position: "absolute",
    minWidth: '65vw',
    minHeight: '80vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6, 6, 3),  
    borderRadius: '2%',
  },
  ModalName:{
    marginTop:50,
    marginLeft: 30,
    fontSize: 25,
    fontWeight: "bold",
  color: "#05668D",
  },
  iconLevel:{
    fontSize: 60,
    color:'black',
    },
  ModalCancel:{
    marginTop:30,
    backgroundColor: '#E02020',
    color: 'white',
    fontSize:20,
    fontWeight: "bold",
    padding: theme.spacing(1, 5, 1), 
    border: '2px solid',
    borderColor: '#00a896', 
  },
  ModalCook:{
    marginTop:30,
    color: 'white',
    backgroundColor: '#028090',
    fontSize:20,
    fontWeight: "bold",
    padding: theme.spacing(1, 2, 1),
    border: '2px solid',
    borderColor: '#00a896',
    '&:hover': {
      backgroundColor: '#05668d',
      borderColor: '#05668d',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#05668d',
      borderColor: '#005cbf',
    },
  },
  percentMax:{
    color : '#00a896',
    fontSize:25,
    marginTop:45,
    fontWeight: "bold",
  },
  percentGood:{
    color: '#02c39a',
    fontSize:25,
    marginTop:45,
    fontWeight: "bold",
  },
  percentMedium:{
    color:'#F7B500',
    fontSize:25,
    marginTop:45,
    fontWeight: "bold",
  },
  percentBad:{
    color:'#E02020',
    fontSize:25,
    marginTop:45,
    fontWeight: "bold",
  },
}));


function RecipesCard({name,recommendation,numerateur,denominateur,level,picture}){
    const classes = useStyles();
    
    const recipesLevel = level
    let paperClass
    if (recipesLevel === 'facile') { 
        paperClass = classes.paperEasy
    } else if (recipesLevel === 'moyen') {
        paperClass = classes.paperMedium
    } else {
        paperClass = classes.paperHard
    }

    const recipesImage = picture
    let paperClassPicture
    if(recipesImage !== undefined){
      paperClassPicture = classes.paperPicture
    }
    else{
      paperClassPicture = classes.paperAlt
    }
    const convertFraction = (numerateur / denominateur) *100
    let fontColor
    if (convertFraction === 100) { 
        fontColor = classes.percentMax
    } else if (convertFraction<100 && convertFraction >=66 ) {
      fontColor = classes.percentGood
    } else if (convertFraction<66 && convertFraction >=33 ) {
      fontColor = classes.percentMedium
    } else {
      fontColor = classes.percentBad
    }

      const [modalStyle] = React.useState(getModalStyle);
      const [open, setOpen] = React.useState(false);
    
      const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    
      const body = (
        <div style={modalStyle} className={classes.paperModal}>
        <Grid container  
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
        >
          <Grid item>
              <Paper>
                <StyledThumbnail alignItem className= {paperClassPicture}
                  alt={'recipe caption'}
                  src={picture}
                />
              </Paper>
          </Grid>
          <Grid item className ={classes.ModalName}>
            {name}
          </Grid>
        </Grid>
              <div id = 'ModalContain'>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.  
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.  
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </div>
          <Grid container
                direction="row"
                justify="space-evenly"
                alignItems="flex-end"
          >
            <Grid item id='cancelButton'>
              <Button variant="contained" className={classes.ModalCancel} color="secondary" onClick={handleClose}>
               Annuler
              </Button>
            </Grid>
            <Grid item id='activeButton' >
              <Button variant="contained" className={classes.ModalCook} color="secondary" type="button">
              Je la cuisine !
              </Button>
            </Grid>
          </Grid>
        </div>
      );

        return (
            <>
          <div className={classes.root}>
          <Grid container spacing={6}>

              <Grid item>
              <Paper>
                <StyledThumbnail alignItem className= {paperClassPicture}
                  alt={'recipe caption'}
                  src={picture}
                />
              </Paper>
              </Grid>
              
      <Grid item >
        <div className={classes.container} >
          <div>
            <Paper id="recipesTitle" className={classes.paper}>
            <Modal open={open} onClose={handleClose}>
              {body}
            </Modal >
                    <div onClick={handleOpen}>
                            <Tooltip title={name} placement="bottom">
                                <Typography variant="h5" className={classes.title} noWrap>
                                    {name}
                                   <p id="Level"><RestaurantOutlinedIcon id="#iconFork"/>  </p>
                                </Typography>
                            </Tooltip>
                          
                    </div>
                  </Paper>
                </div>
                <div id='recipesDetail'>
                  <span className={classes.scoring}>Ingrédients: </span> {numerateur}/{denominateur}
                  <span className={classes.scoring}>Recommandations: </span> {recommendation}
                  </div>
                </div>
              </Grid>
                <Grid item >
                  <Paper className={paperClass} id='recipesLevel'>
                  <div >
                    <Typography variant="h5" className={classes.titleLevel} noWrap>
                     {level}
                    </Typography>
                  </div>
              </Paper>
              </Grid>
              <Grid item className={fontColor} id ='pourcentage'>
              {convertFraction}%
              </Grid>
              
          </Grid>
         </div>
        </>
        )
}

export default RecipesCard;