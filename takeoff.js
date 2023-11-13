require("colors");
let unsafeRequire = require("./utils/unsafeRequire.js");

let stub = {
    check: function () {
		console.log("Blue level checked".blue)
        return false;
    }
};

let engine = unsafeRequire("./engine", stub);
let command = unsafeRequire("./command", stub);
let radio = unsafeRequire("./radio", stub);
let satellite1 = unsafeRequire("./satellite1", stub);
let satellite2 = unsafeRequire("./satellite2", stub);


let rocket = {
    engine: engine,
    command: command,
    radio: radio,
    satellite1: satellite1,
    satellite2: satellite2
};

let checklist = {
    engine: 0,
    command: 0,
    radio: 0,
    satellite1: 0,
    satellite2: 0
};

let takeOff = function () {
    let counter = 5;
    for (let part in rocket) {
        console.log(counter + "..");
        checklist[part] = rocket[part].check();

        // S'il manque le moteur ou les commandes Crash
        if (!checklist[part] && (part === "engine" || part === "command")) {
            let crashMsg = "Crash ! " + part + " is missing !!";
            console.log(crashMsg.red);
            break;
            // S'il manque un composant optionnel
        } else if (!checklist[part]) {
            let alertMsg = "Woops ! " + part + " is missing. Do we really need it?";
            console.log(alertMsg.yellow);
        }
        counter--;
    }

    // Décollage
    if (counter === 0) {
        console.log("0.. Fire \nTaaaaakkke Oooooofffff".green);
    }
}

takeOff();
