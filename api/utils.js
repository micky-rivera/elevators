const convertToYValue = (inputFloor) => {
    let result;
    
    const distanceFromBottom = inputFloor - 1;
    const distanceFromTop = 20 - inputFloor;

    if (distanceFromBottom > distanceFromTop) {
        result = 25 + (distanceFromTop * 25);
    } else {
        result = 500 - (distanceFromBottom * 25);
    }
    return result;
}

const findLeastBusy = (clientElevators, serverElevators) => {
    const totalCallsArray = [];
    let result;
    clientElevators.forEach(clientElevator => {
        const shallowCopy = {...clientElevator};
        const correspondingElevator = serverElevators.find(serverElevator => serverElevator.elevator.x === clientElevator.x);
        shallowCopy.pendingCalls.push(...correspondingElevator.calls);
        totalCallsArray.push(shallowCopy);
    });
    result = totalCallsArray.sort((a,b) => a.pendingCalls.length - b.pendingCalls.length)[0];
    return result;
}

const formatElevatorData = (elevators) => {
    const result = [];
    elevators.forEach(elevator => {
        result.push({
            elevator: elevator,
            calls: []
        });
    });
    return result;
}

const assignCalls = (elevators, call) => {
    const result = formatElevatorData(elevators);

    const sortedElevators = elevators.sort((a,b) => Math.abs(convertToYValue(call.origin) - a.y) - Math.abs(convertToYValue(call.origin) - b.y));
    let resultElevator;

    for (let i = 0; i < sortedElevators.length; i++) {
        const elevator = sortedElevators[i];
        if (elevator.isIdle) {
            elevator.isIdle = false;
            resultElevator = elevator;
            break;
        }
    }

    if (resultElevator === undefined) {
        for (let i = 0; i < sortedElevators.length; i++) {
            const elevator = sortedElevators[i];
            if (elevator.direction === call.direction) {
                resultElevator = elevator;
                break;
            }
        }
    }

    if (resultElevator === undefined) {
        const leastBusyElevator = findLeastBusy(elevators, result);
        resultElevator = leastBusyElevator;
    }

    return resultElevator;
};

module.exports.assignCalls = assignCalls;
