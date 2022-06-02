class Elevator {
    constructor(config) {
        this.elevatorList = [];
        this.calls = [];
        this.x = 30;
        this.y = 0;
        this.currentFloor = this.y * 25;
        this.destinationFloor = 8;
        this.isIdle = true;
        this.direction = 'up';
    }

    addCall(call) {
        console.log('I got a call');
        this.calls.push(call);
    }

    move() {
        if (this.currentFloor !== this.destinationFloor) {
            this.isIdle = false;
            if (this.y < this.destinationFloor * 25) {
                this.y++;
                this.direction = 'down';
            }
            if (this.y > this.destinationFloor * 25) {
                this.y--;
                this.direction = 'up';
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

    init() {
        console.log('elevator initialized');
    }
}

export default Elevator;
