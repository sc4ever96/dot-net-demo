import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        return (
            <footer>
                <Container>
                    <p className='p-3 mb-2 bg-dark text-white fixed-bottom'> For more datasets please visit <a href='https://developer.nrel.gov/docs/' target='_blank' rel='noopener noreferrer'>NREL</a> </p>
                </Container>
            </footer>
        );
    }
}