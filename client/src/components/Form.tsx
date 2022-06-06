import { useState, useEffect } from "react";
import Environment from "../simulation/environment";
import Elevator from "../simulation/elevator";

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

const Form = ({callsList, setCallsList, env}: FormProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let elevators: Elevator[] = [];
    if (env instanceof Environment) {
        elevators = env.getElevatorList();
    }

    let direction;
    if (destination < origin) {
        direction = 'down';
    } else {
        direction = 'up';
    }

    const newCall: Call = {
        origin: parseInt(origin),
        destination: parseInt(destination),
        direction: direction
    }

    fetch(`${url}/api/calls`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            call: newCall,
            elevatorList: elevators
        })
      })
      .then(res => res.json())
      .then(data => {
          setCallsList(previousState => [...previousState, newCall]);
          if (env instanceof Environment) {
            return env.assignCall(newCall, data);
          }
      });

    setOrigin("");
    setDestination("");
  };

  const handleRandom = () => {
    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let elevators: Elevator[] = [];
    if (env instanceof Environment) {
        elevators = env.getElevatorList();
    }

    const newOrigin = getRandomInt(1,20);
    const newDestination = getRandomInt(1,20);
    let newDirection;

    if (newDestination < newOrigin) {
        newDirection = 'down';
    } else {
        newDirection = 'up';
    }

    const newCall: Call = {
        origin: newOrigin,
        destination: newDestination,
        direction: newDirection
    }

    fetch(`${url}/api/calls`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            call: newCall,
            elevatorList: elevators
        })
      })
      .then(res => res.json())
      .then(data => {
        setCallsList(previousState => [...previousState, newCall]);
        if (env instanceof Environment) {
          return env.assignCall(newCall, data);
        }
    });
  }

  return (
    <>
    <div className='form-container'>
      <form className='call-form' onSubmit={handleSubmit}>
      <p>origin:</p>
        <input
          className="call-form__origin-input"
          required
          type="number"
          min='1'
          max='20'
          value={origin}
          placeholder="16"
          onChange={(e) => setOrigin(e.target.value)}
        />
      <p>destination:</p>
        <input
          className="call-form__origin-input"
          required
          type="number"
          min='1'
          max='20'
          value={destination}
          placeholder="2"
          onChange={(e) => setDestination(e.target.value)}
        />
        <button className="call-form__submit">Call Elevator</button>
      </form>
      <button className='call-form__random' onClick={handleRandom}>Send Random Call</button>
    </div>
    </>
  );
};

export default Form;