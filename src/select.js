import React from 'react';

export default class Select extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value
        };
    }
    options() {
        return(
            this.props.list.map((item)=>
                <option value={item.value}>{item.name}</option>
            )
        )
    }
    render(){
        return(
            <select name={this.props.name} value={this.state.value}>
                {this.options}
            </select>
        )
    }
}

