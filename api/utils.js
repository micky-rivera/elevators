const assignCalls = (elevators, calls) => {
    const result = [];
    
    elevators.forEach(elevator => {
        result.push({
            elevator: elevator,
            calls: []
        });
    });
    
    calls.forEach(call => {
        const sortedElevators = elevators.sort((a,b) => Math.abs(call.origin - a) - Math.abs(call.origin - b));
        let resultElevator;
        
        sortedElevators.forEach(elevator => {
            if (elevator.isIdle) {
                resultElevator = elevator;
                elevator.isIdle = false;
                return;
            }
            if (elevator.direction === call.direction) {
                resultElevator = elevator;
                return;
            }
        });

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
