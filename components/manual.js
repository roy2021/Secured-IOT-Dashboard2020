import { Button, Card, Container, Form } from "react-bootstrap";
import React from 'react';
import { database } from 'firebase'
import {GoRadioTower} from 'react-icons/go'
import {GiCrossMark} from 'react-icons/gi'
import DeviceList from "./deviceList";
import Swal from "sweetalert2";
import * as firebase from "firebase";
class Manual extends React.Component {
    constructor(props)
	{
	    super(props);
        this.state={
            img:'/assets/dashboard.svg',
            title:'Manual Search of devices',
            description:'It checks all IOT devices based on IP.',
            showDevices:false,
            min:0,
            max:100
        }
    }
    componentDidMount(){
        const db=database();
        let items=db.ref().child('manual').child('metadata')
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
        db.ref().child('manual').child('metadata').set({
            img:'/assets/dashboard.svg',
            title:'Manual Search of devices',
            description:'It checks all IOT devices based on IP.',
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
                    <div className='flex-container'>
                        Target IP address:
                        <Form.Group style={{maxWidth:100,margin:'5px'}} onChange={(e)=>{
                            if(e.target.value)
                                this.setState({
                                    a:Number(e.target.value),
                                } )

                        } }  controlId="min">
                            <Form.Control defaultValue={this.state.min} type="number" placeholder="Min" min={0}/>
                        </Form.Group>
                        <Form.Group style={{maxWidth:100,margin:'5px'}} onChange={(e)=>{
                            if(e.target.value)
                                this.setState({
                                    b:Number(e.target.value),
                                } )

                        } }  controlId="min">
                            <Form.Control defaultValue={this.state.min} type="number" placeholder="Min" min={0}/>
                        </Form.Group>
                        <Form.Group style={{maxWidth:100,margin:'5px'}} onChange={(e)=>{
                            if(e.target.value)
                                this.setState({
                                    c:Number(e.target.value),
                                } )

                        } }  controlId="min">
                            <Form.Control defaultValue={this.state.min} type="number" placeholder="Min" min={0}/>
                        </Form.Group>
                        <Form.Group style={{maxWidth:100,margin:'5px'}} onChange={(e)=>{
                            if(e.target.value)
                                this.setState({
                                    d:Number(e.target.value),
                                } )

                        } }  controlId="min">
                            <Form.Control defaultValue={this.state.min} type="number" placeholder="Min" min={0}/>
                        </Form.Group>
                        <Button  onClick={()=>{
                            const {a,b,c,d}=this.state;
                            const min=a+"."+b+"."+c+"."+d;
                            var adaNameRef = firebase.database().ref('deviceCheckResult');
                            adaNameRef.on("value", function(snapshot) {
                                const newvalue=snapshot.val().find( ({ ipv4 }) => ipv4 === min);
                                console.log(newvalue);
                                if(newvalue) {
                                    var n='Name:'+newvalue.name.toString()+'\n'+
                                        'IP Address:'+newvalue.ipv4+'\n'+
                                        'MAC Address:'+newvalue.mac+'\n'+
                                        'Status:'+newvalue.state+'\n'+
					'Message:'+newvalue.message;
                                    Swal.fire({
                                        html: '<pre>' + n + '</pre>',
                                        customClass: {
                                            popup: 'format-pre'
                                        }
                                    });
                                }
                                else
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'There is no device found matching the entered IP address',
                                    })
                            }, function (errorObject) {
                                console.log("The read failed: " + errorObject.code);
                            })

                        }}> Scan
                        </Button>
                    </div>}<i style={{color:'red'}}>{this.state.error}</i>
                </center>
            </Card.Footer>
            </Card>
            {
                this.state.showDevices && <DeviceList min={this.state.min} max={this.state.max}/>
            }
                {/* <div onClick={()=>{this.addData()}}>Add</div> */}
        </Container>
    }
}
export default Manual;