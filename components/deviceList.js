import { Button, Card, Col, Container, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import React from 'react';
import { database } from 'firebase'
import { PieChart } from 'react-minimal-pie-chart';
import { GiArtificialHive, GiLaserWarning } from 'react-icons/gi'
import { AiOutlineSafety, AiOutlineTool, AiOutlineBulb, AiOutlineBell, AiOutlineLock } from 'react-icons/ai'
import { FcSpeaker } from 'react-icons/fc'
import { BsCameraVideo, BsDisplay } from 'react-icons/bs'
import { BiPlug } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti';
import { MdRouter, MdSecurity } from 'react-icons/md'
import { CgDanger, CgThermostat } from 'react-icons/cg'
import Loader from 'react-loader-spinner'
import Swal from 'sweetalert2'
function GetState(props){
    switch(props.state){
        case 'safe': return <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
            <Tooltip id="button-tooltip">
                Safe
            </Tooltip>
            }
        >
        <AiOutlineSafety size={25} style={{color:"green"}}/></OverlayTrigger>;
        case 'warn': return <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
            <Tooltip id="button-tooltip">
                <i style={{color:'#6bd3ff'}}>Test : {props.test}</i><br/>Warning : {props.message}
            </Tooltip>
            }
        ><GiLaserWarning size={25} style={{color: "#ffb300"}}/></OverlayTrigger>;
        case 'danger': return <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
            <Tooltip id="button-tooltip">
                <i style={{color:'#6bd3ff'}}>Test : {props.test}</i><br/>Danger : {props.message}
            </Tooltip>
            }
        ><CgDanger size={25} style={{color:"red"}}/></OverlayTrigger>;
        default : return <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
            <Tooltip id="button-tooltip">
                Safe
            </Tooltip>
            }
        ><AiOutlineSafety size={25} style={{color:"green"}}/></OverlayTrigger>;
    }
}
function Icon({type}){
    switch(type){
        case 'ai': return <GiArtificialHive size={25}/>;
        case 'speaker': return <FcSpeaker size={25}/>;
        case 'camera': return <BsCameraVideo size={25}/>;
        case 'thermostat': return <CgThermostat size={25}/>;
        case 'plug': return <BiPlug size={25}/>;
        case 'security': return <MdSecurity size={25}/>;
        case 'router': return <MdRouter size={25}/>;
        case 'bulb': return <AiOutlineBulb size={25}/>;
        case 'display': return <BsDisplay size={25}/>;
        case 'bell': return <AiOutlineBell size={25}/>;
        case 'lock': return <AiOutlineLock size={25}/>;
        default : return <AiOutlineTool size={25}/>;
    }
}
class DeviceList extends React.Component {
    constructor(props)
	{
	    super(props);
        this.state={
            processing:true,
            devices:[],
            selected:null,
            min:props.min||(0-1),
            max:props.max||(0-1),
        }
    }
    componentDidMount(){
        const db=database();
        let items=db.ref().child('deviceCheckResult') // This is the non-demo table
        items.once('value',(snap)=>{
            const data=snap.val()
            if(data)
            this.setState({devices:this.preProcess(data)});
        });
        const pointer=this;
        setTimeout(function(){ 
            pointer.setState({processing:false})
        }, 5000)
    }
    shuffle(array) { //Only used in demos
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    preProcess(devices){
        const states=['safe','warn','danger']
        if(!devices){
            devices=this.state.devices;
        }
        devices=devices.map((dev)=>{

            if(this.props.min>(0-1) && this.props.min>(0-1)){
                if(dev.ip>=this.props.max || dev.ip<this.props.min)
               return null;
            }
//  Uncomment if you wish the assessment state and number of devices to be made up randomly in a demo. 
            // else if(Math.random()<0.3) return null;
//            dev.state=states[Math.floor(Math.random()*3)];
            return dev;
        }).filter((dev)=>dev)
        return devices // If you want to remix the order of devices displayed in a demo then change this to "return this.shuffle(devices)"
    }
    count(state){
        const devices=this.state.devices;
        let count=0;
        devices.forEach((dev)=>{
            if(dev.state==state) count+=1;
        })
        return count
    }
    addData(){
        const db=database();
        db.ref().child('devices').set([
            {
                type:'ai',
                ip:1,
                mac:'00:0a:95:9d:68:16',
                name:'Alexa',
                test:'General',
                danger:'Public Access Granted',
                warning:'Stores Personel data'
            },{
                type:'speaker',
                ip:2,
                mac:'00:0a:95:9d:64:27',
                name:'Google Home',
                test:'General',
                danger:'Token Expired',
                warning:'Deprecated System'
            },{
                type:'thermostat',
                ip:3,
                mac:'00:0a:77:9d:64:54',
                name:'CC TV',
                test:'General',
                danger:'Default Password',
                warning:'Guessable Password'
            },{
                type:'camera',
                ip:4,
                mac:'00:0a:95:9g:64:27',
                name:'DSLR / SLR',
                test:'General',
                danger:'Fungus in Lens',
                warning:'Malfunctioned'
            },{
                type:'plug',
                ip:5,
                mac:'00:0a:95:9d:64:27',
                name:'plug',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'security',
                ip:6,
                mac:'00:0a:95:9d:64:27',
                name:'security',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'router',
                ip:7,
                mac:'00:0a:95:9d:64:27',
                name:'router',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'bulb',
                ip:8,
                mac:'00:0a:95:9d:64:27',
                name:'bulb',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'display',
                ip:9,
                mac:'00:0a:95:9d:64:27',
                name:'display',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'bell',
                ip:10,
                mac:'00:0a:95:9d:64:27',
                name:'bell',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'lock',
                ip:11,
                mac:'00:0a:95:9d:64:27',
                name:'lock',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            },{
                type:'other',
                ip:12,
                mac:'00:0a:95:9d:64:27',
                name:'Robot',
                test:'General',
                danger:'Not Responding',
                warning:'Weak Data Security Rules'
            }
        ]);
    }
    render(){
        return (
        <Container>
            <br/><br/>
            { this.state.processing?<div className='flex-container' style={{width:"100%"}}>           
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
                <span style={{margin:'15px'}}>
                    <h3>Scanning...</h3>
                </span>
            </div>:
                this.state.devices.length>0?<Row>
                    <Col lg='9' sm='8'>
                        <Table responsive title='Found Devices' striped>
                        <thead>
                            <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>MAC Address</th>
                            <th>IP Address</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.devices.map((dev,i)=>
                                    <tr>
                                    <td><GetState {...dev} message={dev.message}/></td>
                                    <td><Icon type={dev.type}/></td>
                                    <td>{dev.name}</td>
                                    <td>{dev.mac}</td>
                                    <td>{dev.ipv4}</td>
                                    <td>
                                    {dev.state=='safe'?<Button style={{cursor:'not-allowed'}} disabled variant='success'>
                                        <TiTick/> Resolve
                                    </Button>:<Button onClick={()=>{
                                        let {devices}=this.state;
                                        devices[i].state='safe';
                                        this.setState({devices});
                                        Swal.fire('Successfully Resolved '+devices[i].name+'.', devices[i].name+" is now Safe.", 'success')
                                        }} variant='success'>
                                        <TiTick/> Resolve
                                    </Button>}
                                    </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        </Table>
                        <Button  onClick={()=>{
                            let {devices}=this.state;
                            devices=devices.map(dev=>{dev.state='safe';return dev;})
                            this.setState({devices});
                            Swal.fire('Successfully Resolved Vulnerabilities.', "You are now Safe.", 'success')
                            }} variant='success' style={{fontSize:'20px',margin:'5px'}}>
                            Resolve All
                        </Button>
                    </Col>
                    <Col lg='3' sm='4'>
                    <Card style={{boxShadow:'2px 3px 10px grey'}}>
                        <Card.Body>
                        <PieChart
                            animate
                            data={[
                                { title: 'Safe', value: this.count('safe'), color: 'green' },
                                { title: 'Warning', value:this.count('warn'), color: '#ffb300' },
                                { title: 'Danger', value:this.count('danger'), color: 'red' },
                            ]}
                            radius={PieChart.defaultProps.radius - 6}
                            segmentsShift={(index) => (index === this.state.selected ? 6 : 1)}
                            label={({ dataEntry }) => dataEntry.value>0?dataEntry.title:''}
                            lineWidth={60}
                            segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                            labelPosition={70}
                            labelStyle={{color:"white !important",fontSize:"8px"}}
                            onClick={(_, index) => {
                                this.setState({selected:index === this.state.selected ? undefined : index});
                            }}
                        />
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>:<div className='flex-container'><h1 style={{color:'red'}}>No Devices Found</h1></div>
            }
            {/* <div onClick={()=>{this.addData()}}>Add</div> */}
        </Container>
        )
    }
}
export default DeviceList;