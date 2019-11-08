import React from 'react';
import { Link } from 'react-router-dom'

class MyStock extends React.Component {

    render() {
        // debugger
        return (
            <tr>
                <td data-label="Date">{this.props.stock.date}</td>
                <td data-label="Amount Bought">{this.props.stock.quantity}</td>
                <td data-label="Amount Sold">{this.props.stock.sold}</td>
                <td data-label="Current Amount">{parseInt(this.props.stock.quantity) - parseInt(this.props.stock.sold)}</td>
                <td data-label="Price Bought">{this.props.stock.price}</td>
                <td data-label="Total Spend">{parseInt(this.props.stock.quantity) * parseInt(this.props.stock.price)}</td>
                <td data-label="Sell">
                    <Link to={"/sellstock"} onClick={() => {
                        localStorage.ticker = this.props.stock.ticker
                        localStorage.quantity = this.props.stock.quantity
                        localStorage.currentPrice = this.props.currentPrice
                        localStorage.price = this.props.stock.price
                        localStorage.date = this.props.stock.date
                        localStorage.id = this.props.stock.id
                    }}>
                        <i className="money bill alternate outline icon"></i>
                    </Link>
                </td>
            </tr>
        )
    }
}

export default MyStock