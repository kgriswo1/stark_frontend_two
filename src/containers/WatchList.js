import React from 'react';
import StockCard from '../components/StockCard'
import empty from '../empty.png'

class WatchList extends React.Component {

  render() {
    let stocksArray = this.props.watchlists.map(stock => <StockCard key={stock.id} logos={this.props.logos} stock={stock} removeFromWatchlist={this.props.removeFromWatchlist}/>)
    return (
      <div className="watchlist">
        {this.props.watchlists.length > 0 ? 
          (
            <div className="ui special cards">
              {stocksArray}
            </div>
          ) : 
          (
            <div className="empty" >
              <h2 className="emptyheader">You Have No Watched Stocks</h2>
              <img src={empty} />
            </div>
          )
        }
      </div>
    )
  }

}

export default WatchList




  // loadWatchlist = () => {
  //   this.props.watchlists.forEach(stock => {
  //     // debugger
  //     fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker}&apikey=I6V3R1JT2X3OK2EP`)
  //     .then(response => response.json())
  //     .then(data => {
  //       debugger
  //       let newArray = [...this.state.stocks, data["Global Quote"]]
  //       this.setState({
  //         stocks: newArray
  //       })
  //     })
  //   })
  //   if (this.state.stocks && this.state.stocks.length > 0) {
  //     return this.state.stocks.map(stock => <Stock key={stock["01. symbol"]} stock={stock}/>)
  //   }
  // }

  // render() {
  //   return (
  //     <>
  //       {this.props.watchlists.length > 0 ? (
  //         <Switch>
  //           <Route path="/watchlists" render={() => {
  //             return (
  //               <div>
  //                 <h1>WatchList</h1>
  //                 {this.loadWatchlist()}
  //               </div>
  //             )
  //           }}/>
  //         </Switch>
  //       ) : (<h1>Loading</h1>) }
  //     </>
  //   )
  // }