import Elevator from "./elevator";

class Environment {
    constructor(config) {
        this.elevatorList = [];
        this.element = config.element;
        this.canvas = this.element.querySelector('.env-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        const elev = new Elevator({
            element: this.element,
        });
        elev.draw(this.ctx);
    }
}

export default Environment;
