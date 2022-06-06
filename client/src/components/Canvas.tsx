import {useEffect} from 'react';
import Environment from '../simulation/environment'

function Canvas({numberOfElevatorsInput, callsList, env, setEnv}: CanvasProps) {

    useEffect(()=>{
        setEnv(new Environment({
            element: document.querySelector('.env-container'),
            numberOfElevators: 5
        }));
    }, []);

    useEffect(()=>{
        if (env instanceof Environment) {
            env.init();
            env.updateNumberOfElevators(5);
        }
    }, [env]);

    useEffect(()=>{
        if (env instanceof Environment) {
            env.updateNumberOfElevators(parseInt(numberOfElevatorsInput));
        }
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