import React from 'react';

class Stock extends React.Component {

    state = {
        active: "ui dimmer transition hidden"
    }

    changeToActive = () => {
        this.setState({
            active: "ui dimmer transition active"
        })
    }

    changeToInActive = () => {
        this.setState({
            active: "ui dimmer transition hidden"
        })
    }

    render() {
        console.log(this.props.logos)
        // debugger
        return (
            <div className="card">
                <div className="blurring dimmable image" onMouseEnter={this.changeToActive} onMouseLeave={this.changeToInActive}>
                    <div className={this.state.active}>
                        <div className="content">
                            <div className="center">
                                <div onClick={() => this.props.removeFromWatchlist(this.props.stock)} className="ui inverted button">
                                    Remove From Watchlist
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={this.props.logos[this.props.stock.ticker][1]}/>
                </div>

                <div className="content">
                    <div className="header">{this.props.logos[this.props.stock.ticker][0]}</div>
                </div>
            </div>
        )
    }

}

export default Stock


{/* <div onClick={() => this.props.removeFromWatchlist(this.props.stock)}>
    <h1>{"Ticker: " + this.props.stock.ticker}</h1>
</div> */}