import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LensIcon from '@material-ui/icons/Lens';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { orange,pink,blue,yellow,green } from '@material-ui/core/colors';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Grid from "@material-ui/core/Grid";
import './StatisticsCard.css';

const data = [
  { diet: 'glucides', val: 20 ,val2: 15},
  { diet: 'proteines', val: 12,val2: 8 },
  { diet: 'lipides', val: 30,val2: 5 },
  { diet: 'acide gras', val: 11 ,val2: 15},
  { diet: 'vitamine', val: 4,val2: 10 },
  { diet: 'sucre', val: 11,val2: 6 },
];
  
const useStyles = makeStyles({
  root: {
    width: 230,
  },
});

function StatisticsCard() {
  const classes = useStyles();
    return (
    
      <>
      <Grid container 
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <div class="container">
      <Grid item>
        <Chart
          data={data}
        >
          <PieSeries
            valueField='val'
            argumentField="diet"
            innerRadius={0.6}
          />
          <Title
            text="Votre apport nutritionnel des 2 dernieres semaines"
          />
          <Animation />
        </Chart>
        <div>
        <MenuList>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: blue[400] }}/>
          </ListItemIcon>
          <Typography variant="inherit">glucides</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: orange[600] }} />
          </ListItemIcon>
          <Typography variant="inherit">proteines</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: green[300] }}/>
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            lipides
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: yellow[700] }}/>
          </ListItemIcon>
          <Typography variant="inherit">acide gras</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: green[600] }} />
          </ListItemIcon>
          <Typography variant="inherit">vitamine</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: pink[600] }}/>
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            sucre
          </Typography>
        </MenuItem>
      </MenuList>
        </div>
        </Grid>
        </div>
        <div class="container">
      <Grid item>
        <Chart
          data={data}
        >
          <PieSeries
            valueField='val2'
            argumentField="diet"
            innerRadius={0.6}
          />
          <Title
            text="apport nutritionnel recommandé pour 2 semaines"
          />
          <Animation />
        </Chart>
        <div>
        <MenuList>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: blue[400] }}/>
          </ListItemIcon>
          <Typography variant="inherit">glucides</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: orange[600] }} />
          </ListItemIcon>
          <Typography variant="inherit">proteines</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: green[300] }}/>
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            lipides
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: yellow[700] }}/>
          </ListItemIcon>
          <Typography variant="inherit">acide gras</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: green[600] }} />
          </ListItemIcon>
          <Typography variant="inherit">vitamine</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LensIcon fontSize="small" style={{ color: pink[600] }}/>
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            sucre
          </Typography>
        </MenuItem>
      </MenuList>
        </div>
        </Grid>
        </div>
    </Grid>
        </>
    );
    }
export default StatisticsCard