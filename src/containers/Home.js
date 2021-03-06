import React from 'react';
import Stock from '../components/Stock'
import { Route, Switch } from 'react-router-dom'
import StockShow from '../components/StockShow'
import Welcome from '../components/Welcome';


class Home extends React.Component {

  render() {
    let stocksArray = this.props.stocks.map(stock => 
      <Stock 
        key={stock["01. symbol"]} 
        stock={stock} 
        addToWatchList={this.props.addToWatchList} 
        logos={this.props.logos}
      />
    )
    return (
      <>
        <Switch>
          <Route path="/stocks/:id" render={(routerProps) => {
            let ticker = routerProps.match.params.id
            let stock = Object.keys(this.props.logos).includes(ticker)
            if (stock ) {
              return <StockShow 
                logos={this.props.logos} 
                ticker={ticker} 
                addToWatchList={this.props.addToWatchList} 
                myStocks={this.props.myStocks}
                money={this.props.money} 
                addToMyStocks={this.props.addToMyStocks}
                sellStock={this.props.sellStock}
              />
            } else {
              return <Welcome />
            }
          }}/>

          <Route path="/stocks" render={() => {
            return (
              <div className="stocks">
                {stocksArray}
              </div>
            )
          }}/>
        </Switch>
      </>
    )
  }

}

export default Home