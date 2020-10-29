import {CSSTransition} from 'react-transition-group';
import React from 'react';
import { Navbar, Nav,  } from 'react-bootstrap'
import { withRouter } from 'next/router'
import { AiOutlinePoweroff } from 'react-icons/ai'
class Header extends React.Component {
    constructor(props)
	{
	  super(props);
	  this.state=
	  {  scroll:0,path:props.router.pathname  }
    }
    componentDidMount(){
        if(this.state.path === '/')
        window.addEventListener('scroll', this.handleScroll(this));
    }
    handleScroll(pointer){
        return function(){
            pointer.setState({
                scroll:document.getElementsByTagName('html')[0].scrollTop,
            })
        }
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll(this));
    }
    render(){
        return(
            <CSSTransition 
            in={true}
            appear={true}
            timeout={500}
            classNames="down">
                <Navbar bg="light"variant="light" fixed='top' expand="lg" style={{border:'solid',borderWidth:'0px 0px 1px 0px'}}>
                <Navbar.Brand  href="/" style={{marginRight:'2%'}}>
                <strong>Dashboard</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav> 
                <Nav variant="pills">
                <Nav.Item> 
                <Nav.Link onClick={()=>{window.open('about:blank','_self')}} style={{color:'black'}}>Logout <AiOutlinePoweroff style={{display:'inline-block'}}/></Nav.Link>
                </Nav.Item></Nav>
                </Navbar.Collapse>
                </Navbar>
            </CSSTransition>
        )
    }
}
export default withRouter(Header);