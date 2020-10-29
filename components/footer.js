import React from 'react';
import { Row, Col, Container  } from 'react-bootstrap'
class Footer extends React.Component {
    constructor(props)
	{
	  super(props);
	  this.state=
	  { }
    }
    componentDidMount(){
    }
    render(){
        return(
            <footer style={{backgroundColor:'black',color:'whitesmoke',padding:'0px 15px 0px 15px'}}>
                <Row>
                    <Col sm='4' style={{padding:'3% 5% 10px 5%'}}>
                        <h2 style={{color:''}}>About Us</h2>
                        <p style={{fontSize:13}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                    <Col sm='4' style={{padding:'3% 5% 10px 5%'}}>
                        <h3>Contact Us</h3>
                        <p>EM-4, EM Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</p>
                        <p>Email : <i>absd@edg.co.in</i></p>
                        <p>Phone : <i>9999999999</i></p>
                    </Col>
                    <Col sm='4' style={{padding:'3% 5% 10px 5%'}}>
                        
                    </Col>
                </Row>
            </footer>
        )
    }
}
export default Footer;