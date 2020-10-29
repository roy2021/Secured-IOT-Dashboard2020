import { Button, Card, Container } from "react-bootstrap";
import React from 'react';
import { database } from 'firebase'
import {GoRadioTower} from 'react-icons/go'
import {GiCrossMark} from 'react-icons/gi'
import DeviceList from "./deviceList";
class Automatic extends React.Component {
    constructor(props)
	{
	    super(props);
        this.state={
            img:'/assets/dashboard.svg',
            title:'Automatic Vurnebility Scan For all IOT devices in your house.',
            description:'It checks all IOT devices and Respond automatically.',
            showDevices:false
        }
    }
    componentDidMount(){
        const db=database();
        let items=db.ref().child('automatic').child('metadata')
        items.on('child_added',(snap)=>{
            const item= snap.val()
            const key= snap.key
            const s={}
            s[key]=item
            if(item)
            this.setState(s);
        })
    }
    addData(){
        const db=database();
        db.ref().child('automatic').child('metadata').set({
            img:'/assets/dashboard.svg',
            title:'Automatic Vurnebility Scan For all IOT devices in your house.',
            description:'It checks all IOT devices and Respond automatically.'
        })
    }
    render(){
        return <Container>
            <Card style={{boxShadow:'2px 3px 10px grey'}}>
            <Card.Body>
                <center>
                    <Card.Title><h3>{this.state.title}</h3></Card.Title>
                    <Card.Text>
                        <p>{this.state.description}</p>
                    </Card.Text>
                </center>
            </Card.Body>
            <Card.Footer>
                <center>
                    {this.state.showDevices?
                    <Button  onClick={()=>{this.setState({showDevices:false})}} variant='danger' style={{fontSize:'20px',color:'white'}}>
                        <GiCrossMark  style={{marginRight:'10px'}}/>Close
                    </Button>:
                    <Button  onClick={()=>{this.setState({showDevices:true})}} variant='warning' style={{fontSize:'20px'}}>
                        <GoRadioTower style={{marginRight:'10px'}}/>Scan
                    </Button>}
                </center>
            </Card.Footer>
            </Card>
            {
                this.state.showDevices && <DeviceList/>
            }
                {/* <div onClick={()=>{this.addData()}}>Add</div> */}
        </Container>
    }
}
export default Automatic;