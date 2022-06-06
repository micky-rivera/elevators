import Elevator from "./elevator";

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://elevators-micky.herokuapp.com";

class Environment {
    constructor(config) {
        this.elevatorList = [];
        this.calls = [];
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

    deliverCalls(data) {
        data.forEach(object => {
            const elevator = this.elevatorList.find(elevator => elevator.x === object.elevator.x);
            object.calls.forEach(call=> {
                elevator.addCall(call);
            })
        });
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

        const getCalls = () => {
            new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve();
                }, 3000);
            }).then(res => getCalls());

            fetch(`${url}/api/assignments`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.elevatorList)
            })
            .then(res => res.json())
            .then(data => {
                this.deliverCalls(data);
            });
        }
        getCalls();
    }
}

export default Environment;
