import React from 'react';
import Plot from 'react-plotly.js';

class Chart extends React.Component {

    state = {
        xValues: [],
        closeValues: [],
        highValues: [],
        lowValues: [],
        openValues: [], 
    }

    componentDidMount() {
        this.fetchStock()
    }

    fetchStock = () => {
        let count = parseInt(localStorage.count)

        if (count === 0 || count < 19) {
            localStorage.count = count + 1
        } else {
            localStorage.count = 0
        }
        

        let keys = [
            "I6V3R1JT2X3OK2EP", "XY5PAWELIZYGVXL8", "693S76K473CIJP76", "VBT40L2QMZF5WAYA", "SG7VMXGQ9DGQ8V5N", 
            "VYNXXWCYJE17LU4R", "49LCW88RE54082JP", "SNQKO6NXIBT362MD", "HQG2S66QRMHZQGS9", "RR9X8TO4J2HK4PWT",
            "RJ3AABICJ5XENKZP", "MXRRYXLAYT5EPP3R", "9F5WBFIOF4AE9N0Y", "MMK69DOCL3W06TNR", "2AFC98157ERHTVED",
            "50F376UOH6OGVQK3", "1CBTSV8QKRZPMEXN", "NYZF56GHXB0PEIJQ", "16LYR96N7AZAPJP2", "6N81L9WLIUD6COOU",
            "16LYR96N7AZAPJP2", "ST4XUGEKRD1Q1WZB"
        ]
        
        let key = keys[count]
        console.log(key)
        console.log(count)

        // debugger
        fetch(`http://localhost:3000/${this.props.ticker}Monthly`)
        // fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${this.props.ticker}&apikey=${key}`)
        .then(response => response.json())
        .then(data => {
            console.log("data", data)


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
        // console.log(this)
        return (
            <>
                {this.state.xValues.length > 0 ? 
                    (
                        <div className="chart">
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
                                    t: 25, 
                                    b: 40,
                                    }, 
                                    width: 1000,
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
                                    
                                    type: 'linear'
                                    }
                                }}
                            />
                        </div>

                    ) : 
                    (
                        <div>
                            <br/>
                            <div className="ui active centered inline loader"></div>
                        </div>
                    )
                }
            </>
        )
    }
}

export default Chart;