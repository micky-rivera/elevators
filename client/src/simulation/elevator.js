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

        let result = [];
        let direction = '';

        const upDirectionCalls = [];
        const downDirectionCalls = [];
        this.pendingCalls.forEach(call => {
            if (convertToYValue(call.origin) < this.y) {
                upDirectionCalls.push(call);
            } else {
                downDirectionCalls.push(call);
            }
        });
        this.takenCalls.forEach(call => {
            if (convertToYValue(call.destination) < this.y) {
                upDirectionCalls.push(call);
            } else {
                downDirectionCalls.push(call);
            }
        });

        if (upDirectionCalls.length > 0) {
            direction = 'up';
            result = upDirectionCalls;
        } else {
            direction = 'down';
            result = downDirectionCalls;
        }

        let sameRoute = [];
        let oppositeRoute = [];
        result.forEach(call => {
            if (direction === call.direction) {
                sameRoute.push(call);
            } else {
                oppositeRoute.push(call);
            }
        })

        sameRoute = sameRoute.map(call => {
            if (this.takenCalls.includes(call)) {
                return convertToYValue(call.destination);
            } else {
                return convertToYValue(call.origin);
            }
        });
        oppositeRoute = oppositeRoute.map(call => {
            if (this.takenCalls.includes(call)) {
                return convertToYValue(call.destination);
            } else {
                return convertToYValue(call.origin);
            }
        });

        result = [...sameRoute, ...oppositeRoute];

        result = result.sort((a,b) => {
            if (direction === 'up') {
                return b-a;
            } else {
                return a-b;
            }
        });
        
        this.destinations = result;
    }

    updateCalls() {
        const pendingMatches = this.pendingCalls.filter(call => convertToYValue(call.origin) === this.destinationFloor);
        const takenMatches = this.takenCalls.filter(call => convertToYValue(call.destination) === this.destinationFloor);

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
                const destinationYValue = this.destinationFloor;
                
                if (this.y < destinationYValue) {
                    this.y = this.y + 0.25;
                    this.direction = 'down';
                }
                if (this.y > destinationYValue) {
                    this.y = this.y - 0.25;
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
