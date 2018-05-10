/* PRECONDITION */
Blockly.JavaScript['preconditionbool'] = function(block) {
  var dropdown_bool = block.getFieldValue('bool');
  var code = dropdown_bool;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['preconditionnot'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'argumentPrecondition', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '!'+value_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['preconditionexpressioncheck'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'Operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('Operator');
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'Operand2', Blockly.JavaScript.ORDER_ATOMIC);
  if(dropdown_operator === 'and')
    dropdown_operator = '&&';
  else if(dropdown_operator === 'or')
    dropdown_operator ='||';
  var code = '('+value_operand1+' '+dropdown_operator+' '+value_operand2+')';
  //code = 'function(){ return '+code+';}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['preconditionvaluecheck'] = function(block) {
  var value_operand1 = Blockly.JavaScript.valueToCode(block, 'Operand1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('Operator');
  var value_operand2 = Blockly.JavaScript.valueToCode(block, 'Operand2', Blockly.JavaScript.ORDER_ATOMIC);
  if(dropdown_operator === '=')
    dropdown_operator = '==';
  var code = '('+value_operand1+' '+dropdown_operator+' '+value_operand2+')';
  //code = 'function(){ return '+code+';}';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/* ACTION */
Blockly.JavaScript['action'] = function(block) {
  var value_precondition = Blockly.JavaScript.valueToCode(block, 'Precondition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_effect = Blockly.JavaScript.statementToCode(block, 'Effect');
  var text_ticksrequired = block.getFieldValue('TicksRequired');
  
  var precondition = '() => '+value_precondition;
  var effect = '() => { '+statements_effect+' }';

  var code = 'action('+precondition+', '+effect+', '+text_ticksrequired+');;';//<- put ;\n back here

  return code;
};

/* SEQUENCE */
Blockly.JavaScript['sequence'] = function(block) {
  var statements_ticks = Blockly.JavaScript.statementToCode(block, 'Ticks').split(";;");
  statements_ticks.pop();
  statements_ticks.join(",");
  
  var code = 'sequence(['+statements_ticks+']);;';

  return code;
};

/* SELECTOR */
Blockly.JavaScript['selector'] = function(block) {
  var statements_ticks = Blockly.JavaScript.statementToCode(block, 'Ticks').split(";;");
  statements_ticks.pop();
  statements_ticks.join(",");
  
  var code = 'selector(['+statements_ticks+']);;';

  return code;
};

/* GUARD */
Blockly.JavaScript['guard'] = function(block) {
  var value_precondition = Blockly.JavaScript.valueToCode(block, 'Precondition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_runtick = Blockly.JavaScript.statementToCode(block, 'RunTick').replace(";;", "");
  
  var precondition = '() => '+value_precondition;

  var code = 'guard('+precondition+', '+statements_runtick+');;';

  return code;
};

/* AGENTS */
Blockly.JavaScript['attachtree'] = function(block) {
  var dropdown_agentnames = block.getFieldValue('AGENTNAMES');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'TREE').replace(";;", "");
  var code = 'addAgent("'+dropdown_agentnames+'");\n';
  code += 'attachTreeToAgent("'+dropdown_agentnames+'",'+statements_name+');\n';
  return code;
};

/* USER INTERACTION */
Blockly.JavaScript['adduserinteractiontree'] = function(block) {
  var statements_usertree = Blockly.JavaScript.statementToCode(block, 'USERTREE').replace(";;", "");
  var code = 'addUserInteractionTree('+statements_usertree+');\n';
  return code;
};

Blockly.JavaScript['displaydescriptionaction'] = function(block) {
  var value_descriptionaction = Blockly.JavaScript.valueToCode(block, 'DESCRIPTIONACTION', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'displayDescriptionAction('+value_descriptionaction+');;';
  return code;
};

Blockly.JavaScript['adduseractiontree'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_tree = Blockly.JavaScript.statementToCode(block, 'TREE').replace(";;", "");
  var code = 'addUserActionTree('+value_text+','+statements_tree+');;';
  return code;
};

Blockly.JavaScript['displayactioneffecttext'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'displayActionEffectText('+value_text+');';
  return code;
};

var importText = `import {
    addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
    getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
    isVariableNotSet, displayDescriptionAction, addUserAction, addUserInteractionTree, initialize,
    getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
    displayActionEffectText, areAdjacent, addUserActionTree
} from "./scripting";
import {isUndefined} from "typescript-collections/dist/lib/util";
`


var rendering = `
var userInteractionObject = getUserInteractionObject();

//RENDERING-----
var displayPanel = {x: 500, y: 0};
var textPanel = {x: 500, y: 350};
var actionsPanel = {x: 520, y: 425};

var canvas = <HTMLCanvasElement> document.getElementById('display');
var context = canvas.getContext('2d');

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    displayTextAndActions();
}

var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 50;

function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;

    context.font = "15pt Calibri";
    context.fillStyle = 'white';
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
        if(!isUndefined(selectedAction)){
            executeUserAction(selectedAction);
            worldTick();
            render();
        }
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

initialize();
render();
`

var generateTypescriptCode = function() {
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  code = importText +"\n\n" + code;

  code += "\n"+rendering;
  try {
    console.log("Generated code");
    console.log("\n"+code);
    download("game.ts", code);
  } catch (e) {
    alert(e);
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}