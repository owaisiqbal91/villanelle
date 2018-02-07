enum Status {
    RUNNING,
    SUCCESS,
    FAILURE
}

function terminateAndReturn(id: number, blackboard: any, status: Status) {
    delete blackboard[id];
    return status;
}

type Effect = (params: any) => void
type Precondition = (params: any) => boolean
type Tick = (agent: string, blackboard: any) => Status
type ActionTick = (precondition: Precondition, effect: Effect, parameters?: any, ticksRequired?: number) => Tick
/**
 * The guard tick is to add a precondition to the composite ticks
 */
type GuardTick = (precondition: Precondition, parameters: any, astTick: Tick, negate?: boolean) => Tick
/**
 * Sequence/Selector
 */
type CompositeTick = (astTicks: Tick[]) => Tick

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
            let proceed = negate ? !precondition(parameters) : precondition;
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

function execute(astTick: Tick, agent: string, blackboard: any): Status {
    return astTick(agent, blackboard);
}

var globalIdCounter = 0;

function action(precondition: Precondition, effect: Effect, params?: any, ticksRequired?: number): Tick {
    return getActionTick(globalIdCounter++)(precondition, effect, params, ticksRequired)
}

function guard(effect: Precondition, params: any, astTick: Tick): Tick {
    return getGuardTick()(effect, params, astTick);
}

function neg_guard(effect: Precondition, params: any, astTick: Tick): Tick {
    return getGuardTick()(effect, params, astTick, true);
}

/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function sequence(astTicks: Tick[]): Tick {
    return getSequenceTick(globalIdCounter++)(astTicks);
}

/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function selector(astTicks: Tick[]): Tick {
    return getSelectorTick(globalIdCounter++)(astTicks);
}


/*--------------- API --------------- */

//story instance

var locationGraph = {};

//add to both sides
function addLocation(locationName: string, adjacentLocations: string[]){
    if(locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);

    for(var i = 0; i<adjacentLocations.length; i++){
        if(locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];

        locationGraph[adjacentLocations[i]].push(locationName);
    }
}