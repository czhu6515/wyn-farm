import React, { Component } from 'react';
// import containsPlayer from '../utils/worldUtils';
import '../css/Block.css'

class Block extends Component {
    constructor(props){
        super(props);
        this.location = props.blockID
        this.block_content = this.makeBlockContent(props);
    }
    componentDidUpdate(){
        // console.log('block update');
        // console.log(this.props.type);
        this.block_content = this.makeBlockContent(this.props);
    }
    componentWillReceiveProps(newProps){
        // console.log("newProps");
        this.block_content = this.makeBlockContent(newProps);
    }

    player(){
        return(
            <div className="player">
            </div>
        );
    }

    makeBlockContent(props){
        // Render Player
        if (props.blockCode[0] === "x"){
            return(
                <div className={`block-content ${props.blockCode[1]}`}>
                    {this.player()}
                </div>
            );
        // Render Tree
        } else if (props.blockCode[1] === "33"){
            return (
                <div className="block_content tree">TREE</div>
            );
        // Else Render Grass
        } else if (props.blockCode[1] === "44") {
            return (
                <div className="block_content carrot">CARROT</div>
            );
        } else if (props.blockCode[1] === "55") {
            return (
                <div className="block_content wall">WALL</div>
            );
        } else if (props.blockCode[1] === "66") {
            return (
                <div className="block_content creep">CREEP!</div>
            );
        } else {
            return(
                <div className={`block_content ${props.blockCode[1]}`}>
                    <span></span>
                </div>
            );
        }
    }

    render(){
        return(
            <div className="block" id={this.location}>
                {this.location}
                {this.block_content}
            </div>
        );
    }
}
export default Block;