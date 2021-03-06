import React from 'react'
import Calculator from './Calculator'

//regex rules
const isOperator = /[*/+‑]/
const endsWithOperator = /[*+‑/]$/
const endWithNumber = /[0-9]$/
const endsWithNegativeSign = /(-){1}$/ // /\d[x/+‑]{1}‑$/


class CalculatorContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentVal: '0',
            prevVal: '0',
            formula: '',
            currentSign: 'pos',
            lastClicked: ''
        }
    }

    //check digit limit
    maxDigitWarning = () => {
        this.setState({
            currentVal: 'Digit Limit Met',
            prevVal: this.state.currentVal
        });
        setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
    }

    // evaluate handler
    handleEvaluate = () => {
        if (!this.state.currentVal.includes('Limit')) {
            let expression = this.state.formula;
            while (endsWithOperator.test(expression)) {
                expression = expression.slice(0, -1);
            }
            expression = expression
                .replace(/x/g, '*')
                .replace(/‑/g, '-')
                .replace('--', '+0+0+0+0+0+0+');
            const answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
            this.setState({
                currentVal: answer.toString(),
                formula:
                    expression
                        .replace(/-/g, '‑')
                        .replace('+0+0+0+0+0+0+', '‑-')
                        .replace(/(x|\/|\+)‑/, '$1-')
                        .replace(/^‑/, '-') +
                    '=' +
                    answer,
                prevVal: answer,
                evaluated: true
            });
        }
    }

    //operator handler
    handleOperators = (e) => {
        if (!this.state.currentVal.includes('Limit')) {
            const value = e.target.value;
            const { formula, prevVal, evaluated } = this.state;
            this.setState({ currentVal: value, evaluated: false });
            if (evaluated) {
                this.setState({ formula: prevVal + value });
            } else if (endWithNumber.test(formula)) {
                this.setState({
                    prevVal: formula,
                    formula: formula + value
                });
            } else if (!endsWithNegativeSign.test(formula)) {
                this.setState({
                    formula:
                        (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
                        value
                });
            }else if (value !== '‑') {
                this.setState({
                    formula: prevVal + value
                });
            }
        }
    }

    //numbers handler
    handleNumbers = (e) => {
        if (!this.state.currentVal.includes('Limit')) {
            const { currentVal, formula, evaluated } = this.state;
            const value = e.target.value;
            this.setState({ evaluated: false });
            if (currentVal.length > 21) {
                this.maxDigitWarning();
            } else if (evaluated) {
                this.setState({
                    currentVal: value,
                    formula: value !== '0' ? value : ''
                });
            } else {
                this.setState({
                    currentVal:
                        currentVal === '0' || isOperator.test(currentVal)
                            ? value
                            : currentVal + value,
                    formula:
                        currentVal === '0' && value === '0'
                            ? formula === ''
                                ? value
                                : formula
                            : /([^.0-9]0|^0)$/.test(formula)
                                ? formula.slice(0, -1) + value
                                : formula + value
                });
            }
        }
    }

    //decimal handler
    handleDecimal = () => {
        if (this.state.evaluated === true) {
            this.setState({
                currentVal: '0.',
                formula: '0.',
                evaluated: false
            });
        } else if (
            !this.state.currentVal.includes('.') &&
            !this.state.currentVal.includes('Limit')
        ) {
            this.setState({ evaluated: false });
            if (this.state.currentVal.length > 21) {
                this.maxDigitWarning();
            } else if (
                endsWithOperator.test(this.state.formula) ||
                (this.state.currentVal === '0' && this.state.formula === '')
            ) {
                this.setState({
                    currentVal: '0.',
                    formula: this.state.formula + '0.'
                });
            } else {
                this.setState({
                    currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
                    formula: this.state.formula + '.'
                });
            }
        }
    }

    // start state
    initialize = () => {
        this.setState({
            currentVal: '0',
            prevVal: '0',
            formula: '',
            currentSign: 'pos',
            lastClicked: '',
            evaluated: false
        });
    }

    render() {
        return (
            <Calculator formula={this.state.formula} 
                        currentValue={this.state.currentVal}
                        operators={this.handleOperators}
                        numbers={this.handleNumbers}
                        initialize={this.initialize}
                        decimal={this.handleDecimal}
                        evaluate={this.handleEvaluate} />
        )

    }
}

export default CalculatorContainer
