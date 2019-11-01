import React from 'react';
import Stock from '../components/Stock'


class WatchList extends React.Component {

  state = {
    stocks: []
  }

  componentDidMount() {
    this.props.watchlist.forEach(ticker => {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=XY5PAWELIZYGVXL8`)
      .then(response => response.json())
      .then(data => {
        let newArray = [...this.state.stocks, data["Global Quote"]]
        this.setState({
          stocks: newArray
        })
      })
    })
  }

  render() {
    let stocksArray = this.state.stocks.map(stock => <Stock key={stock["01. symbol"]} stock={stock}/>)
    return (
        <div>
            <h1>WatchList</h1>
            {stocksArray}
        </div>
    )
  }

}

export default WatchList