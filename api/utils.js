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

const assignCalls = (elevators, calls) => {
    const result = formatElevatorData(elevators);
    calls.forEach(call => {
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
            const leastBusyElevator = elevators.sort((a,b) => a.pendingCalls.length - b.pendingCalls.length)[0];
            resultElevator = leastBusyElevator;
        }

        const oneToChange = result.find(element => element.elevator === resultElevator);
        oneToChange.calls.push(call);
    });
    return result;
};

module.exports.assignCalls = assignCalls;
