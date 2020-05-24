import React, { Component, useEffect } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button as BaseButton} from 'baseui/button';
import {SHAPE} from 'baseui/button';
import {Typography} from "@material-ui/core";
import {StyledThumbnail} from 'baseui/card';
import Modal from "@material-ui/core/Modal";
import ItemLoader from '../dashbord/ItemLoader';
import {Tag} from 'baseui/tag';
import styled, { keyframes } from 'styled-components'
import './recipesCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Alert from 'react-s-alert';

//redux
import { connect } from 'react-redux'

//actions 
import { fetchRecipeDetails, updateInventory } from '../../../actions'

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  grid-auto-rows: minmax(100px, auto);
`

const NeededThingsWrapper = styled.div`
  grid-column: 1
`

const ContentDescWrapper = styled.div`
  grid-column: 2/4
`

const IngredientsWrapper = styled.div`
  grid-row: 1/4;
`

const CookToolsWrapper = styled.div`
  grid-row: 4/7
`

const MetaWrapper = styled.div`
  grid-row: 1;
`

const StepsWrapper = styled.div`
  margin-top: 30px;
  grid-row: 2/7;
`

const StepsContainer = styled.div`
  overflow: scroll;
`

const IngredientsContainer = styled.div`
  overflow: scroll;
`

const UstensilesContainer = styled.div`
  overflow: scroll;
