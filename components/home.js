import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link'
import List from './sideList';
import Soon from './coming';
import Welcome from './welcome';
import Automatic from './automatic';
import Manual from './manual';


class Home  extends React.Component {
    constructor(props)
	{
	  super(props);
	  this.state=
	  { list:[],height:1000,active:'default' }
    }
    componentDidMount(){
        this.setState({
          height:window.screen.height
        })
    }
    render(){
      let panel=<Soon/>
      if(this.state.active=='default'){
        panel=<Welcome/>
      }
      if(this.state.active=='auto'){
        panel=<Automatic/>
      }
      if(this.state.active=='manual'){
        panel=<Manual/>
      }
      return (
      <div style={{paddingRight:'15px',paddingLeft:'15px'}}><Row>
        <Col lg='2'sm='3' style={{height:this.state.height,paddingLeft:0}}>
          <List onChange={(active)=>{this.setState({active})}}/>
        </Col>
        <Col lg='10'sm='9' style={{border:'solid',borderWidth:'0px 0px 0px 1px',borderColor:'black'}}><br/><br/><br/>
          {
            panel
          }
        </Col>
      </Row>
      </div>)
    }
}
export default Home;