class Elevator {
    constructor(config) {
        this.elevatorList = [];
        this.x = 30;
        this.y = 20;
        this.currentFloor = 20;
        this.destinationFloor = 1;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 50, 50);
        ctx.fill();
    }

    init() {
        console.log('elevator initialized');
    }
}

export default Elevator;
