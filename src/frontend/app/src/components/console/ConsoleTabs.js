import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux'

//actions
import { sendTabPosition } from '../../actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

const ConsoleTabs = ({sendTabPosition, tabPosition}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const mapPos2Title = {0:"dashboard", 1:"scanner", 2:"inventory", 3:"recipes", 4:"leaderboard", 5:"statistics"}
  const mapTitle2Pos = {"dashboard":0, "scanner":1, "inventory":2, "recipes":3, "leaderboard":4, "statistics":5}

  useEffect(() => {
    if (tabPosition) {
      setValue(mapTitle2Pos[tabPosition])
    }
  }, [tabPosition])

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sendTabPosition(mapPos2Title[newValue]);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="#02c39a">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Tableau de bord" {...a11yProps(0)} />
          <Tab label="Scanner" {...a11yProps(1)} />
          <Tab label="Inventaire" {...a11yProps(2)} />
          <Tab label="Recettes" {...a11yProps(3)} />
          <Tab label="Leaderboard" {...a11yProps(4)} />
          <Tab label="Statistiques" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          "La cuisine anglaise, c'est simple: quand c'est froid c'est de la bière, quand c'est chaud c'est de la soupe." - Coluche
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          "Un baiser ne dure pas autant qu'un bon plat." - George Meredith
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        "Pour bien cuisiner il faut de bons ingrédients, un palais, du coeur et des amis." - Pierre Perret
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        "Bonne cuisine et bon vin, c'est le paradis sur terre." - Henri IV
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        "La cuisine, c'est quand les choses ont le goût de ce qu'elles sont." - Curmonsky
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
        "La bonne cuisine, c'est le souvenir." - Georges Simenon
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      tabPosition: state.tabPosition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTabPosition: (position) => {dispatch(sendTabPosition(position))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleTabs)