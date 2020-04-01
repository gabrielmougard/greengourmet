import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideocamIcon from '@material-ui/icons/Videocam';
import KitchenIcon from '@material-ui/icons/Kitchen';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../CONSTANTS';

import './ConsoleHeader.css';

import ggLogoWhite from '../../assets/svg/nameWhite2.svg';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: '#4CA4C7',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    menuItemRoot : {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
    listDrawer : {
        width: 250,
    },
}));


export default function ConsoleHeader() {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [isDrawerOpen, setIsDrawerOpen ] = React.useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    }

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        Alert.success("You're safely logged out!");
    }

    const menuId = "console-header-menu-desktop"
        const renderMenu = (
            <Menu
                elevation={0}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                id={menuId}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
                classes={{
                    paper : {
                        border: '1px solid #02c39a',
                    }
                }}
            >
                <MenuItem
                    onClick={handleLogout}
                    classes={{
                        root: classes.menuItemRoot
                    }}
                >
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </MenuItem>
                <MenuItem 
                    classes={{
                        root: classes.menuItemRoot
                    }}
                >
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Paramètres" />
                </MenuItem>
            </Menu>
        )

        const mobileMenuId = "console-header-menu-mobile"
        const renderMobileMenu = (
            <Menu
                elevation={0}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} 
                anchorEl={anchorEl}
                id={mobileMenuId}
                keepMounted
                open={isMobileMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem 
                    classes={{
                        root: classes.menuItemRoot
                    }}
                >
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem 
                    onClick={handleProfileMenuOpen}  
                    classes={{
                        root: classes.menuItemRoot
                    }}
                >
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        )

        const ggLogo = <img className="logo-console-header" src={ggLogoWhite} width={300} height={40}/>
        
        const listDrawer = (
            <div
                className={classes.listDrawer}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem button key='Tableau de bord'>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary='Tableau de bord' />
                    </ListItem>
                    <ListItem button key='Scanner'>
                        <ListItemIcon>
                            <VideocamIcon />
                        </ListItemIcon>
                        <ListItemText primary='Scanner' />
                    </ListItem>
                    <ListItem button key='Inventaire'>
                        <ListItemIcon>
                            <KitchenIcon />
                        </ListItemIcon>
                        <ListItemText primary='Inventaire' />
                    </ListItem>
                        <ListItem button key='Recettes'>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary='Recettes' />
                    </ListItem>
                    <ListItem button key='Leaderboard'>
                        <ListItemIcon>
                            <EmojiEventsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Leaderboard' />
                    </ListItem>
                    <ListItem button key='Statistiques'>
                        <ListItemIcon>
                            <EqualizerIcon />
                        </ListItemIcon>
                        <ListItemText primary='Statistiques' />
                    </ListItem>
                </List>
            </div>
        )

        return (
            <div className={classes.grow}>
                <AppBar position="static" style={{ background: '#05668D'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
                                {listDrawer}
                        </Drawer>
                        {ggLogo}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Rechercher une recette, rechercher des articles…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        )
    
}