/* /// <reference path="scripting.ts"/> */
import {
    addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
    getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
    isVariableNotSet, displayDescriptionAction, userAction, addUserInteractionTree, initialize,
    getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
    displayActionEffectText, areAdjacent
} from "./scripting";
import {isUndefined} from "typescript-collections/dist/lib/util";

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
var crewCard1 = addItem("Crew card1");
var crewCard2 = addItem("Crew card2");
setItemVariable(crewCard1, "currentLocation", LAB);
setItemVariable(crewCard2, "currentLocation", MEDICAL);

// variables
//alien
setAgentVariable(alien, "currentLocation", COCKPIT);
//player
var playerLocation = setVariable("playerLocation", START);
var crewCardsCollected = setVariable("crewCardsCollected", 0);

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
    () => {
        setAgentVariable(alien, "currentLocation", getNextLocation(getAgentVariable(alien, "currentLocation"), getVariable("destination")));
        console.log("Alien is at: " + getAgentVariable(alien, "currentLocation"))
    },
    {}, 0
);

let eatPlayer = action(() => getAgentVariable(alien, "currentLocation") == getVariable(playerLocation),
    () => {
        setVariable("endGame", "lose");
        setVariable(playerLocation, "NA");
    }, {}, 0
);

/*let search = selector([
    eatPlayer,
    sequence([
        selector([
            guard(setDestinationPrecond, {}, setNextDestination),
            action(() => true, () => {
            }, {}, 0)
        ]),
        gotoNextLocation,
        eatPlayer
    ])
]);*/

let search = sequence([
        selector([
            guard(setDestinationPrecond, {}, setNextDestination),
            action(() => true, () => {
            }, {}, 0)
        ]),
        gotoNextLocation,
    ]);

let alienBT = selector([
    eatPlayer,
    sequence([
        search, eatPlayer
    ])
]);

