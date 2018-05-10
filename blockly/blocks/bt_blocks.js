Blockly.defineBlocksWithJsonArray([{
  "type": "preconditionvaluecheck",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "Operand1"
    },
    {
      "type": "field_dropdown",
      "name": "Operator",
      "options": [
        [
          "=",
          "="
        ],
        [
          ">",
          ">"
        ],
        [
          "<",
          "<"
        ],
        [
          ">=",
          ">="
        ],
        [
          "<=",
          "<="
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "Operand2"
    }
  ],
  "inputsInline": true,
  "output": "Precondition",
  "colour": 230,
  "tooltip": "Precondition Value Check",
  "helpUrl": ""
},
{
  "type": "preconditionexpressioncheck",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "Operand1",
      "check": "Precondition"
    },
    {
      "type": "field_dropdown",
      "name": "Operator",
      "options": [
        [
          "and",
          "and"
        ],
        [
          "or",
          "or"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "Operand2",
      "check": "Precondition"
    }
  ],
  "inputsInline": true,
  "output": "Precondition",
  "colour": 230,
  "tooltip": "Precondition Expression Check",
  "helpUrl": ""
},
{
  "type": "preconditionnot",
  "message0": "not %1",
  "args0": [
    {
      "type": "input_value",
      "name": "argumentPrecondition",
      "check": "Precondition"
    }
  ],
  "inputsInline": false,
  "output": "Precondition",
  "colour": 230,
  "tooltip": "Precondition Negation",
  "helpUrl": ""
},
{
  "type": "preconditionbool",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "bool",
      "options": [
        [
          "true",
          "true"
        ],
        [
          "false",
          "false"
        ]
      ]
    }
  ],
  "inputsInline": false,
  "output": "Precondition",
  "colour": 230,
  "tooltip": "Precondition Boolean",
  "helpUrl": ""
},
{
  "type": "action",
  "message0": "Precondition %1 Effects %2 Ticks %3",
  "args0": [
    {
      "type": "input_value",
      "name": "Precondition",
      "check": "Precondition"
    },
    {
      "type": "input_statement",
      "name": "Effect"
    },
    {
      "type": "field_input",
      "name": "TicksRequired",
      "text": "1"
    }
  ],
  "inputsInline": false,
  "previousStatement": "Tick",
  "nextStatement": "Tick",
  "colour": 0,
  "tooltip": "Action",
  "helpUrl": ""
},
{
  "type": "sequence",
  "message0": "Sequence %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "Ticks",
      "check": "Tick"
    }
  ],
  "previousStatement": "Tick",
  "nextStatement": "Tick",
  "colour": 315,
  "tooltip": "Sequence",
  "helpUrl": ""
},
{
  "type": "selector",
  "message0": "Selector %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "Ticks",
      "check": "Tick"
    }
  ],
  "previousStatement": "Tick",
  "nextStatement": "Tick",
  "colour": 90,
  "tooltip": "Selector",
  "helpUrl": ""
},
{
  "type": "guard",
  "message0": "Precondition %1 Run %2",
  "args0": [
    {
      "type": "input_value",
      "name": "Precondition",
      "check": "Precondition"
    },
    {
      "type": "input_statement",
      "name": "RunTick",
      "check": "Tick"
    }
  ],
  "previousStatement": "Tick",
  "nextStatement": "Tick",
  "colour": 45,
  "tooltip": "Guard",
  "helpUrl": ""
},
{
  "type": "adduserinteractiontree",
  "message0": "User Interaction Tree %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "USERTREE",
      "check": "Tick"
    }
  ],
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "displaydescriptionaction",
  "message0": "Description %1",
  "args0": [
    {
      "type": "input_value",
      "name": "DESCRIPTIONACTION",
      "check": "String"
    }
  ],
  "previousStatement": "Tick",
  "nextStatement": "Tick",
  "colour": 30,
  "tooltip": "This is an \"action\"",
  "helpUrl": ""
},
{
  "type": "adduseractiontree",
  "message0": "User action text %1 Effect behavior tree %2",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    },
    {
      "type": "input_statement",
      "name": "TREE",
      "check": "Tick"
    }
  ],
  "previousStatement": "Tick",
  "nextStatement": "Tick",
  "colour": 30,
  "tooltip": "Add only one behavior tree node!",
  "helpUrl": ""
},
{
  "type": "displayactioneffecttext",
  "message0": "Effect text %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 315,
  "tooltip": "",
  "helpUrl": ""
}
]);