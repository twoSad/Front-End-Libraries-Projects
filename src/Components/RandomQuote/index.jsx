import React from 'react'
import { connect } from 'react-redux'

import { getQuote } from '../../redux/quote-reducer'
import { compose } from 'redux'
import Quote from './Quote'

class QuoteContainer extends React.Component {
    componentDidMount() {
        this.props.getQuote(this._random());
    }

    constructor(props) {
        super(props);
        this.state = {
            colors: [
                '#16a085',
                '#27ae60',
                '#2c3e50',
                '#f39c12',
                '#e74c3c',
                '#9b59b6',
                '#FB6964',
                '#342224',
                '#472E32',
                '#BDBB99',
                '#77B1A9',
                '#73A857']
        };
    }

    //random change background color
    changeBg() {
        const { colors } = this.state;
        const color = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = color;
        document.body.style.color = color;
        Array.from(document.getElementsByClassName('button')).forEach(element => element.style.backgroundColor = color);
    }

    //get random quote
    _random() {
        return Math.floor(Math.random() * 30) + 1
    }

    render() {
        return <>
            <Quote quote={this.props.quote}
                author={this.props.author}
                newQuote={() => {
                    this.props.getQuote(this._random());
                    this.changeBg();
                }}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        quote: state.quotePage.quote,
        author: state.quotePage.author
    }
}

export default compose(
    //instead mapDispatchToProps use auto dispatch
    connect(mapStateToProps, { getQuote })
)(QuoteContainer)