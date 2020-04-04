import React, { Component } from "react";

import ConsoleHeader from './ConsoleHeader';
import ConsoleTabs from './ConsoleTabs';

//redux
import { connect } from 'react-redux'

import Dashboard from './dashbord/Dashboard';
import Scanner from './scanner/Scanner';
import Inventory from './inventory/Inventory';
import Recipes from './recipes/Recipes';
import Leaderboard from './leaderboard/Leaderboard';
import Statistics from './statistics/Statistics';

class Console extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 'dashboard',
        }
    }

    componentDidUpdate() {

        if (this.props.tabPosition && this.props.tabPosition != this.state.currentTab) {
            this.setState({currentTab: this.props.tabPosition})
        }
    }

    render() {
        console.log("helololo : "+JSON.stringify(this.props));
        const name = this.props.currentUser.name
        const email = this.props.currentUser.email

        let consoleContent;
        switch(this.state.currentTab) {
            case 'dashboard':
                consoleContent = <Dashboard {...this.props}/>
                break;
            case 'scanner':
                consoleContent = <Scanner {...this.props} />
                break;
            case 'inventory':
                consoleContent = <Inventory {...this.props} />
                break;
            case 'recipes':
                consoleContent = <Recipes {...this.props} />
                break;
            case 'leaderboard':
                consoleContent = <Leaderboard {...this.props} />
                break;
            case 'statistics':
                consoleContent = <Statistics {...this.props} />
                break;
            default:
                consoleContent = "Component not found...";
                break; 
        }

        return (
            <>
                <ConsoleHeader {...this.props}/>
                <ConsoleTabs {...this.props}/>
                {consoleContent}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        tabPosition: state.tabPosition,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);