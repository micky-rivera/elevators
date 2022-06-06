import Elevator from "./elevator";

class Environment {
    constructor(config) {
        this.elevatorList = [];
        this.calls = [];
        this.dispatchedCalls = [];
        this.element = config.element;
        this.canvas = this.element.querySelector('.env-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.image = new Image();
        this.image.onload = () => {
            this.isLoaded = true;
        }
        this.image.src = require('../background.png');
        this.numberOfElevators = config.numberOfElevators || 5;
    }

    updateNumberOfElevators(num) {
        this.numberOfElevators = num > 0 ? num : 5;
        this.elevatorList = [];
        const xOffset = ((600 / this.numberOfElevators) - 30) / 2;
        for (let i = 0; i < this.numberOfElevators; i++) {
            this.elevatorList.push(
                new Elevator({
                    element: this.element,
                    x: i * (600 / this.numberOfElevators) + xOffset
                })
            );
        }
    }

    getElevatorList() {
        return this.elevatorList;
    }

    assignCall(call, elevator) {
        const correctElevator = this.elevatorList.find(object => elevator.x === object.x);
        correctElevator.addCall(call);
    }

    mainLoop() {
        const step = () => {
            new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve();
                }, 17);
            }).then(res => step());

            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            this.isLoaded && this.ctx.drawImage(
                this.image,
                0,
                0,
                600,
                550,
                0,
                0,
                600,
                550
            );

            this.elevatorList.forEach(elevator => {
                elevator.draw(this.ctx);
                elevator.move();
            });

        }
        step();
    }

    init() {
        this.mainLoop();
    }
}

export default Environment;
