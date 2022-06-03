import { useState, useEffect } from "react";

const Form = ({callsList, setCallsList}: FormProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let direction;
    if (origin > destination) {
        direction = 'up';
    } else {
        direction = 'down';
    }

    const newCall = {
        origin: origin,
        destination: destination,
        direction: direction
    }

    fetch('http://localhost:8080/api/calls', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCall)
      })
      .then(res => res.json())
      .then(data => setCallsList(prevState => {
          return [...prevState, ...data];
      }));

    setOrigin("");
    setDestination("");
  };

  const handleRandom = () => {
    const getRandomInt = (min: number, max: number) => {
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

    fetch('http://localhost:8080/api/calls', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCall)
      })
      .then(res => res.json())
      .then(data => setCallsList(prevState => {
        return [...prevState, ...data];
    }));
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