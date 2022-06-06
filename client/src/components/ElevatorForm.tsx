import { useState, useEffect } from "react";

const ElevatorForm = ({numberOfElevatorsInput, setNumberOfElevatorsInput}: ElevatorFormProps) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNumberOfElevatorsInput('');
  };

  return (
    <>
    <div className='elevator-form-container'>
      <form className='elevator-form' onSubmit={handleSubmit}>
      <p>number of elevators:</p>
        <input
          className="call-form__origin-input"
          required
          type="number"
          min='1'
          max='10'
          value={numberOfElevatorsInput}
          placeholder="5"
          onChange={(e) => setNumberOfElevatorsInput(e.target.value)}
        />
        <button className="elevator-form__submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default ElevatorForm;