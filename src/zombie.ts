import {action, execute, neg_guard, Precondition, selector, sequence, Status, Tick} from "./scripting";

/*----------- ZOMBIE ESCAPE!!! -------------------*/

var world = {};
var blackboard: any = {};
//initial state
world["connected"] = {
    "Back": ["Warehouse"],
    "Warehouse": ["Back", "Entrance"],
    "Entrance": ["Warehouse", "Side", "Front"],
    "Side": ["Entrance"],
    "Front": ["Entrance"]
};

world["at"] = {
    "Player": "Warehouse",
    "Stranger": "Entrance",
    "Zombie": "Back",
    "Motorcycle": "Side",
    "Car": "Front",
    "Gate": "Front",
    "Brick": "Car"
};

world["status"] = {
    "Player": ["alive"],
    "Stranger": ["alive"],
    "Gate": ["closed"]
};

world["has"] = {
    "Stranger": ["Gas", "Rope"]
};

function goalState() {
    return world["escape"] === ["Player", "Stranger"];
}

let canEat: Precondition = (params) => {
    return world["at"][params.agent] === world["at"]["Stranger"]
        || world["at"][params.agent] === world["at"]["Player"]
}
let eat: (params: any) => Tick = (params) => action(
    canEat,
    (params) => {
        console.log("Game Over!")
    },
    params,
    0
)

let move: (params: any) => Tick = (params) =>
    action(
        (params) => {
            var agent = params.agent;
            var currentLocation = world["at"][agent];
            var destination = params.location;
            return currentLocation === destination
                || world["connected"][currentLocation].includes(destination);
        },
        (params) => {
            console.log(params.agent + " moves to " + params.location);
            world["at"][params.agent] = params.location;
        },
        params
    );
let getIn: (params: any) => Tick = (params) =>
    action(
        (params) => world["at"][params.agent] === world["at"][params.vehicle],
        (params) => world["at"][params.agent] = params.vehicle,
        params,
        0
    );
let escape: (params: any) => Tick = (params) =>
    action(
        (params) => world["at"][params.agent] == params.vehicle,
        (params) => world["status"][params.agent].push("escaping"),
        params,
        0
    )
;
let jumpOn: (params: any) => Tick = (params) =>
    action(
        (params) => world["at"][params.driver] == params.vehicle
            && world["at"][params.vehicle] == world["at"][params.agent]
            && world["status"][params.driver].includes("escaping")
        ,
        (params) => world["at"][params.agent] = params.vehicle,
        params
    );

//zombie tree
let zombieTick = selector([
    neg_guard(canEat, {},
        sequence([
            move({location: "Warehouse"}),
            move({location: "Entrance"})
        ])
    ),
    eat({})
]);

//player tree
let playerTick = sequence([
    move({location: "Entrance"}),
    move({location: "Side"}),
    jumpOn({driver: "Stranger", vehicle: "Motorcycle"}),
    escape({vehicle: "Motorcycle"})
]);

//stranger tree
let strangerTick = sequence([
    move({location: "Side"}),
    getIn({vehicle: "Motorcycle"}),
    escape({vehicle: "Motorcycle"})
]);

var playerTickStatus = Status.RUNNING,
    strangerTickStatus = Status.RUNNING,
    zombieTickStatus = Status.RUNNING;

function worldTick() {
    if (playerTickStatus != Status.SUCCESS)
        playerTickStatus = execute(playerTick, "Player", blackboard);
    if (strangerTickStatus != Status.SUCCESS)
        strangerTickStatus = execute(strangerTick, "Stranger", blackboard);
    if (zombieTickStatus != Status.SUCCESS)
        zombieTickStatus = execute(zombieTick, "Zombie", blackboard);
}


/*----------- RENDERING -------------------*/
var canvas = <HTMLCanvasElement> document.getElementById('display');
var context = canvas.getContext('2d');
var coords = {
    "Back": {x: 800, y: 20},
    "Warehouse": {x: 800, y: 220},
    "Entrance": {x: 800, y: 420},
    "Front": {x: 1000, y: 620},
    "Side": {x: 300, y: 620},
    "Motorcycle": {x: 150, y: 820}
}

canvas.addEventListener("click", this.worldTick.bind(this), false);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var map = new Image();
    map.src = "images/zombiemap.png";
    context.drawImage(map, 0, 0, 1185, 825);

    var motorcycle = new Image();
    motorcycle.src = "images/motorcycle.png";
    var mc = coords["Motorcycle"];
    context.drawImage(motorcycle, mc.x, mc.y, 170, 150);

    var stranger = new Image();
    stranger.src = "images/stranger.png";
    var sc = coords[world["at"]["Stranger"]];
    context.drawImage(stranger, sc.x, sc.y, 150, 130);

    var player = new Image();
    player.src = "images/player.png";
    var pc = coords[world["at"]["Player"]];
    context.drawImage(player, pc.x, pc.y, 150, 130);

    var zombie = new Image();
    zombie.src = "images/zombie.png";
    var zc = coords[world["at"]["Zombie"]];
    context.drawImage(zombie, zc.x, zc.y, 150, 130);
}

setInterval(render, 30);