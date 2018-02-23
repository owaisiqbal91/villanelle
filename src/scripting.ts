import Queue from "typescript-collections/dist/lib/Queue";
import {isUndefined} from "typescript-collections/dist/lib/util";

export enum Status {
    RUNNING,
    SUCCESS,
    FAILURE
}

function terminateAndReturn(id: number, blackboard: any, status: Status) {
    delete blackboard[id];
    return status;
}

export type Effect = (params: any) => void
export type Precondition = (params: any) => boolean
export type Tick = (agent: string, blackboard: any) => Status
export type ActionTick = (precondition: Precondition, effect: Effect, parameters?: any, ticksRequired?: number) => Tick
/**
 * The guard tick is to add a precondition to the composite ticks
 */
export type GuardTick = (precondition: Precondition, parameters: any, astTick: Tick, negate?: boolean) => Tick
/**
 * Sequence/Selector
 */
export type CompositeTick = (astTicks: Tick[]) => Tick

function getActionTick(id: number): ActionTick {
    return (precondition, effect, parameters = {}, ticksRequired = 1) => {
        return (agent, blackboard) => {
            parameters.agent = agent;
            parameters.blackboard = blackboard;
            if (precondition(parameters)) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }

                if (blackboard[id].ticksDone > 0) {
                    blackboard[id].ticksDone--;
                    return Status.RUNNING;
                } else {
                    effect(parameters);
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                }
            } else {
                return Status.FAILURE;
            }
        }
    }
}

function getGuardTick(): GuardTick {
    return (precondition, parameters, astTick, negate = false) => {
        return (agent, blackboard) => {
            parameters.agent = agent;
            parameters.blackboard = blackboard;
            let proceed = negate ? !precondition(parameters) : precondition(parameters);
            return proceed ? execute(astTick, agent, blackboard) : Status.FAILURE;
        }
    }
}

function getSequenceTick(id: number): CompositeTick {
    return (astTicks) => {
        return (agent, blackboard) => {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }

            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex], agent, blackboard);

                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.FAILURE)
                    return terminateAndReturn(id, blackboard, Status.FAILURE);
                else if (childStatus == Status.SUCCESS)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.SUCCESS);
        }
    }
}

function getSelectorTick(id: number): CompositeTick {
    return (astTicks) => {
        return (agent, blackboard) => {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }

            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex], agent, blackboard);

                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.SUCCESS)
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                else if (childStatus == Status.FAILURE)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.FAILURE);
        }
    }
}

export function execute(astTick: Tick, agent: string, blackboard: any): Status {
    return astTick(agent, blackboard);
}

var globalIdCounter = 0;

export function action(precondition: Precondition, effect: Effect, params?: any, ticksRequired?: number): Tick {
    return getActionTick(globalIdCounter++)(precondition, effect, params, ticksRequired)
}

export function guard(precondition: Precondition, params: any, astTick: Tick): Tick {
    return getGuardTick()(precondition, params, astTick);
}

export function neg_guard(precondition: Precondition, params: any, astTick: Tick): Tick {
    return getGuardTick()(precondition, params, astTick, true);
}

/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
export function sequence(astTicks: Tick[]): Tick {
    return getSequenceTick(globalIdCounter++)(astTicks);
}

/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
export function selector(astTicks: Tick[]): Tick {
    return getSelectorTick(globalIdCounter++)(astTicks);
}


/*--------------- API --------------- */

//0. utilities
// min and max are inclusive
export function getRandNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//1. story instance

//1.1 locations
var locationGraph = {};

//add to both sides
export function addLocation(locationName: string, adjacentLocations: string[]) {
    if (locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);

    for (var i = 0; i < adjacentLocations.length; i++) {
        if (locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];

        locationGraph[adjacentLocations[i]].push(locationName);
    }
}

