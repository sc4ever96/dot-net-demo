import React, { Component } from "react";

class MenuHelper extends Component{

    render() {

        return (
            <th onClick={e => this.props.sorting(this.props.orderByVar)}> { this.props.title } </th >
        );
    }
}

export default MenuHelper;