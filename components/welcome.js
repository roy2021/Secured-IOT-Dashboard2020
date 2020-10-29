import { Container } from "react-bootstrap";
import React from 'react';
import { database } from 'firebase'
class Welcome extends React.Component {
    constructor(props)
	{
	    super(props);
        this.state={
            img:'/assets/dashboard.svg',
            title:'Welcome to your Secured IOT Dashboard',
            description:'hello'
        }
    }
    componentDidMount(){
        const db=database();
        db.ref().on('value',(snap)=>{
            console.log(JSON.stringify(snap.val()))
        })
        let items=db.ref().child('welcome')
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
        db.ref().child('welcome').set({
            img:'/assets/dashboard.svg',
            title:'Welcome to your Secured IOT Dashboard',
            description:'Place where you feel safe'
        })
    }
    render(){
        return <Container>
            <center>
                <img src={this.state.img} style={{maxWidth:"500px"}}/>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                {/* <div onClick={()=>{this.addData()}}>Add</div> */}
            </center>
        </Container>
    }
}
export default Welcome;