import React from 'react';
import logo from '../logo.png'  

class Welcome extends React.Component {  

    render() {  
        return (
            <div className="welcome">
                <div className="welcomestartk">Stark</div> 
                <img src={logo} />
            </div>
        );  
    }  
}  

export default Welcome;