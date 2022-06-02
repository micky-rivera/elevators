import {useEffect} from 'react';
import Environment from '../simulation/environment'

let envLoaded = false;

function Canvas() {

    useEffect(()=>{
        if (!envLoaded) {
            const env = new Environment({
                element: document.querySelector('.env-container')
            });
            
            env.init();
            envLoaded = true;
        }
    }, []);

  return (
    <>
        <div className="env-container">
            <canvas className="env-canvas" width="1920" height="1080"></canvas>
        </div>
    </>
  );
}

export default Canvas;