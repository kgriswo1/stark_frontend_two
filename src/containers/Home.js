import React from 'react';
import Stock from '../components/Stock'

class Home extends React.Component {

  render() {
    let stocksArray = this.props.stocks.map(stock => <Stock key={stock["01. symbol"]} stock={stock} addToWatchList={this.props.addToWatchList} grabStock={this.props.grabStock}/>)
    return (
      <div>
          <h1>Home</h1>
          {stocksArray}
      </div>
    )
  }

}

export default Home