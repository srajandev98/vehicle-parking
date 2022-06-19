const Promise = require("bluebird");
const _ = require("lodash");
const commandUtil = require("./util");

class CommandService {
    constructor() {}

    async processCommand(initParkingDB, commandItems) {
        try {
            if(!_.isEmpty(commandItems)) {
                const mainCommand = commandItems[0];

                if(!commandUtil[mainCommand]) {
                    console.error(`Invalid Command :: ${mainCommand}`);
                } else {
                    const commandDetails = commandUtil[mainCommand];
                    const argNames = commandDetails["argNames"];
                    const argIndexes = commandDetails["argIndexes"];

                    const args = {};
                    if(!_.isEmpty(argIndexes)) {
                        argIndexes.forEach((argIndex, i) => {
                            args[`${argNames[i]}`] = commandItems[argIndex];
                        });

                        if(!_.isEmpty(args)) {
                            const { parkingDB } = commandDetails["func"](initParkingDB, args);
                            return parkingDB;
                        }
                    }
                }
            } else {
                console.error('Invalid Command');
            }
        } catch (error) {
            console.error('-------- Error in function processCommand --------');
            console.error(error);
            return Promise.reject(error);
        }
    }
}

module.exports = CommandService;