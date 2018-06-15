import {padNum, locIDToArray, locArrayToLocId, mod} from './dataUtils';


const chngLocID = (worldSize, locID, type, inc) => {
    let newLoc;
    let dim;
    if (type === "vert"){dim = 0}
    else if (type === "horiz") {dim = 1}
    else { console.log("chngLocID: not a valid direction"); return false }
    newLoc = locIDToArray(locID);
    newLoc[dim] = newLoc[dim] + parseInt(inc)
    newLoc[dim] = mod(newLoc[dim],worldSize)
    newLoc = locArrayToLocId(newLoc);
    return newLoc;
};

const isAdjacent = (worldSize, locA, locB) => {
    let up = chngLocID(worldSize, locA, "vert", 1);
    let down = chngLocID(worldSize, locA, "vert", -1);
    let right = chngLocID(worldSize, locA, "horiz", 1);
    let left = chngLocID(worldSize, locA, "horiz", -1);
    if (locB === up || locB === down || locB === right || locB === left){
        return true;
    }
    return false;
}

const locHasWall = (locID, wallLocs) => {
    return wallLocs.includes(locID) ? true : false
}

const moveRandomAdjacent = (worldSize, locID, wallLocs) => {
    let directions = [["vert", 1], ["vert", -1], ["horiz", 1], ["horiz", -1]];
    let newLoc = "";
    do {
        let choice = Math.floor(Math.random()*4);
        newLoc = chngLocID(worldSize, locID, directions[choice][0], directions[choice][1]);
    } while(locHasWall(newLoc, wallLocs))
    return newLoc
}

const containsPlayer = (blockCode) => {
    try{
        if (blockCode[0] === 'x') {return true}
        else if (blockCode[0] === 'z') { return false}
    } catch(e){
        console.log('bad blockCode' + e);
        return 'bad blockCode';
    }
}

const genGaussCord = (gaussGen) => {
    let coord = []
    coord.push(Math.floor(gaussGen()));
    coord.push(Math.floor(gaussGen()));
    return coord;
}

const genPlayerInitialLoc = (gaussGen) => {
    let coord = genGaussCord(gaussGen);
    return `${padNum(coord[0])}${padNum(coord[1])}`
};

/**
 * genTreeLocs
 * @param {Function} gaussGen
 * @param {Number} total - total number of trees to spawn
 */
const genTreeLocs = (gaussGen, total) => {
    let treeLocs = []
    for (let i = 0; i <= total; i++) {
        let coord = genGaussCord(gaussGen);
        treeLocs.push(`${padNum(coord[0])}${padNum(coord[1])}`)
    }
    let trees = {locs: treeLocs}
    treeLocs.forEach((treeLoc)=>{
        trees[treeLoc] = {location: treeLoc, supply: 10};
    });
    return trees
};

/**
 * genCarrotLocs 
 * @param {Function} gaussGen 
 * @param {Number} total - total number of carrots to spawn
 */
const genCarrotLocs = (gaussGen, total) => {
    let carrotLocs = [];
    for (let i = 0; i < total; i++) {
        let coord = genGaussCord(gaussGen);
        carrotLocs.push(`${padNum(coord[0])}${padNum(coord[1])}`)
    }
    let carrots = {locs: carrotLocs};
    carrotLocs.forEach((carrotLoc)=>{
        carrots[carrotLoc] = {location: carrotLoc, supply: 3, matureDay: 0};
    });
    return carrots
}

/**
 * genCreepLocs
 * @param {Function} gaussGen 
 * @param {Number} total - total number of creeps to spawn
 */
const genCreepLocs = (gaussGen, total) => {
    let creepLocs = [];
    for (let i = 0; i < total; i++) {
        let coord = genGaussCord(gaussGen);
        creepLocs.push(`${padNum(coord[0])}${padNum(coord[1])}`)
    }
    let creeps = {locs: creepLocs};
    creepLocs.forEach((creepLoc)=>{
        creeps[creepLocs] = {location: creepLoc, health: 5};
    });
    return creeps
}


export {
    chngLocID, containsPlayer, genPlayerInitialLoc, 
    genTreeLocs, genCarrotLocs, genCreepLocs, isAdjacent,
    locHasWall, moveRandomAdjacent
};