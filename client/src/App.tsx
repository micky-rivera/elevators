import React, {useState} from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Form from './components/Form';
import CallsList from './components/CallsList';


function App() {
  const [callsList, setCallsList] = useState<Call[]>([]);

  return (
    <div className="App">
      <Canvas />
      <div className='sidebar'>
        <CallsList callsList={callsList} setCallsList={setCallsList} />
        <Form callsList={callsList} setCallsList={setCallsList} />
      </div>
    </div>
  );
}

export default App;
