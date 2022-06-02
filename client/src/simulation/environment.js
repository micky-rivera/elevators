import Elevator from "./elevator";

class Environment {
    constructor(config) {
        this.elevatorList = [];
        this.element = config.element;
        this.canvas = this.element.querySelector('.env-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    mainLoop() {
        const step = () => {
            new Promise((resolve, reject) => { // frame buffer to control framerate
                setTimeout(()=>{
                    resolve();
                }, 17); // FRAMERATE HERE 34MS FOR 30FPS 17MS FOR 60FPS
            }).then(res => step());
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

        this.mainLoop();
    }
}

export default Environment;
