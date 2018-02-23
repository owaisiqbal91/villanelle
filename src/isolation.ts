/* /// <reference path="scripting.ts"/> */
import {
    addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
    getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
    isVariableNotSet, displayDescriptionAction, userAction, addUserInteractionTree, initialize,
    getUserInteractionObject, executeUserAction, worldTick
} from "./scripting";

// 1. Define State
// locations
var START = "START";
var BC_CORRIDOR = "BC_CORRIDOR";
var BL_CORRIDOR = "BL_CORRIDOR";
var BR_CORRIDOR = "BR_CORRIDOR";
var ML_CORRIDOR = "ML_CORRIDOR";
var TL_CORRIDOR = "TL_CORRIDOR";
var TC_CORRIDOR = "TC_CORRIDOR";
var TR_CORRIDOR = "TR_CORRIDOR";
var MR_CORRIDOR = "MR_CORRIDOR";
var LAB = "LAB";
var STORAGE = "STORAGE";
var MEDICAL = "MEDICAL";
var QUARTERS1 = "QUARTERS1";
var QUARTERS2 = "QUARTERS2";
var EXIT_ELEVATOR = "EXIT_ELEVATOR";
var ENGINES = "ENGINES";
var COCKPIT = "COCKPIT";
var COMMS = "COMMS";

addLocation(START, [BC_CORRIDOR]);
addLocation(BC_CORRIDOR, [BL_CORRIDOR, BR_CORRIDOR, LAB]);
addLocation(BL_CORRIDOR, [ML_CORRIDOR]);
addLocation(ML_CORRIDOR, [STORAGE, TL_CORRIDOR]);
addLocation(TL_CORRIDOR, [TC_CORRIDOR, ENGINES, COMMS]);
addLocation(ENGINES, [COCKPIT]);
addLocation(COCKPIT, [COMMS]);
addLocation(TC_CORRIDOR, [EXIT_ELEVATOR, MEDICAL, TR_CORRIDOR]);
addLocation(TR_CORRIDOR, [MR_CORRIDOR]);
addLocation(MR_CORRIDOR, [MEDICAL, QUARTERS2, BR_CORRIDOR]);
addLocation(BR_CORRIDOR, [QUARTERS1]);

// agents
var alien = addAgent("Alien");

// items
var crewCard = addItem("Crew card");

// variables
//alien
setAgentVariable(alien, "currentLocation", COCKPIT);
//player
var playerLocation = setVariable("playerLocation", START);

// 2. Define BTs
// create ground actions
let setRandNumber = action(
    () => true,
    () => setVariable("randNumber", getRandNumber(1, 18)),
    {}, 0
);
let chooseSTART = action(() => getVariable("randNumber") == 1, () => setVariable("destination", START), {}, 0);
let chooseBC_CORRIDOR = action(() => getVariable("randNumber") == 2, () => setVariable("destination", BC_CORRIDOR), {}, 0);
let chooseBL_CORRIDOR = action(() => getVariable("randNumber") == 3, () => setVariable("destination", BL_CORRIDOR), {}, 0);
let chooseBR_CORRIDOR = action(() => getVariable("randNumber") == 4, () => setVariable("destination", BR_CORRIDOR), {}, 0);
let chooseML_CORRIDOR = action(() => getVariable("randNumber") == 5, () => setVariable("destination", ML_CORRIDOR), {}, 0);
let chooseTL_CORRIDOR = action(() => getVariable("randNumber") == 6, () => setVariable("destination", TL_CORRIDOR), {}, 0);
let chooseTC_CORRIDOR = action(() => getVariable("randNumber") == 7, () => setVariable("destination", TC_CORRIDOR), {}, 0);
let chooseTR_CORRIDOR = action(() => getVariable("randNumber") == 8, () => setVariable("destination", TR_CORRIDOR), {}, 0);
let chooseMR_CORRIDOR = action(() => getVariable("randNumber") == 9, () => setVariable("destination", MR_CORRIDOR), {}, 0);
let chooseLAB = action(() => getVariable("randNumber") == 10, () => setVariable("destination", LAB), {}, 0);
let chooseSTORAGE = action(() => getVariable("randNumber") == 11, () => setVariable("destination", STORAGE), {}, 0);
let chooseMEDICAL = action(() => getVariable("randNumber") == 12, () => setVariable("destination", MEDICAL), {}, 0);
let chooseQUARTERS1 = action(() => getVariable("randNumber") == 13, () => setVariable("destination", QUARTERS1), {}, 0);
let chooseQUARTERS2 = action(() => getVariable("randNumber") == 14, () => setVariable("destination", QUARTERS2), {}, 0);
let chooseEXIT_ELEVATOR = action(() => getVariable("randNumber") == 15, () => setVariable("destination", EXIT_ELEVATOR), {}, 0);
let chooseENGINES = action(() => getVariable("randNumber") == 16, () => setVariable("destination", ENGINES), {}, 0);
let chooseCOCKPIT = action(() => getVariable("randNumber") == 17, () => setVariable("destination", COCKPIT), {}, 0);
let chooseCOMMS = action(() => getVariable("randNumber") == 18, () => setVariable("destination", COMMS), {}, 0);

