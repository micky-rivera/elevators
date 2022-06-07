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

    const sortedElevators = elevators.sort((a,b) => Math.abs(call.origin - a) - Math.abs(call.origin - b));
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
