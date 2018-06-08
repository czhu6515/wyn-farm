import React, { Component } from 'react';
import {padNum} from './World';
import Block from './Block';
import '../css/Row.css';

class Row extends Component {
    constructor(props){
        super(props);
        this.makeRows(props);

    }
    componentDidUpdate(){
        // console.log(this.props.data.player);
        this.makeRows(this.props);
    }
    makeRows(props){
        // console.log(props);
        let size = props.data.world.size;
        this.these_blocks = []
        for (let i = 0; i<= size; i++){
            if(props.rowNum+padNum(i) === props.data.player.location){
                this.these_blocks.push(<Block type="player" data={props.data} blockID={`${this.props.rowNum}` + `${padNum(i)}`}/>);
            } else {
            this.these_blocks.push(<Block type="" data={props.data} blockID={`${this.props.rowNum}` + `${padNum(i)}`}/>);
            }
        }
        // console.log(this.these_blocks);
    }
    render(){
        return(
            <div className={this.props.styleName}>
                {this.these_blocks}
            </div>
        );
    }
}

export default Row;

// row.forEach((block, j) =>{
//     <Block className={block.location} />
//   });