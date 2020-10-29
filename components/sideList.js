import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { database } from 'firebase'
import Link from 'next/link'

const uniqid=require('uniqid')

class List  extends React.Component {
    constructor(props)
	{
	  super(props);
	  this.state=
	  { items:[],width:1000,active:null }
    }
    componentDidMount(){
        const db=database();
        let items=db.ref().child('side-list')
        items.on('child_added',(snap)=>{
            const item= snap.val()
            const key= snap.key
            if(item)
            this.state.items.push({
                value:item,
                label:key,
                key:uniqid()
            })
            this.setState({
                items : this.state.items
            });
        })
        this.setState({
            width:window.screen.width
        })
    }
    addData(){
        const db=database();
        let items=db.ref().child('side-list').set({
            "Automatic Search":"auto",
            "Manual Search":"manual",
            "Security":"low",
            "FireWall":"wall",
            "Network Access":"net"
        })
    }
    onClickHandler(item){
        if(this.props.onChange)
        this.props.onChange(item.value)
        this.setState({active:item.key})
    }
    render(){
        return (<div style={{position:this.state.width>425?'sticky':'static',top:'0px',}}>
            <br/><br/><br/>
            {/* <div onClick={()=>{this.addData()}}>Add</div> */}
            {this.state.items.map(item=>(
                <div onClick={()=>{this.onClickHandler(item)}} className={item.key==this.state.active?"side-List-item side-List-item-active":"side-List-item"}>{item.label}</div>
            ))}
            <br/><br/><br/>
            <img src='/assets/logo.svg' style={{width:'80%', marginLeft:'10%',}}/>
        </div>)
    }
}
export default List;