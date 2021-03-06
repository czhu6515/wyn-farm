import React, { Component } from 'react';
import '../css/Craft.css'

class Craft extends Component {
    renderCraftable(){
        let craftables = []
        let woodCount = 0;
        this.props.playerItems.forEach((item)=>{
            if(item.name === "wood"){ woodCount = item.count }
        });
        let craftableAxes = Math.floor(woodCount / 4);
        let craftableWalls = Math.floor(woodCount / 9);
        if (craftableAxes > 0){
            craftables.push(
                <div class="craftable" onClick={() => {
                    let item = {name: "Wooden Axe", remove: {name: "wood", count: 4}};
                    this.props.craft(item)
                    }}>
                    <h6>Wooden Axe</h6>
                    <div className="craft-count">{craftableAxes}</div>
                </div>
            );
        }
        if (craftableWalls > 0){
            craftables.push(
                <div class="craftable" onClick={() => {
                    let item = {name: "wall", remove: {name: "wood", count: 9}};
                    this.props.craft(item)
                    }}>
                    <h6>Wall</h6>
                    <div className="craft-count">{craftableWalls}</div>
                </div>
            );
        }
        return craftables
    }

    render(){
        return(
            <div id="craft">
                <h4 id="craft-title">Crafting</h4>
                {this.renderCraftable()}
            </div>
        );
    }
}

export default Craft;