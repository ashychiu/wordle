import './App.css';
import React, { useState } from 'react';

export default function App() {
  const [secret] = useState(() => {
    const words = ['SPEND', 'APPLE', 'CRANE', 'BRICK', 'PLANE'];
    return words[Math.floor(Math.random() * words.length)];
  });
  const MAX_LENGTH = 5;
  const MAX_ATTEMPTS = 5;

  const [input, setInput] = useState('');
  const [submission, setSubmission] = useState([]);
  const [attempt, setAttempt] = useState(0);

  const secretArray = secret.toUpperCase().split('');
  const correct = '#8fea87';
  const present = '#ffc425';
  const absent = '#c95858';

  const getResult = (letter, index) => {
    const l = letter.toUpperCase();

    if (secretArray[index] === l) return correct;
    if (secretArray.includes(l)) return present;
    return absent;
  };

  const handleChange = (e) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    if (!input || input.length !== MAX_LENGTH) return;

    setSubmission((prev) => [...prev, input]);
    setInput('');
    setAttempt((prev) => prev + 1);
    if (input.toUpperCase() === secret.toUpperCase()) {
      alert('Congratulations! You won!');
      setSubmission([]);
      setAttempt(0);
    }
  };

  const isDisabled = attempt >= MAX_ATTEMPTS;

  return (
    <div>
      <h2>Hello, Wordle</h2>
      <div>
        Attempt: {attempt}/{MAX_ATTEMPTS}
      </div>

      <input
        type="text"
        maxLength={MAX_LENGTH}
        value={input}
        onChange={handleChange}
        disabled={isDisabled}
      />

      <button
        onClick={handleSubmit}
        disabled={!input || isDisabled}
        style={{
          cursor: !input || isDisabled ? 'not-allowed' : 'pointer',
          marginLeft: '10px',
        }}
      >
        Submit
      </button>

      <div style={{ marginTop: '20px' }}>
        {submission.map((guess, i) => (
          <div key={i} style={{ display: 'flex', marginTop: '10px' }}>
            {guess.split('').map((letter, j) => (
              <div
                key={j}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: getResult(letter, j),
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