attachTreeToAgent(alien, alienBT);

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
            userAction("Go forward to enter the corridor", () => setVariable(playerLocation, BC_CORRIDOR)),
            userAction("Stay where you are.", () => {})
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
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(bcStateBT);
var brStateBT = guard(() => getVariable(playerLocation) == BR_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Enter the staff quarters", () => setVariable(playerLocation, QUARTERS1)),
            userAction("Move north in the corridor", () => setVariable(playerLocation, MR_CORRIDOR)),
            userAction("Head west in the corridor", () => setVariable(playerLocation, BC_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(brStateBT);
var quarters1BT = guard(() => getVariable(playerLocation) == QUARTERS1, {},
    sequence([
            displayDescriptionAction("You enter the staff quarters."),
            userAction("Exit the staff quarters", () => setVariable(playerLocation, BR_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(quarters1BT);
var mrStateBT = guard(() => getVariable(playerLocation) == MR_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Enter the captain's quarters on the east", () => setVariable(playerLocation, QUARTERS2)),
            userAction("Enter the medical room on the west", () => setVariable(playerLocation, MEDICAL)),
            userAction("Move north in the corridor", () => setVariable(playerLocation, TR_CORRIDOR)),
            userAction("Move south in the corridor", () => setVariable(playerLocation, BR_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(mrStateBT);
var quarters2BT = guard(() => getVariable(playerLocation) == QUARTERS2, {},
    sequence([
            displayDescriptionAction("You enter the captain's quarters."),
            userAction("Exit the captain's quarters", () => setVariable(playerLocation, MR_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(quarters2BT);
var medicalBT = guard(() => getVariable(playerLocation) == MEDICAL, {},
    sequence([
            displayDescriptionAction("You enter the medical room."),
            userAction("Exit to the north", () => setVariable(playerLocation, TC_CORRIDOR)),
            userAction("Exit to the east", () => setVariable(playerLocation, MR_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(medicalBT);
var labBT = guard(() => getVariable(playerLocation) == LAB, {},
    sequence([
            displayDescriptionAction("You enter the lab."),
            userAction("Exit the lab", () => setVariable(playerLocation, BC_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(labBT);
var trStateBT = guard(() => getVariable(playerLocation) == TR_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Move to the west", () => setVariable(playerLocation, TC_CORRIDOR)),
            userAction("Move to the south", () => setVariable(playerLocation, MR_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(trStateBT);
var tcStateBT = guard(() => getVariable(playerLocation) == TC_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Move to the west", () => setVariable(playerLocation, TL_CORRIDOR)),
            userAction("Enter the medical room", () => setVariable(playerLocation, MEDICAL)),
            userAction("Move towards the elevator", () => setVariable(playerLocation, EXIT_ELEVATOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(tcStateBT);
var elevatorBT = guard(() => getVariable(playerLocation) == EXIT_ELEVATOR, {},
    sequence([
            displayDescriptionAction("You reach the exit elevator."),
            selector([
                guard(() => getVariable(crewCardsCollected) >= 2, {},
                    sequence([
                        displayDescriptionAction("You can now activate the exit and flee!"),
                        userAction("Activate and get out!", () => {
                            setVariable("endGame", "win");
                            setVariable(playerLocation, "NA")
                        })
                    ])),
                displayDescriptionAction("You need 2 crew cards to activate the exit elevator system.")
            ]),
            userAction("Move back in the corridor", () => setVariable(playerLocation, TC_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(elevatorBT);
var tlStateBT = guard(() => getVariable(playerLocation) == TL_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Enter the engines room to the north", () => setVariable(playerLocation, ENGINES)),
            userAction("Enter the communications room to the east", () => setVariable(playerLocation, COMMS)),
            userAction("Move to the east in the corridor", () => setVariable(playerLocation, TC_CORRIDOR)),
            userAction("Move to the south", () => setVariable(playerLocation, ML_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(tlStateBT);
var blStateBT = guard(() => getVariable(playerLocation) == BL_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Move to the north in the corridor", () => setVariable(playerLocation, ML_CORRIDOR)),
            userAction("Move to the east in the corridor", () => setVariable(playerLocation, BC_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(blStateBT);
var mlStateBT = guard(() => getVariable(playerLocation) == ML_CORRIDOR, {},
    sequence([
            displayDescriptionAction("You move forward in the corridor."),
            userAction("Enter the storage room", () => setVariable(playerLocation, STORAGE)),
            userAction("Move to the north in the corridor", () => setVariable(playerLocation, TL_CORRIDOR)),
            userAction("Move to the south", () => setVariable(playerLocation, BL_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(mlStateBT);
var storageBT = guard(() => getVariable(playerLocation) == STORAGE, {},
    sequence([
            displayDescriptionAction("You enter the storage."),
            userAction("Exit the storage room", () => setVariable(playerLocation, ML_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(storageBT);
var commsBT = guard(() => getVariable(playerLocation) == COMMS, {},
    sequence([
            displayDescriptionAction("You enter the communications room."),
            userAction("Enter the cockpit", () => setVariable(playerLocation, COCKPIT)),
            userAction("Exit the communications room into the corridor", () => setVariable(playerLocation, TL_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(commsBT);
var cockpitBT = guard(() => getVariable(playerLocation) == COCKPIT, {},
    sequence([
            displayDescriptionAction("You enter the cockpit."),
            userAction("Enter the engines room to the east", () => setVariable(playerLocation, ENGINES)),
            userAction("Enter the communications room to the south", () => setVariable(playerLocation, COMMS)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(cockpitBT);
var enginesBT = guard(() => getVariable(playerLocation) == ENGINES, {},
    sequence([
            displayDescriptionAction("You enter the engines room."),
            userAction("Enter the cockpit to the east", () => setVariable(playerLocation, COCKPIT)),
            userAction("Enter the corridor to the south", () => setVariable(playerLocation, TL_CORRIDOR)),
            userAction("Stay where you are.", () => {})
        ]
    ));
addUserInteractionTree(enginesBT);

var crewCard1BT = guard(() => getVariable(playerLocation) == getItemVariable(crewCard1, "currentLocation"), {},
    sequence([
            displayDescriptionAction("You notice a crew card lying around."),
            userAction("Pick up the crew card", () => {
                console.log("pickedup");
                displayActionEffectText("You pick up the crew card.");
                setItemVariable(crewCard1, "currentLocation", "player");
                setVariable(crewCardsCollected, getVariable(crewCardsCollected) + 1);
            })
        ]
    ));
var crewCard2BT = guard(() => getVariable(playerLocation) == getItemVariable(crewCard2, "currentLocation"), {},
    sequence([
            displayDescriptionAction("You notice a crew card lying around."),
            userAction("Pick up the crew card", () => {
                console.log("pickedup");
                displayActionEffectText("You pick up the crew card.");
                setItemVariable(crewCard2, "currentLocation", "player");
                setVariable(crewCardsCollected, getVariable(crewCardsCollected) + 1);
            })
        ]
    ));
addUserInteractionTree(crewCard1BT);
addUserInteractionTree(crewCard2BT);

var alienNearby = guard(() => areAdjacent(getVariable(playerLocation), getAgentVariable(alien, "currentLocation")), {},
    displayDescriptionAction("You hear a thumping sound. The alien is nearby."));
addUserInteractionTree(alienNearby);

var gameOver = guard(() => getVariable(playerLocation) == "NA", {},
    selector([
            guard(() => getVariable("endGame") == "win", {},
                displayDescriptionAction("You have managed to escape!")),
            guard(() => getVariable("endGame") == "lose", {},
                displayDescriptionAction("The creature grabs you before you can react! You struggle for a bit before realising it's all over.."))
        ]
    ));
addUserInteractionTree(gameOver);


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
var alienImage = new Image();

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    displayPlayer();
    displayAlien();
    displayTextAndActions();
}

var mapPositions = {
    "START": {x: 230, y: 235},
    "BC_CORRIDOR": {x: 240, y: 210},
    "BR_CORRIDOR": {x: 300, y: 190},
    "MR_CORRIDOR": {x: 305, y: 150},
    "QUARTERS2": {x: 340, y: 155},
    "QUARTERS1": {x: 340, y: 190},
    "TR_CORRIDOR": {x: 300, y: 100},
    "TC_CORRIDOR": {x: 230, y: 100},
    "TL_CORRIDOR": {x: 170, y: 100},
    "EXIT_ELEVATOR": {x: 230, y: 60},
    "LAB": {x: 240, y: 170},
    "ML_CORRIDOR": {x: 160, y: 150},
    "BL_CORRIDOR": {x: 160, y: 200},
    "ENGINES": {x: 170, y: 60},
    "COCKPIT": {x: 120, y: 60},
    "COMMS": {x: 120, y: 100},
    "MEDICAL": {x: 250, y: 130},
    "STORAGE": {x: 200, y: 150}
};

function displayPlayer() {
    var currLocation = getVariable(playerLocation);
    if (!isUndefined(mapPositions[currLocation]))
        context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 16, 16);
}

function displayAlien() {
    var currLocation = getAgentVariable(alien, "currentLocation");
    context.drawImage(alienImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 24, 24);
}

spaceshipImage.src = "../images/isolation_map.png";
playerImage.src = "../images/player2.png";
alienImage.src = "../images/xenomorph.png";

var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 50;

function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;

    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? userInteractionObject.actionEffectsText : userInteractionObject.text;
    context.fillText(textToDisplay, textPanel.x, textPanel.y + 20);

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
    console.log("Crew cards: " + getVariable(crewCardsCollected));
}

function displayArrow() {
    if(userInteractionObject.userActionsText.length != 0){
        context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
        context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
    }
}

//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        executeUserAction(selectedAction);
        worldTick();
        render();
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