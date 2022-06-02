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
        ];
        this.element = config.element;
        this.canvas = this.element.querySelector('.env-canvas');
        this.ctx = this.canvas.getContext('2d');
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
                resultElevator = elevator;
            });

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

            //this.elevatorController();

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
        });
        this.elevatorList.push(elev);

        this.elevatorController();

        this.mainLoop();
    }
}

export default Environment;
