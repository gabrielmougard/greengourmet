import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { red } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  noIcon:{
    marginLeft: 60,
  },
  number:{
    color: '#02c39a',
    marginRight:160,
  },
  number2:{
    color: '#02c39a',
    marginRight:220,
  },
  itemcontain:{
    width:500,
  },
}));


  function LeaderboardCard({N1,C1,N2,C2,N3,C3,N4,C4,N5,C5,N6,C6,N7,C7,N8,C8}){
    const classes = useStyles();
      
        return (
          <div className={classes.root}>
            <Grid container   
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            >

              <Grid item xs={12} md={6}>
                <div className={classes.demo}>
                <FormControl component="fieldset">
                  <List>  
                      <ListItem className={classes.itemcontain}>
                        <ListItemIcon>
                          <EmojiEventsIcon style={{ color: yellow[500]}}/>
                        </ListItemIcon >  
                        <ListItemText>{N1}</ListItemText> 
                          <Typography className={classes.number} align="right">
                            {C1}
                          </Typography>
                      </ListItem>
                  </List>
                  </FormControl>
                  <FormControl component="fieldset">
                  <List>  
                  <ListItem className={classes.itemcontain}>
                        <ListItemIcon>
                          <EmojiEventsIcon style={{ color: blue[500]}}/>
                        </ListItemIcon >   
                        <ListItemText>{N2}</ListItemText> 
                        <Typography className={classes.number} align="right">
                            {C2}
                          </Typography>
                      </ListItem>
                  </List>
                  </FormControl>
                  <List>  
                  <ListItem className={classes.itemcontain}>
                        <ListItemIcon>
                          <EmojiEventsIcon style={{ color: red[500]}}/>
                        </ListItemIcon >   
                        <ListItemText>{N3}</ListItemText> 
                        <Typography className={classes.number} align="right">
                            {C3}
                          </Typography>
                      </ListItem>
                      
                  </List>
                  </div>
                <div className={classes.noIcon}>
                  <List>
                      <ListItem className={classes.itemcontain}>  
                      <ListItemText>{N4}</ListItemText> 
                      <Typography className={classes.number2} align="right">
                            {C4}
                          </Typography>
                      </ListItem>
                  </List>
                  <List>
                  <ListItem className={classes.itemcontain}>  
                  <ListItemText>{N5}</ListItemText> 
                  <Typography className={classes.number2} align="right">
                            {C5}
                          </Typography>
                      </ListItem>
                  </List>
                  <List>
                  <ListItem className={classes.itemcontain}>  
                  <ListItemText>{N6}</ListItemText> 
                  <Typography className={classes.number2} align="right">
                            {C6}
                          </Typography>
                      </ListItem>
                  </List>
                  <List>
                  <ListItem className={classes.itemcontain}>  
                          <ListItemText>{N7}</ListItemText> 
                          <Typography className={classes.number2} align="right">
                            {C7}
                          </Typography>
                      </ListItem>
                  </List>
                  <List>
                  <ListItem className={classes.itemcontain}>  
                  <ListItemText>{N8}</ListItemText> 
                  <Typography className={classes.number2} align="right">
                            {C8}
                          </Typography>
                      </ListItem>
                  </List>
                </div>
            </Grid> 
          </Grid>
        </div>       
        );
      }
  export default LeaderboardCard