"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* /// <reference path="scripting.ts"/> */
var scripting_1 = require("./scripting");
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
scripting_1.addLocation(START, [BC_CORRIDOR]);
scripting_1.addLocation(BC_CORRIDOR, [BL_CORRIDOR, BR_CORRIDOR, LAB]);
scripting_1.addLocation(BL_CORRIDOR, [ML_CORRIDOR]);
scripting_1.addLocation(ML_CORRIDOR, [STORAGE, TL_CORRIDOR]);
scripting_1.addLocation(TL_CORRIDOR, [TC_CORRIDOR, ENGINES, COMMS]);
scripting_1.addLocation(ENGINES, [COCKPIT]);
scripting_1.addLocation(COCKPIT, [COMMS]);
scripting_1.addLocation(TC_CORRIDOR, [EXIT_ELEVATOR, MEDICAL, TR_CORRIDOR]);
scripting_1.addLocation(TR_CORRIDOR, [MR_CORRIDOR]);
scripting_1.addLocation(MR_CORRIDOR, [MEDICAL, QUARTERS2, BR_CORRIDOR]);
scripting_1.addLocation(BR_CORRIDOR, [QUARTERS1]);
// agents
var alien = scripting_1.addAgent("Alien");
// items
var crewCard = scripting_1.addItem("Crew card");
// variables
//alien
scripting_1.setAgentVariable(alien, "currentLocation", COCKPIT);
//player
var playerLocation = scripting_1.setVariable("playerLocation", START);
// 2. Define BTs
// create ground actions
var setRandNumber = scripting_1.action(function () { return true; }, function () { return scripting_1.setVariable("randNumber", scripting_1.getRandNumber(1, 18)); }, {}, 0);
var chooseSTART = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 1; }, function () { return scripting_1.setVariable("destination", START); }, {}, 0);
var chooseBC_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 2; }, function () { return scripting_1.setVariable("destination", BC_CORRIDOR); }, {}, 0);
var chooseBL_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 3; }, function () { return scripting_1.setVariable("destination", BL_CORRIDOR); }, {}, 0);
var chooseBR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 4; }, function () { return scripting_1.setVariable("destination", BR_CORRIDOR); }, {}, 0);
var chooseML_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 5; }, function () { return scripting_1.setVariable("destination", ML_CORRIDOR); }, {}, 0);
var chooseTL_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 6; }, function () { return scripting_1.setVariable("destination", TL_CORRIDOR); }, {}, 0);
var chooseTC_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 7; }, function () { return scripting_1.setVariable("destination", TC_CORRIDOR); }, {}, 0);
var chooseTR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 8; }, function () { return scripting_1.setVariable("destination", TR_CORRIDOR); }, {}, 0);
var chooseMR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 9; }, function () { return scripting_1.setVariable("destination", MR_CORRIDOR); }, {}, 0);
var chooseLAB = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 10; }, function () { return scripting_1.setVariable("destination", LAB); }, {}, 0);
var chooseSTORAGE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 11; }, function () { return scripting_1.setVariable("destination", STORAGE); }, {}, 0);
var chooseMEDICAL = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 12; }, function () { return scripting_1.setVariable("destination", MEDICAL); }, {}, 0);
var chooseQUARTERS1 = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 13; }, function () { return scripting_1.setVariable("destination", QUARTERS1); }, {}, 0);
var chooseQUARTERS2 = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 14; }, function () { return scripting_1.setVariable("destination", QUARTERS2); }, {}, 0);
var chooseEXIT_ELEVATOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 15; }, function () { return scripting_1.setVariable("destination", EXIT_ELEVATOR); }, {}, 0);
var chooseENGINES = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 16; }, function () { return scripting_1.setVariable("destination", ENGINES); }, {}, 0);
var chooseCOCKPIT = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 17; }, function () { return scripting_1.setVariable("destination", COCKPIT); }, {}, 0);
var chooseCOMMS = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 18; }, function () { return scripting_1.setVariable("destination", COMMS); }, {}, 0);
var atDestination = function (params) { return scripting_1.getVariable("destination") == scripting_1.getAgentVariable(params.agent, "currentLocation"); };
var setDestinationPrecond = function (params) { return scripting_1.isVariableNotSet("destination") || atDestination(params); };
// create behavior trees
var setNextDestination = scripting_1.sequence([
    setRandNumber,
    scripting_1.selector([
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
var gotoNextLocation = scripting_1.action(function () { return true; }, function () { return scripting_1.setAgentVariable(alien, "currentLocation", scripting_1.getNextLocation(scripting_1.getAgentVariable(alien, "currentLocation"), scripting_1.getVariable("destination"))); }, {}, 0);
var search = scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(setDestinationPrecond, {}, setNextDestination),
        scripting_1.action(function () { return true; }, function () {
        }, {}, 0)
    ]),
    gotoNextLocation
]);
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
var startStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == START; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the docking station."),
    scripting_1.userAction("Go forward to enter the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); })
]));
scripting_1.addUserInteractionTree(startStateBT);
var bcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BC_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the corridor."),
    scripting_1.userAction("Head west in the corridor", function () { return scripting_1.setVariable(playerLocation, BL_CORRIDOR); }),
    scripting_1.userAction("Enter the lab", function () { return scripting_1.setVariable(playerLocation, LAB); }),
    scripting_1.userAction("Head east in the corridor", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.userAction("Go back to the start", function () { return scripting_1.setVariable(playerLocation, START); }),
]));
scripting_1.addUserInteractionTree(bcStateBT);
var brStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BR_CORRIDOR; }, {}, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move to the east in the corridor."),
    scripting_1.userAction("Enter the staff quarters", function () { return scripting_1.setVariable(playerLocation, QUARTERS1); }),
    scripting_1.userAction("Move north in the corridor", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.userAction("Head west in the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); })
]));
scripting_1.addUserInteractionTree(brStateBT);
// create scenes
// map scenes to state (could use BT?)
//4. Run the world
scripting_1.initialize();
var userInteractionObject = scripting_1.getUserInteractionObject();
//Rendering-----
var displayPanel = { x: 500, y: 0 };
var textPanel = { x: 500, y: 350 };
var actionsPanel = { x: 520, y: 425 };
var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
var spaceshipImage = new Image();
spaceshipImage.onload = render;
var playerImage = new Image();
function render() {
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    playerImage.onload = displayPlayer;
}
var mapPositions = {
    "START": { x: 230, y: 235 },
    "BC_CORRIDOR": { x: 240, y: 210 },
    "BR_CORRIDOR": { x: 300, y: 190 },
    "MR_CORRIDOR": { x: 305, y: 150 },
    "QUARTERS1": { x: 340, y: 155 },
    "QUARTERS2": { x: 340, y: 190 },
};
function displayPlayer() {
    var currLocation = "QUARTERS2"; //getVariable(playerLocation);
    context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 16, 16);
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
    context.fillText(userInteractionObject.text, textPanel.x, textPanel.y + 20);
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
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        console.log(selectedAction);
        scripting_1.executeUserAction(selectedAction);
        scripting_1.worldTick();
        displayTextAndActions();
    }
}
function keyDown(e) {
    if (e.keyCode == 40) {
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    }
    else if (e.keyCode == 38) {
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
//# sourceMappingURL=isolation.js.map