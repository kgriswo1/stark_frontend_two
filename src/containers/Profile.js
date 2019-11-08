import React from 'react';
import Stock from '../components/Stock'
import SideBar from '../components/SideBar';


class Profile extends React.Component {

  grabStocks = () => {
    let copy = []
    let reversed = this.props.myStocks.reverse()
    let stocks = reversed.filter(a => {
      if (!copy.includes(a.ticker)) {
        copy.push(a.ticker)
        return a
      }
    })
    return stocks
  }
  render() {
    let stocksArray = this.grabStocks().map(stock => <Stock key={stock.id} stock={stock} logos={this.props.logos}/>)
    return (
      <div className="profile">
        <SideBar current_user={this.props.current_user}/>
        <div className="stocksProfile">
          {stocksArray}
        </div>
      </div>
    )
  }
  
}

export default Profile
