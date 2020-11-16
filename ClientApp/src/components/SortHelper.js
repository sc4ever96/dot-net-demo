import React, { Component } from "react";

class SortHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortingOrder: 'asc',
            orderBy: 'id'
        };
    }

    sort() {

        console.log("sort method " + this.state.sortingOrder + " || " + this.state.orderBy);

        const stabilizedThis = [].concat(this.props.rows);
        stabilizedThis.sort((a, b) => {
            let order = a[this.state.orderBy] > b[this.state.orderBy] ? 1 : -1;
            order = this.sortingOrder === 'decs' ? order * (-1) : order;
            return order;

        });

        return stabilizedThis;
    }
}

export default SortHelper;