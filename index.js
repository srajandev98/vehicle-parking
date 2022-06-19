const _ = require("lodash");
const fs = require("fs");
const readline = require("readline");
const CommandService = require("./command");

class VehicleParking {
    constructor(parkingDB) {
        // Stores all parking data
        this.parkingDB = parkingDB;
        this.commandService = new CommandService();
    }

    async processLineByLine() {
        const fileStream = fs.createReadStream("input.txt");

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.

            const commandItems = line ? line.toLowerCase().split(" ") : [];
            if (!_.isEmpty(commandItems)) {
                this.parkingDB = await this.commandService.processCommand(this.parkingDB, commandItems);
            }
        }
    }
}


// IIFE
(async () => {
    // Stores all parking data
    let parkingDB = {};

    const vehicleParking = new VehicleParking(parkingDB);
    await vehicleParking.processLineByLine();
})();