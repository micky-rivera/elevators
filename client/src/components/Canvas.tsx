import {useEffect} from 'react';
import Environment from '../simulation/environment'

let env: Environment;

function Canvas({numberOfElevatorsInput}: CanvasProps) {

    useEffect(()=>{
        env = new Environment({
            element: document.querySelector('.env-container'),
        });
        
        env.init();
    }, []);

    useEffect(()=>{
        env.updateNumberOfElevators(parseInt(numberOfElevatorsInput));
    }, [numberOfElevatorsInput]);

  return (
    <>
        <div className="env-container">
            <canvas className="env-canvas" width="600" height="550"></canvas>
        </div>
    </>
  );
}

export default Canvas;