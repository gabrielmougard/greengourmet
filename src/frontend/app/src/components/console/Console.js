import React, { Component } from "react";

import ConsoleHeader from './ConsoleHeader';
import ConsoleTabs from './ConsoleTabs';

//redux
import { connect } from 'react-redux'

import Dashboard from './dashbord/Dashboard';
import Scanner from './scanner/Scanner';
import InventoryPage from "./inventory/InventoryPage";
import Recipes from './recipes/Recipes';
import Leaderboard from './leaderboard/Leaderboard';
import Statistics from './statistics/Statistics';
import PinCodeEmail from './pincode/PinCodeEmail';

//actions
import { getInventory } from '../../actions'


class Console extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 'dashboard',
        }
        if (!this.props.inventory) {
            //call the saga
            this.props.getInventory(this.props.currentUser.id)
        }
    }

    componentDidUpdate() {

        if (this.props.tabPosition && this.props.tabPosition != this.state.currentTab) {
            this.setState({currentTab: this.props.tabPosition})
        }
    }

    render() {
        console.log(this.props)
        let email = this.props.currentUser.email
        let pinCode
        if (!this.props.currentUser.emailVerified) {
            pinCode = <PinCodeEmail userEmail={email} {...this.props}/>
        }

        let consoleContent;
        switch(this.state.currentTab) {
            case 'dashboard':
                consoleContent = <Dashboard {...this.props}/>
                break;
            case 'scanner':
                consoleContent = <Scanner userId={this.props.currentUser.id}/>
                break;
            case 'inventory':
                consoleContent = <InventoryPage {...this.props} />
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
                {(this.props.pincodeUnlocked == true) ? (<></>) : (pinCode) }
                {consoleContent}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        tabPosition: state.tabPosition,
        pincodeUnlocked: state.pincodeUnlocked,
        inventory: state.inventory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInventory: (userId) => {dispatch(getInventory(userId))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);