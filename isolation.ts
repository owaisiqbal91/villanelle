/// <reference path="scripting.ts"/>

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

    console.log(locationGraph);

    // agents

    // items

    // variables

// 2. Define BTs
    // create ground actions

    // create behavior trees

// 3. Construct story
    // create user actions

    // create scenes

    // map scenes to state (could use BT?)