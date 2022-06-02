class Elevator {
    constructor(config) {
        this.elevatorList = [];
        this.x = 30;
        this.y = 0;
        this.currentFloor = this.y * 25;
        this.destinationFloor = 8;
    }

    move() {
        if (this.y < this.destinationFloor * 25) {
            this.y++;
        }
        if (this.y > this.destinationFloor * 25) {
            this.y--;
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
