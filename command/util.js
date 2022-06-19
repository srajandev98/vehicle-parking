const _ = require('lodash');

module.exports = {
    "create_parking_lot": {
        "doc": "Create slots",
        "argNames": ["numberOfslots"],
        "argIndexes": [1],
        "func": (parkingDB, { numberOfslots }) => {
            for(let slot = 1; slot <= numberOfslots; slot++) {
                // Initialize slot
                parkingDB[slot] = {
                    occupied: false
                };
            }

            console.info(`Created parking of ${numberOfslots} slots`);

            return { parkingDB };
        }
    },
    "park": {
        "doc": "Vehicle Registration Number & Driver Age",
        "argNames": ["vehicleRegNumber", "driverAge"],
        "argIndexes": [1, 3],
        "func": (parkingDB, { vehicleRegNumber, driverAge }) => {
            const index = _.findIndex(Object.entries(parkingDB), (slotData) => {
                return !slotData[1].occupied;
            }, 0);
            const slot = index+1;

            if (slot === -1) {
                console.error('No Slots Left');
            } else {
                // this slot is now occupied
                parkingDB[slot].occupied = true;

                // fill details
                parkingDB[slot].vehicleRegNumber = vehicleRegNumber;
                parkingDB[slot].driverAge = driverAge;
                parkingDB[slot].slotNumber = slot;

                console.info(`Car with vehicle registration number "${vehicleRegNumber.toUpperCase()}" has been parked at slot number ${slot}`);
            }

            return { parkingDB };
        }
    },
    "slot_numbers_for_driver_of_age": {
        "doc": "Return slot numbers (comma-separated) of all drivers of that age",
        "argNames": ["driverAge"],
        "argIndexes": [1],
        "func": (parkingDB, { driverAge }) => {
            let slotNumbers = [];
            Object.keys(parkingDB).forEach(slot => {
                if(parkingDB[slot].occupied && Number(parkingDB[slot].driverAge) === Number(driverAge)) {
                    slotNumbers.push(slot);
                }
            });

            if(!_.isEmpty(slotNumbers)) {
                console.info(slotNumbers.join(','));
            } else {
                console.error('No such slots found');
            }

            return { parkingDB };
        }
    },
    "slot_number_for_car_with_number": {
        "doc": "Return slot number of car with registration number",
        "argNames": ["vehicleRegNumber"],
        "argIndexes": [1],
        "func": (parkingDB, { vehicleRegNumber }) => {
            const slotForRegNumber = _.find(Object.entries(parkingDB), (vehicleSlot, slot) => {
                return vehicleSlot[1].occupied && 
                    String(vehicleSlot[1].vehicleRegNumber.toLowerCase()) === String(vehicleRegNumber.toLowerCase());
            });

            if(!slotForRegNumber || _.isEmpty(slotForRegNumber)) {
                console.error('No such slot found');
            } else {
                console.info(slotForRegNumber[1].slotNumber);
            }

            return { parkingDB };
        }
    },
    "leave": {
        "doc": "Vacate that slot number from the parking lot",
        "argNames": ["slotToVacate"],
        "argIndexes": [1],
        "func": (parkingDB, { slotToVacate }) => {
            if(!parkingDB[slotToVacate].occupied) {
                console.error('Slot already vacated');
            } else {
                const tempSlotDetails = parkingDB[slotToVacate];

                // Slot vacated
                parkingDB[slotToVacate] = {
                    occupied: false
                };

                console.info(`Slot number ${slotToVacate} vacated, the car with vehicle registration number "${tempSlotDetails.vehicleRegNumber.toUpperCase()}" left the space, the driver of the car was of age ${tempSlotDetails.driverAge}`)
            }

            return { parkingDB };
        }
    },
    "vehicle_registration_number_for_driver_of_age": {
        "doc": "Get all parked vehicle reg. numbers of that driver age",
        "argNames": ["driverAge"],
        "argIndexes": [1],
        "func": (parkingDB, { driverAge }) => {
            const vehicleSlots = _.filter(Object.entries(parkingDB), (vehicleSlot) => {
                return vehicleSlot[1].occupied && vehicleSlot[1].driverAge === driverAge;
            });

            if(!vehicleSlots || _.isEmpty(vehicleSlots)) {
                console.error('No such Vehicle Registration Number(s) Found');
            } else {
                const commaSeparatedRegNumbers = _.map(vehicleSlots, (vehSlot) => { return vehSlot[1].vehicleRegNumber.toUpperCase(); })
                console.info(commaSeparatedRegNumbers.join(','));
            }

            return { parkingDB };
        }
    }
}