import { useState, useEffect } from "react";

const Form = () => {
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
      .then(data => console.log('call sent:', data));

    setOrigin("");
    setDestination("");
  };

  return (
    <>
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
    </>
  );
};

export default Form;