let atDestination: Precondition = (params) => getVariable("destination") == getAgentVariable(params.agent, "currentLocation");
let setDestinationPrecond: Precondition = (params) => isVariableNotSet("destination") || atDestination(params);

// create behavior trees
let setNextDestination = sequence([
    setRandNumber,
    selector([
        chooseSTART,
        chooseBC_CORRIDOR,
        chooseBL_CORRIDOR,
        chooseBR_CORRIDOR,
        chooseML_CORRIDOR,
        chooseTL_CORRIDOR,
        chooseTC_CORRIDOR,
        chooseTR_CORRIDOR,
        chooseMR_CORRIDOR,
        chooseLAB,
        chooseSTORAGE,
        chooseMEDICAL,
        chooseQUARTERS1,
        chooseQUARTERS2,
        chooseEXIT_ELEVATOR,
        chooseENGINES,
        chooseCOCKPIT,
        chooseCOMMS
    ])
]);

let gotoNextLocation = action(
    () => true,
    () => setAgentVariable(alien, "currentLocation", getNextLocation(getAgentVariable(alien, "currentLocation"), getVariable("destination"))),
    {}, 0
);

let search = sequence([
        selector([
            guard(setDestinationPrecond, {}, setNextDestination),
            action(() => true, () => {
            }, {}, 0)
        ]),
        gotoNextLocation
    ]
);

/*var blackboard = {};
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);
console.log("Destination: " + getVariable("destination"));
console.log("Current location: " + getAgentVariable(alien, "currentLocation"));
execute(search, alien, blackboard);*/

//attach behaviour trees to agents


// 3. Construct story
// create user actions

var startStateBT = guard(() => getVariable(playerLocation) == START, {},
    sequence([
            displayDescriptionAction("You enter the docking station."),
            userAction("Go forward to enter the corridor", () => setVariable(playerLocation, BC_CORRIDOR))
        ]
    ));
addUserInteractionTree(startStateBT);
var bcStateBT = guard(() => getVariable(playerLocation) == BC_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You enter the corridor."),
            userAction("Head west in the corridor", () => setVariable(playerLocation, BL_CORRIDOR)),
            userAction("Enter the lab", () => setVariable(playerLocation, LAB)),
            userAction("Head east in the corridor", () => setVariable(playerLocation, BR_CORRIDOR)),
            userAction("Go back to the start", () => setVariable(playerLocation, START)),
        ]
    ));
addUserInteractionTree(bcStateBT);
var brStateBT = guard(() => getVariable(playerLocation) == BR_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move to the east in the corridor."),
            userAction("Enter the staff quarters", () => setVariable(playerLocation, QUARTERS1)),
            userAction("Move north in the corridor", () => setVariable(playerLocation, MR_CORRIDOR)),
            userAction("Head west in the corridor", () => setVariable(playerLocation, BC_CORRIDOR))
        ]
    ));
addUserInteractionTree(brStateBT);

// create scenes

// map scenes to state (could use BT?)

//4. Run the world
initialize();
var userInteractionObject = getUserInteractionObject();

//Rendering-----
var displayPanel = {x: 500, y: 0};
var textPanel = {x: 500, y: 350};
var actionsPanel = {x: 520, y: 425};

var canvas = <HTMLCanvasElement> document.getElementById('display');
var context = canvas.getContext('2d');

var spaceshipImage = new Image();
spaceshipImage.onload = render;
var playerImage = new Image();

function render() {
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    playerImage.onload = displayPlayer;
}
var mapPositions = {
    "START": {x: 230, y: 235},
    "BC_CORRIDOR": {x: 240, y: 210},
    "BR_CORRIDOR": {x: 300, y: 190},
    "MR_CORRIDOR": {x: 305, y: 150},
    "QUARTERS1": {x:340, y: 155},
    "QUARTERS2": {x:340, y: 190},

};
function displayPlayer() {
    var currLocation = "QUARTERS2";//getVariable(playerLocation);
    context.drawImage(playerImage, displayPanel.x+mapPositions[currLocation].x, displayPanel.y+mapPositions[currLocation].y, 16, 16);
}

spaceshipImage.src = "../images/isolation_map.png";
playerImage.src = "../images/player2.png";

var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 50;

function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;

    context.font = "20pt Calibri";
    context.fillStyle = 'white';
    context.fillText(userInteractionObject.text, textPanel.x, textPanel.y+20);

    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    for (var i = 0; i < userInteractionObject.userActionsText.length; i++) {
        var userActionText = userInteractionObject.userActionsText[i];
        context.fillText(userActionText, actionsPanel.x + 20, yOffset);
        if (i == 0) {
            currentSelection = i;
        }
        yOffset += yOffsetIncrement;
    }

    displayArrow();
}

function displayArrow() {
    context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
    context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
}

displayTextAndActions();

//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection]
        console.log(selectedAction);
        executeUserAction(selectedAction);
        worldTick();
        displayTextAndActions();
    }
}

function keyDown(e) {
    if (e.keyCode == 40) {//down
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    } else if (e.keyCode == 38) {//up
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection--;
            if (currentSelection < 0)
                currentSelection = userInteractionObject.userActionsText.length - 1;
            displayArrow();
        }
    }
}

document.addEventListener("keypress", keyPress, false);
document.addEventListener("keydown", keyDown, false);