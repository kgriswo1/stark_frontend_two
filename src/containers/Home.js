import React from 'react';
import Stock from '../components/Stock'
import { Route, Switch } from 'react-router-dom'
import StockShow from '../components/StockShow'


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
            return <StockShow logos={this.props.logos} ticker={ticker} addToWatchList={this.props.addToWatchList} myStocks={this.props.myStocks}/>
          }}/>

          <Route path="/stocks" render={() => {
            return (
              <div className="home">
                <div className="ui grid">
                  {stocksArray}
                </div>
              </div>
            )
          }}/>
        </Switch>
      </>
    )
  }

}

export default Home