//pathfinding primitives
export function getNextLocation(start: string, destination: string): string {
    var visited = {};
    var previous = {};
    for (var key in locationGraph) {
        visited[key] = false;
    }
    visited[start] = true;

    var myQueue = new Queue<string>();
    myQueue.enqueue(start);

    while (!myQueue.isEmpty()) {
        var current: string = myQueue.dequeue();
        if (current === destination) {
            break;
        }
        var neighbors = locationGraph[current];

        for (var i = 0; i < neighbors.length; i++) {
            if (!visited[neighbors[i]]) {
                myQueue.enqueue(neighbors[i]);
                visited[neighbors[i]] = true;
                previous[neighbors[i]] = current;
            }
        }
    }

    var current: string = destination;
    if (current == start)
        return current;
    while (previous[current] != start) {
        current = previous[current];
    }

    return current;
}

//1.2 agents
var agents = [];

export function addAgent(agentName: string) {
    agents.push(agentName);
    return agentName;
}

//1.3 items
var items = [];

export function addItem(itemName: string) {
    items.push(itemName);
    return itemName;
}

//1.4 variables
var variables = {};
var agentVariables = {};

export function setVariable(varName: string, value: any) {
    variables[varName] = value;
    return varName;
}

export function setAgentVariable(agent: string, varName: string, value: any) {
    if (isUndefined(agentVariables[agent]))
        agentVariables[agent] = {};

    agentVariables[agent][varName] = value;
    return value;
}

export function getVariable(varName: string): any {
    if (isUndefined(variables[varName])) {
        console.log("Variable " + varName + " not set!");
        return;
    }
    return variables[varName];
}

export function getAgentVariable(agent: string, varName: string) {
    if (isUndefined(agentVariables[agent]) || isUndefined(agentVariables[agent][varName])) {
        console.log("Variable " + varName + " for agent " + agent + " not set!")
        return;
    }
    return agentVariables[agent][varName];
}

export function isVariableNotSet(varName: string): boolean {
    return isUndefined(variables[varName]);
}

export function isAgentVariableNotSet(agent: string, varName: string): boolean {
    return isUndefined(agentVariables[agent]) || isUndefined(agentVariables[agent][varName]);
}

//2
//agent-behavior tree mapping
var agentTrees = {};

export function attachTreeToAgent(agent: string, tree: Tick) {
    agentTrees[agent] = tree;
}

//3.1
//user actions
//TODO add variables to user action texts
var userInteractionObject = {
    text: "",
    userActionsText: []
}
var userInteractionTrees = [];
var userActions = {};

function runUserInteractionTrees(blackboard) {
    userInteractionObject.text = "";
    userInteractionObject.userActionsText = [];
    userActions = {};//{"Go to location X" : effect
    //TODO run the display trees
    for (var i = 0; i < userInteractionTrees.length; i++) {
        execute(userInteractionTrees[i], "interactionAgent", blackboard);
    }

    //TODO replace variables in text of description from variable set
}

function addUserAction(text: string, effect: () => any) {
    //TODO replace variables in text of user actions from variable set (this could be done via user too)
    userActions[text] = effect;
    userInteractionObject.userActionsText.push(text);
}

export let displayDescriptionAction = (text: string) =>
    action(
        () => true,
        () => userInteractionObject.text += "\n" + text, {}, 0
    );
export let userAction = (text: string, effect: () => any) =>
    action(
        () => true,
        () => addUserAction(text, effect), {}, 0
    );

export function addUserInteractionTree(tick: Tick) {
    userInteractionTrees.push(tick);
}

export function executeUserAction(text: string) {
    //execute the user action
    var userAction = userActions[text];
    userAction();
}

//4.
var blackboard = {};

export function initialize() {
    runUserInteractionTrees(blackboard);
}

export function getUserInteractionObject() {
    return userInteractionObject;
}

export function worldTick(userActionText?: string) {
    //all agent ticks
    for (var i = 0; i < agents.length; i++) {
        var tree = agentTrees[agents[i]];
        if (!isUndefined(tree)) {
            execute(tree, agents[i], blackboard);
        }
    }
    runUserInteractionTrees(blackboard);
}