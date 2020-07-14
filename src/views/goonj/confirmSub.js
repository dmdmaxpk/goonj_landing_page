import React, { Component } from 'react';
import { config } from '../../config/config';

class ConfirmSub extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
            window.location.href = `https://goonj.pk/live-tv?msisdn=${this.props.history.location.state.msisdn}&package_id=QDfG&refresh=true`
    }
    render() { 
        return(
            <div></div>
        )
    }
}
 
export default ConfirmSub;