import React from "react";
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryAxis, VictoryBrushContainer } from "victory";
import ReactDOM from 'react-dom';

class Chart extends React.Component {

    state = {
      stock: []
    }
  
    handleZoom(domain) {
      this.setState({
        selectedDomain: domain
      });
    }
  
    handleBrush(domain) {
      this.setState({
        zoomDomain: domain
      });
    }

    componentDidMount = () => {
      fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=demo")
      .then(response => response.json())
      .then(data => {
        this.setState({
          stock: data["Monthly Adjusted Time Series"]
        })}
      )
    }

    createGraph = () => {
      let data = []

      Object.keys(this.state.stock).forEach(key => {
        let y = key.slice(0, 4)
        let m = key.slice(5, 7)
        let d = key.slice(8, 10)

        let price = parseInt(this.state.stock[key]["1. open"])
        let hash = {x: new Date(y, m, d), y: price}
        data.push(hash)
      })

      return data
    }
  
    render() {
      return (
        <div>
            <VictoryChart width={600} height={350} scale={{x: "time"}}
              containerComponent={
                <VictoryZoomContainer responsive={false}
                  zoomDimension={"x"}
                  zoomDomain={this.state.zoomDomain}
                  // zoomDomain={{x: [5, 35], y: [0, 100]}}
                  onZoomDomainChange={this.handleZoom.bind(this)}
                />
              }
            >
              <VictoryLine
                style={{
                  data: {stroke: "tomato"}
                }}
                data={this.createGraph()}
              />
  
            </VictoryChart>
  
            <VictoryChart
              padding={{top: 0, left: 50, right: 50, bottom: 30}}
              width={600} height={90} scale={{x: "time"}}
              containerComponent={
                <VictoryBrushContainer responsive={false}
                  brushDimension="x"
                  brushDomain={this.state.selectedDomain}
                  onBrushDomainChange={this.handleBrush.bind(this)}
                />
              }
            >
              <VictoryAxis
                tickValues={[
                  new Date(1999, 1, 1),
                  new Date(2000, 1, 1),
                  new Date(2001, 1, 1),
                  new Date(2002, 1, 1),
                  new Date(2003, 1, 1),
                  new Date(2004, 1, 1),
                  new Date(2005, 1, 1),
                  new Date(2006, 1, 1),
                  new Date(2005, 1, 1),
                  new Date(2007, 1, 1),
                  new Date(2008, 1, 1),
                  new Date(2009, 1, 1),
                  new Date(2010, 1, 1),
                  new Date(2011, 1, 1),
                  new Date(2012, 1, 1),
                  new Date(2013, 1, 1),
                  new Date(2014, 1, 1),
                  new Date(2015, 1, 1),
                  new Date(2016, 1, 1),
                  new Date(2017, 1, 1),
                  new Date(2018, 1, 1),
                  new Date(2019, 1, 1),
                ]}
                tickFormat={(x) => new Date(x).getFullYear()}
              />
              <VictoryLine
                style={{
                  data: {stroke: "tomato"}
                }}
                data={this.createGraph()}
              />
            </VictoryChart>
        </div>
      );
    }
}
  
export default Chart