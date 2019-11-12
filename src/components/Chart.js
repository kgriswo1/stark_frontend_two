import React from 'react';
import Plot from 'react-plotly.js';

class Chart extends React.Component {

    state = {
        xValues: [],
        closeValues: [],
        highValues: [],
        lowValues: [],
        openValues: []
    }

    componentDidMount() {
        this.fetchStock()
    }

    fetchStock = () => {
        fetch(`http://localhost:3000/MonthlyAdjustedTimeSeries`)
        .then(response => response.json())
        .then(data => {
            let keys = Object.keys(data)
            this.setState({
                xValues: keys
            })

            this.state.xValues.forEach(key => {
                 let newClose = [...this.state.closeValues, parseInt(data[key]["4. close"])]
                 let newHigh = [...this.state.highValues, parseInt(data[key]["2. high"])]
                 let newLow = [...this.state.lowValues, parseInt(data[key]["3. low"])]
                 let newOpen = [...this.state.openValues, parseInt(data[key]["1. open"])]

                this.setState({
                    closeValues: newClose,
                    highValues: newHigh,
                    lowValues: newLow,
                    openValues: newOpen
                })
            });
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                {this.state.xValues.length > 239 ? 
                    (
                        <div>
                            <Plot
                                data={[
                                    {
                                        x: this.state.xValues,
                                        close: this.state.closeValues,

                                        decreasing: {line: {color: '#7F7F7F'}}, 

                                        high: this.state.highValues,

                                        increasing: {line: {color: '#17BECF'}}, 
                                        line: {color: 'rgba(31,119,180,1)'},

                                        low: this.state.lowValues,
                                        open: this.state.openValues,
                                        type: 'candlestick',
                                        xaxis: 'x', 
                                        yaxis: 'y',
                                    }
                                ]}
                                layout = {{
                                    dragmode: 'zoom', 
                                    margin: {
                                    r: 10, 
                                    t: 25, 
                                    b: 40, 
                                    l: 60
                                    }, 
                                    showlegend: false, 
                                    xaxis: {
                                    autorange: true, 
                                    domain: [0, 1], 
                                    range: ['1999-12-31 12:00', '2019-11-11 12:00'], 
                                    rangeslider: {range: ['1999-12-31 12:00', '2019-11-11 12:00']}, 
                                    title: 'Date', 
                                    type: 'date'
                                    }, 
                                    yaxis: {
                                    autorange: true, 
                                    domain: [0, 1], 
                                    range: [20, 300], 
                                    type: 'linear'
                                    }
                                }}
                            />
                        </div>

                    ) : 
                    (<h1>loading</h1>)
                }
            </>
        )
    }
}

export default Chart;