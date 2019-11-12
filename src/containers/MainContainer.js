import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './Home'
import WatchList from './WatchList'
import Profile from './Profile'
import NavBar from './NavBar'
import Welcome from '../components/Welcome'


import Chart from '../components/Chart'


class MainContainer extends React.Component {

    state = {
        stocks: [],
        logos: {
            FB: ["Facebook", "https://clipart.info/images/ccovers/1499793248fb-facebook-icon-clipart-logo.png"],
            MSFT: ["Microsoft", "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"],
            GOOGL: ["Google", "https://hersheymotors.com/wp-content/uploads/sites/17/icon-google-square-png.png"],
            IBM: ["IBM", "https://www.ibm.com/design/language/331f29bd23328a3d372d3a8a54aa8187/core-blue40-blue90.svg"],
            COF: ["Capital One", "https://codessafe.com/wp-content/uploads/2018/03/Capital-One-New-York-Branch-SWIFT-BIC-Code.jpg"],
            TWTR: ["Twitter", "https://images-eu.ssl-images-amazon.com/images/I/31KluT5nBkL.png"],
            NFLX: ["Netflix", "https://image.businessinsider.com/57684adedd0895384c8b4b55?width=1100&format=jpeg&auto=webp"],
            CBS: ["CBS", "https://i.pinimg.com/originals/d3/02/1e/d3021ea284a34ed3da5c6201b076eb40.jpg"],
            ABC: ["ABC", "http://images6.fanpop.com/image/photos/41300000/ABC-Remake-3-logos-41361672-1198-1198.png"],
            BIG: ["Big Lots", "https://images.squarespace-cdn.com/content/v1/52332e84e4b00cea298a7f88/1562559023296-O3717780CPW651B84U6I/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/BigLots-Logo%402x.png"],
            AMZN: ["Amazon", "https://store-images.s-microsoft.com/image/apps.32851.9007199266244431.b4d3435e-46b8-4529-bf79-626971898f79.8dd824f2-3db6-4a3c-8d00-332134f1a44b"],
            JPM: ["JP Morgan", "https://ceowatermandate.org/wp-content/uploads/2017/12/JP-morgan.png"],
            C: ["Citigroup", "https://www.vault.com/media/20639/citi_logo_2018.jpg"],
            DIS: ["Walt Disney", "https://r1.ilikewallpaper.net/ipad-air-wallpapers/download/24851/Walt-Disney-Logo-Art-iPad-4-wallpaper-ilikewallpaper_com.jpg"],
            SNE: ["Sony Corp", "https://datatransmission.co/radio/wp-content/uploads/sites/2/2019/09/sony-logo.png"],
            CAJ: ["Canon", "https://www.4kshooters.net/wp-content/uploads/2016/02/CANON-LOGO.jpg"],
            AAPL: ["Apple", "https://live.staticflickr.com/6058/6216328605_2d0c7b16be.jpg"],
            DISCA: ["Discovery", "https://yt3.ggpht.com/-Rinno2fmVnk/AAAAAAAAAAI/AAAAAAAAAAA/RWlfdQ-doH4/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"],
            BBC: ["BBC", "https://www.nigelhuddleston.com/sites/www.nigelhuddleston.com/files/bbc.jpg"],
            JNJ: ["Johnson & Johnson", "https://eng-archive.aawsat.com/wp-content/uploads/2017/01/johnson.jpg"],
            WMT: ["Walmart", "https://cdn.collider.com/wp-content/uploads/2018/07/walmart-logo.png"],
            COST: ["Costco", "https://d2ojpxxtu63wzl.cloudfront.net/static/e124c6fd2b4e154fea39291e8532cbf2_042230cfe3c710d3b560a70e48a357ac7199addfa5aad709fb7a96c8c230219b"],
            LULU: ["Lululemon Athletica", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSeVheBLUnOOiSqRyzo7CcibTCTCvT3x-yCMmhxtAN0enVclk&s"],
            F: ["Ford Motor", "http://cdn.hasshe.com/img/s/Y8zfZqHdAOuMGNTJP4zKFgHaHa.jpg"],
            PINS: ["Pinterest", "http://www.vectorico.com/?wpfilebase_thumbnail=1&fid=126&name=Pinterest-Icon-Square.png"],
            BAC: ["Bank Of America", "https://modsforandroid.com/wp-content/uploads/2018/12/Download-Bank-of-America-Mobile-Banking.png"],
            MS: ["Morgan Stanley", "https://www.fintechfutures.com/files/2016/04/Morgan-Stanley.png"],
            HDB: ["HDFC Bank Limited", "https://apkdl.in/apkimage/L6wGFQZjGcAmPmCw8g3qhG_5xTD1LLx9KJA8wP_d73nJadC535D_m3LNLbRqaITNBpA"],
            JCP: ["JC Penny", "https://kc1385.files.wordpress.com/2014/03/bad-logo-2.jpg"],
            TGT: ["Target", "https://www.lionnelweb.com/blog/wp-content/uploads/2012/10/target-logo.png"],
            M: ["Macy's", "http://jtmichaels.com/wp-content/uploads/2014/11/macys-logo.png"],
            JWN: ["Nordstrom", "https://www.uvuvi.com/assets/ajax/ajax.entities.external.php?action=getProfileImage&company_entity_id=370598"],
            KSS: ["Kohl's", "https://www.barcode.graphics/wp-content/uploads/2015/04/kohls.jpg"],
            GPS: ["GAP", "http://techgeek.com.au/wp-content/uploads/2013/11/gap_logo01.jpg"],
            BBBY: ["Bed Bath Beyond", "https://i.pinimg.com/280x280_RS/01/a2/8a/01a28a2436ae2c95058247f6bf777186.jpg"],
            UAA: ["Under Armour", "https://my-live-01.slatic.net/original/556fd1851b4ea0e6549d5d32c4030442.jpg"],
            VFC: ["VF Corp", "http://www.rutherfordaudio.com/wp-content/uploads/2016/03/vf-logo.png"],
            TSLA: ["Tesla", "https://res.cloudinary.com/teepublic/image/private/s--mQ3-8kDC--/t_Preview/b_rgb:c62b29,c_limit,f_jpg,h_630,q_90,w_630/v1483104947/production/designs/1006816_1.jpg"],
            UBER: ["Uber", "https://i.pinimg.com/originals/4b/5f/25/4b5f25f47fc01c4db7f148fc57b2eb5c.jpg"],
            ZG: ["Zillow", "http://www.williamsonteamproperties.com/wp-content/uploads/2016/05/zillow-profile-icon-0e6d0f.png"],
            AXP: ["American Express", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"],
            MA: ["Mastercard", "https://www.ideabook.com/wp-content/uploads/2016/07/mastercard.jpg"],
            PYPL: ["Paypal", "https://apkdz.com/wp-content/uploads/2019/07/Download-PayPal-Mobile-Cash-Send-and-Request-Money-Fast-7.11.0-APK.png"],
            V: ["Visa", "https://amanz.my/wp-content/uploads/2018/06/visa-logo-650x650.jpg"],
            NKE: ["Nike", "https://pbs.twimg.com/profile_images/953320896101412864/UdE5mfkP_400x400.jpg"],
        }
    }

    componentDidMount() {
        this.jsonFetchFB()
        this.jsonFetchMSFT()
        this.jsonFetchGOOGL()
        this.jsonFetchTWTR()
        this.jsonFetchIBM()
        this.jsonFetchCOF()
        this.jsonFetchNFLX()
        this.jsonFetchCBS()
        this.jsonFetchABC()
        this.jsonFetchBIG()
        this.jsonFetchAMZN()
        this.jsonFetchJPM()
        this.jsonFetchC()
        this.jsonFetchDIS()
        this.jsonFetchSNE()
        this.jsonFetchCAJ()
        this.jsonFetchAAPL()
        this.jsonFetchDISCA()
        this.jsonFetchBBC()
        this.jsonFetchJNJ()
        this.jsonFetchWMT()
        this.jsonFetchCOST()
        this.jsonFetchLULU()
        this.jsonFetchF()
        this.jsonFetchPINS()
        this.jsonFetchBAC()
        this.jsonFetchMS()
        this.jsonFetchHDB()
        this.jsonFetchJCP()
        this.jsonFetchTGT()
        this.jsonFetchM()
        this.jsonFetchJWN()
        this.jsonFetchKSS()
        this.jsonFetchGPS()
        this.jsonFetchBBBY()
        this.jsonFetchUAA()
        this.jsonFetchVFC()
        this.jsonFetchTSLA()
        this.jsonFetchUBER()
        this.jsonFetchZG()
        this.jsonFetchAXP()
        this.jsonFetchMA()
        this.jsonFetchPYPL()
        this.jsonFetchV()
        this.jsonFetchNKE()
    }

    jsonFetchFB = () => {
        fetch("http://localhost:3000/FB")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchMSFT = () => {
        fetch("http://localhost:3000/MSFT")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchGOOGL = () => {
        fetch("http://localhost:3000/GOOGL")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchTWTR = () => {
        fetch("http://localhost:3000/TWTR")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchIBM = () => {
        fetch("http://localhost:3000/IBM")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchCOF = () => {
        fetch("http://localhost:3000/COF")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchNFLX = () => {
        fetch("http://localhost:3000/NFLX")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchCBS = () => {
        fetch("http://localhost:3000/CBS")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchABC = () => {
        fetch("http://localhost:3000/ABC")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchBIG = () => {
        fetch("http://localhost:3000/BIG")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchAMZN = () => {
        fetch("http://localhost:3000/AMZN")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchJPM = () => {
        fetch("http://localhost:3000/JPM")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchC = () => {
        fetch("http://localhost:3000/C")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchDIS = () => {
        fetch("http://localhost:3000/DIS")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchSNE = () => {
        fetch("http://localhost:3000/SNE")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchCAJ = () => {
        fetch("http://localhost:3000/CAJ")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })   
    }

    jsonFetchAAPL = () => {
        fetch("http://localhost:3000/AAPL")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })  
    }

    jsonFetchDISCA = () => {
        fetch("http://localhost:3000/DISCA")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })  
    }

    jsonFetchBBC = () => {
        fetch("http://localhost:3000/BBC")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })     
    }

    jsonFetchJNJ = () => {
        fetch("http://localhost:3000/JNJ")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchWMT = () => {
        fetch("http://localhost:3000/WMT")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchCOST = () => {
        fetch("http://localhost:3000/COST")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchLULU = () => {
        fetch("http://localhost:3000/LULU")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchF = () => {
        fetch("http://localhost:3000/F")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchPINS = () => {
        fetch("http://localhost:3000/PINS")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchBAC = () => {
        fetch("http://localhost:3000/BAC")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchMS = () => {
        fetch("http://localhost:3000/MS")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchHDB = () => {
        fetch("http://localhost:3000/HDB")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchJCP = () => {
        fetch("http://localhost:3000/JCP")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchTGT = () => {
        fetch("http://localhost:3000/TGT")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchM = () => {
        fetch("http://localhost:3000/M")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchJWN = () => {
        fetch("http://localhost:3000/JWN")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchKSS = () => {
        fetch("http://localhost:3000/KSS")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchGPS = () => {
        fetch("http://localhost:3000/GPS")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })   
    }

    jsonFetchBBBY = () => {
        fetch("http://localhost:3000/BBBY")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })  
    }

    jsonFetchUAA = () => {
        fetch("http://localhost:3000/UAA")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        }) 
    }

    jsonFetchVFC = () => {
        fetch("http://localhost:3000/VFC")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        }) 
    }

    jsonFetchTSLA = () => {
        fetch("http://localhost:3000/TSLA")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        }) 
    }

    jsonFetchUBER = () => {
        fetch("http://localhost:3000/UBER")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        }) 
    }

    jsonFetchZG = () => {
        fetch("http://localhost:3000/ZG")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchAXP = () => {
        fetch("http://localhost:3000/AXP")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchMA = () => {
        fetch("http://localhost:3000/MA")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchPYPL = () => {
        fetch("http://localhost:3000/PYPL")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchV = () => {
        fetch("http://localhost:3000/V")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    jsonFetchNKE = () => {
        fetch("http://localhost:3000/NKE")
        .then(response => response.json())
        .then(data => {
            let newArray = [...this.state.stocks, data]
            this.setState({
                stocks: newArray
            })
        })
    }

    render() {
        return (
            <div className="maincontainer">
                <NavBar logout={this.props.logout}/>
                <Switch>
                    <Route path="/watchlists" render={() => <WatchList logos={this.state.logos} watchlists={this.props.watchlists} removeFromWatchlist={this.props.removeFromWatchlist}/>} />
                    <Route path="/profile" render={() => <Profile money={this.props.money} addMoneySubmitHandler={this.props.addMoneySubmitHandler} current_user={this.props.current_user} myStocks={this.props.myStocks} logos={this.state.logos}/> } />
                    {/* <Route path="/sellstock" render={() => <SellStock money={this.props.money} sellStock={this.props.sellStock}/>} /> */}
                    <Route path="/stocks" render={() => <Home myStocks={this.props.myStocks} sellStock={this.props.sellStock} money={this.props.money} addToMyStocks={this.props.addToMyStocks} stocks={this.state.stocks} addToWatchList={this.props.addToWatchList} logos={this.state.logos}/>} />
                    <Route path="/chart" render={() => <Chart />} />

                    <Route path="/" component={Welcome} />
                </Switch>
            </div>
        )
    }

}

export default MainContainer;


    // fetchMSFT = () => {
    //     fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=I6V3R1JT2X3OK2EP")
    //     .then(response => response.json())
    //     .then(data => {
    //         if (!data["Note"]) {
    //             let newArray = [...this.state.stocks]
    //             newArray[1] = data["Global Quote"]
    //             this.setState({
    //                 stocks: newArray
    //             })
    //         } else {
    //             this.jsonFetchMSFT()
    //         }
    //     })
    // }