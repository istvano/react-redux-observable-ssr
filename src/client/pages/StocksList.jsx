import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStocks } from '../modules/stocks/stocks.actions';

class StockList extends Component {
    componentWillMount() {
        this.props.fetchStocks();
    }

    renderStocks() {
        return this.props.stocks ? this.props.stocks.map((stock) => {
            return <li key={stock.symbol}>{stock.companyName}</li>;
        }) : null;
    }

    render() {
        return (
            <div>
                Here is a most active stocks
                <ul>{this.renderStocks()}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { stocks: state.stocks };
};

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => {
        dispatch(fetchStocks());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
