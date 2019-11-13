import React from 'react';
import { Link } from 'react-router-dom'


class Stock extends React.Component {

    grabTicker = () => {
        let ticker = ''
        if (this.props.stock["01. symbol"]) {
            ticker = this.props.stock["01. symbol"]
        } else {
            ticker = this.props.stock.ticker
        }
        return ticker
    }

    render() {
        // debugger
        return (
            <Link to={`/stocks/${this.grabTicker()}`} className="outerCard">
                <div className="ui card">
                    <div className="image">
                        <img src={this.props.logos[this.grabTicker()][1]}/>
                    </div>
                    <div className="content">
                        <div className="header" >{this.props.logos[this.grabTicker()][0]}</div>
                        {this.props.stock["01. symbol"] ? 
                            (<div className="meta">{"$" + this.props.stock["05. price"]}</div>) : 
                            (<div className="meta">{"$" + this.props.stock.price}</div>) 
                        }
                    </div>
                </div>
            </Link>
        )
    }

}

export default Stock