`
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
  root: {
    cursor: 'pointer',
  },
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

const ColorCircularProgress = withStyles({
  root: {
    color: '#FFFFFF',
  },
})(CircularProgress);

function RecipesCard({inventory, name, recommendation, numerateur, denominateur, time, picture, linkToRecipe, recipesDetails, fetchRecipeDetails, updateInventory, inventoryUpdated}){
  const [modalStyle] = React.useState(getModalStyle);
  const [modalContent, setModalContent] = React.useState(<></>)
  const [recipeIngredients, setRecipeIngredients] = React.useState({})
  const [cookLoaderButton, setCookLoaderButton] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
    if (open) {
      //content of modal 
      
        if (recipesDetails) {
          let loaded = false
          let loadedContent
          
          for (const idx in recipesDetails) {
            if (recipesDetails[idx].link == linkToRecipe) {
              loaded = true
              loadedContent = recipesDetails[idx].recipe
              break
            }
          }

          if (loaded) {
        
            setModalContent(buildModalContent(loadedContent))
            setRecipeIngredients(loadedContent.ingredients)
          } else {

            console.log("recipesDetails does not countain our link. Calling API to retrieve data.")
            fetchRecipeDetails(linkToRecipe)
            setModalContent( 
              <>
                <ItemLoader></ItemLoader>
                <br></br>
                <ItemLoader></ItemLoader>
                <br></br>
                <ItemLoader></ItemLoader>            
              </>
            )
          }
        } else {
            console.log("recipesDetails is undefined. Calling API to retrieve data.")
            fetchRecipeDetails(linkToRecipe)
            setModalContent( 
              <>
                <ItemLoader></ItemLoader>
                <br></br>
                <ItemLoader></ItemLoader>
                <br></br>
                <ItemLoader></ItemLoader>            
              </>
            )
        }
       
      //
    }
  }, [open, recipesDetails])

  useEffect(() => {
    if (inventoryUpdated) {
      Alert.success("Inventaire mis à jour avec succès !");
      setCookLoaderButton(false) //stop cook loader
      setOpen(false) //close the modal
    } else {
      //undefined of false
      if (inventoryUpdated == false) {
        Alert.error("La mise à jour de l'inventaire n'a pas pu se faire.");
        setCookLoaderButton(false) //stop cook loader
      } //if undefined, do nothing
    }
  }, [inventoryUpdated])

  const handleCookButton = () => {
    if (recipeIngredients) {
      console.log(recipeIngredients)
      setCookLoaderButton(true)
      updateInventory({inventory: inventory, recipeIngredients: recipeIngredients})
    }
  }

  const buildModalContent = (content) => {
    console.log(content)
    //meta : difficulte
    let difficulteMeta
    if (content.difficulte.includes("facile")) {
      difficulteMeta = 
      <Tag closeable={false} variant="solid" kind="positive">
          {content.difficulte}
      </Tag>
    } else if (content.difficulte.includes("moyen")) {
      difficulteMeta =
      <Tag closeable={false} variant="solid" kind="warning">
        {content.difficulte}
      </Tag>
    } else {
      difficulteMeta =
      <Tag closeable={false} variant="solid" kind="negative">
        {content.difficulte}
      </Tag>
    }

    //steps
    let steps
    let stepsArray = []
    for (const idx in content.steps) {
      stepsArray.push(
        <p>
          <BaseButton shape={SHAPE.pill}>
            {(parseInt(idx, 10)+1)+") "+content.steps[idx].split(" ")[0]}
          </BaseButton>
          {"\t"+content.steps[idx].split(" ").slice(1, content.steps[idx].length - 1).join(" ")}
        </p>
      )
    }
    steps =
    <StepsContainer>
      {stepsArray}
    </StepsContainer>
    //

    //ingredients
    let ingredients
    let ingredientsArray = []
    for (let [key, value] of Object.entries(content.ingredients)) {
      if (value == null) {
        value = ""
      }
      ingredientsArray.push(
        <p>
          <BaseButton 
            shape={SHAPE.pill} 
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.positive400
                  };
                }
              }
            }}>
            {value+" "+key}
          </BaseButton>
        </p>
      )
    }
    ingredients =
    <IngredientsContainer>
      {ingredientsArray}
    </IngredientsContainer>
    //

    //ustensiles
    let ustensiles
    let ustensilesArray = []
    for (const idx in content.ustensiles) {
      ustensilesArray.push(
        <p>
          <BaseButton 
            shape={SHAPE.pill} 
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.positive400
                  };
                }
              }
            }}>
            {content.ustensiles[idx]}
          </BaseButton>
        </p>
      )
    }

    ustensiles =
    <UstensilesContainer>
      {ustensilesArray}
    </UstensilesContainer>
    //

    return (
      <ContentWrapper>

        <NeededThingsWrapper>
          <IngredientsWrapper>
            <Typography variant="h5">Ingredients</Typography>
            <br></br>
            {ingredients}
          </IngredientsWrapper>
          <CookToolsWrapper>
            <Typography variant="h5">Ustensiles</Typography>
            <br></br>
            {ustensiles}
          </CookToolsWrapper>
        </NeededThingsWrapper>

        <ContentDescWrapper>
          <MetaWrapper>
            <React.Fragment>
              {difficulteMeta}
              <Tag closeable={false} variant="solid" kind="accent">
                temps : {content.temps}
              </Tag>
              <Tag closeable={false} variant="solid" kind="primary">
                pour {content.personnes} personnes
              </Tag>
            </React.Fragment>
          </MetaWrapper>

          <StepsWrapper>
            <Typography variant="h5">Etapes</Typography>
            <br></br>
            {steps}
          </StepsWrapper>
        </ContentDescWrapper>

      </ContentWrapper>
    )
  }
  
    const classes = useStyles();
    
    const recipesLevel = 'facile'
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
                {modalContent}
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
              <Button onClick={() => handleCookButton()} variant="contained" className={classes.ModalCook} color="secondary" type="button">
              {(cookLoaderButton) ? (<ColorCircularProgress />) : ("Je la cuisine !")}
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
                  <span className={classes.scoring}>Recommandations: </span> {recommendation}
                  </div>
                </div>
              </Grid>
                <Grid item >
                  <Paper className={paperClass} id='recipesLevel'>
                  <div >
                    <Typography variant="h5" className={classes.titleLevel} noWrap>
                     {time}
                    </Typography>
                  </div>
              </Paper>
              </Grid>
          </Grid>
         </div>
        </>
        )
}

const mapStateToProps = (state) => {
  return {
      recipesDetails: state.recipesDetails,
      inventoryUpdated: state.inventoryUpdated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchRecipeDetails: (link) => {dispatch(fetchRecipeDetails(link))},
      updateInventory: (recipeIngredients) => {dispatch(updateInventory(recipeIngredients))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesCard);