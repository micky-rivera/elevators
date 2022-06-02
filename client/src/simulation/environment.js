import Elevator from "./elevator";

class Environment {
    constructor(config) {
        this.elevatorList = [];
        this.calls = [
            {
                origin: 2,
                destination: 6,
                direction: 'down'
            },
            {
                origin: 11,
                destination: 20,
                direction: 'down'
            },
            {
                origin: 20,
                destination: 17,
                direction: 'up'
            },
            {
                origin: 16,
                destination: 1,
                direction: 'up'
            },
        ];
        this.element = config.element;
        this.canvas = this.element.querySelector('.env-canvas');
        this.ctx = this.canvas.getContext('2d');
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
        console.log('added random call');
    }

    elevatorController() {
        let callsToBeRemoved = [];

        this.calls.forEach(call => {
            const sortedElevators = this.elevatorList.sort((a,b) => Math.abs(call.origin - a) - Math.abs(call.origin - b));
            let resultElevator;
            
            sortedElevators.forEach(elevator => {
                if (elevator.isIdle) {
                    resultElevator = elevator;
                    return;
                }
                if (elevator.direction === call.direction) {
                    resultElevator = elevator;
                    return;
                }
            });

            if (!(resultElevator instanceof Elevator)) {
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
            new Promise((resolve, reject) => { // frame buffer to control framerate
                setTimeout(()=>{
                    resolve();
                }, 17); // 34MS FOR 30FPS 17MS FOR 60FPS
            }).then(res => step());

            this.elevatorController();

            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            this.elevatorList.forEach(elevator => {
                elevator.draw(this.ctx);
                elevator.move();
            });

        }
        step();
    }

    init() {
        const elev = new Elevator({
            element: this.element,
            x: 30
        });
        const elev2 = new Elevator({
            element: this.element,
            x: 60
        });
        this.elevatorList.push(elev);
        this.elevatorList.push(elev2);

        this.mainLoop();


        window.addEventListener('keydown', (e)=> {
            if (e.key === 'c') {
                this.randomCall();
            }
        })
    }
}

export default Environment;
