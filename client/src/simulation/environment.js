import Elevator from "./elevator";

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
        this.numberOfElevators = 5;
    }

    randomCall() {
        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const newOrigin = getRandomInt(1,20);
        const newDestination = getRandomInt(1,20);
        let newDirection;

        if (newDestination < newOrigin) {
            newDirection = 'up';
        } else {
            newDirection = 'down';
        }

        const newCall = {
            origin: newOrigin,
            destination: newDestination,
            direction: newDirection
        }

        this.calls.push(newCall);
    }

    elevatorController() {
        let callsToBeRemoved = [];

        this.calls.forEach(call => {
            const sortedElevators = this.elevatorList.sort((a,b) => Math.abs(call.origin - a) - Math.abs(call.origin - b));
            let resultElevator;
            
            sortedElevators.forEach(elevator => {
                if (elevator.isIdle) {
                    console.log('call given to idle elevator');
                    resultElevator = elevator;
                    elevator.isIdle = false;
                    return;
                }
                if (elevator.direction === call.direction) {
                    console.log('call given to elevetor on route');
                    resultElevator = elevator;
                    return;
                }
            });

            if (!(resultElevator instanceof Elevator)) {
                console.log('call given to least busy elevator');
                const leastBusyElevator = this.elevatorList.sort((a,b) => a.pendingCalls.length - b.pendingCalls.length)[0];
                resultElevator = leastBusyElevator;
            }

            resultElevator.addCall(call);
            callsToBeRemoved.push(call);
        });

        callsToBeRemoved.forEach(callToBeRemoved => {
            this.calls = [...this.calls].filter(call => call !== callToBeRemoved);
        });
    }

    mainLoop() {
        const step = () => {
            new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve();
                }, 17); // 34MS FOR 30FPS 17MS FOR 60FPS
            }).then(res => step());

            this.elevatorController();

            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            this.isLoaded && this.ctx.drawImage(
                this.image,
                0, //horizontal cut
                0, //vertical cut (rows)
                600, //size of cut x
                550, //size of cut y, i like ya cut g
                0, //x position
                0, //y position
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
        const xOffset = ((600 / this.numberOfElevators) - 30) / 2;
        for (let i = 0; i < this.numberOfElevators; i++) {
            this.elevatorList.push(
                new Elevator({
                    element: this.element,
                    x: i * (600 / this.numberOfElevators) + xOffset
                })
            );
        }

        this.mainLoop();


        window.addEventListener('keydown', (e)=> {
            if (e.key === 'c') {
                this.randomCall();
            }
        })
    }
}

export default Environment;
