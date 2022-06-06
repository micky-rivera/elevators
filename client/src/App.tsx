import React, {useState} from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Form from './components/Form';
import CallsList from './components/CallsList';
import ElevatorForm from './components/ElevatorForm';


function App() {
  const [callsList, setCallsList] = useState<Call[]>([]);
  const [numberOfElevatorsInput, setNumberOfElevatorsInput] = useState("");
  const [env, setEnv] = useState({});

  return (
    <div className="App">
      <Canvas numberOfElevatorsInput={numberOfElevatorsInput} callsList={callsList} env={env} setEnv={setEnv}/>
      <div className='sidebar'>
        <CallsList callsList={callsList} setCallsList={setCallsList} />
        <Form callsList={callsList} setCallsList={setCallsList} env={env} />
        <ElevatorForm numberOfElevatorsInput={numberOfElevatorsInput} setNumberOfElevatorsInput={setNumberOfElevatorsInput} />
      </div>
    </div>
  );
}

export default App;
