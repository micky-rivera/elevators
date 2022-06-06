import convertToYValue from "./utils";

class Elevator {
    constructor(config) {
        this.elevatorList = [];
        this.pendingCalls = [];
        this.takenCalls = [];
        this.destinations = [];
        this.x = config.x;
        this.y = 25;
        this.destinationFloor = 8;
        this.isIdle = true;
        this.direction = 'down';
    }

    updateDestinationsArray() {
        const upDirectionFloors = [];
        const downDirectionFloors = [];
        let result;
        this.pendingCalls.forEach(call => {
            if (convertToYValue(call.origin) < this.y) {
                upDirectionFloors.push(call.origin);
            }
            if (convertToYValue(call.origin) > this.y) {
                downDirectionFloors.push(call.origin);
            }
        });
        this.takenCalls.forEach(call => {
            if (convertToYValue(call.destination) < this.y) {
                upDirectionFloors.push(call.destination);
            }
            if (convertToYValue(call.destination) > this.y) {
                downDirectionFloors.push(call.destination);
            }
        });

        upDirectionFloors.sort((a,b) => b-a);
        downDirectionFloors.sort((a,b) => a-b);

        if (this.direction === 'up') {
            result = [...upDirectionFloors, ...downDirectionFloors];
        } else {
            result = [...downDirectionFloors, ...upDirectionFloors];
        }

        this.destinations = result;
    }

    updateCalls() {
        const pendingMatches = this.pendingCalls.filter(call => call.origin === this.destinationFloor);
        const takenMatches = this.takenCalls.filter(call => call.destination === this.destinationFloor);

        if (pendingMatches.length > 0) {
            pendingMatches.forEach(callToMove => {
                this.pendingCalls = [...this.pendingCalls].filter(call => call !== callToMove);
                this.takenCalls.push(callToMove);
            });
        }
        if (takenMatches.length > 0) {
            takenMatches.forEach(callToRemove=> {
                this.takenCalls = [...this.takenCalls].filter(call => call !== callToRemove);
            });
        }
    }

    addCall(call) {
        this.pendingCalls.push(call);
    }

    move() {
        if (this.pendingCalls.length > 0 || this.takenCalls.length > 0) {
            this.isIdle = false;
            
            if (!this.stopped) {
                this.updateDestinationsArray();
                this.destinationFloor = this.destinations[0];
                const destinationYValue = convertToYValue(this.destinationFloor)
                
                if (this.y < destinationYValue) {
                    this.y++;
                    this.direction = 'down';
                }
                if (this.y > destinationYValue) {
                    this.y--;
                    this.direction = 'up';
                }
                if (this.y === destinationYValue) {
                    this.stopped = true;
                    this.updateCalls();
                    new Promise((resolve,reject) => {
                        setTimeout(()=>{
                            this.stopped = false;
                            resolve();
                        }, 3000);
                    });
                }
            }
                
        } else {
            this.isIdle = true;
        }
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 25, 25);
        ctx.fill();
    }
}

export default Elevator;
