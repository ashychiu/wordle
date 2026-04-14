import './App.css';
import React, { useState } from 'react';
import { words } from './words';

export default function App() {
  const [secret, setSecret] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const MAX_LENGTH = 5;
  const MAX_ATTEMPTS = 5;

  const [input, setInput] = useState('');
  const [submission, setSubmission] = useState([]);
  const [attempt, setAttempt] = useState(0);

  const secretArray = secret.toUpperCase().split('');
  const color = { correct: '#8fea87', present: '#ffc425', absent: '#c95858' };

  const getResult = (letter, index) => {
    const l = letter.toUpperCase();

    if (secretArray[index] === l) return color.correct;
    if (secretArray.includes(l)) return color.present;
    return color.absent;
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
      handleReset();
    }
  };

  const handleReset = () => {
    setSubmission([]);
    setAttempt(0);
    setInput('');
    setSecret(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
          gap: '8px',
        }}
      >
        <h1 className="cell">Hello, Wordle</h1>
        <div>
          Attempt: {attempt}/{MAX_ATTEMPTS}
        </div>

        {attempt < MAX_ATTEMPTS ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              maxLength={MAX_LENGTH}
              value={input}
              onChange={handleChange}
            />

            <button
              onClick={handleSubmit}
              disabled={!input}
              className="button"
              style={{
                cursor: !input ? 'not-allowed' : 'pointer',
                marginLeft: '10px',
              }}
            >
              Submit
            </button>
          </form>
        ) : (
          <>
            {' '}
            <div>
              Game Over! The secret word was: <strong>{secret}</strong>
            </div>
            <button
              className="button"
              style={{ cursor: 'pointer' }}
              onClick={handleReset}
            >
              Play Again
            </button>
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          {submission.map((guess, i) => (
            <div key={i} style={{ display: 'flex', marginTop: '10px' }}>
              {guess.split('').map((letter, j) => (
                <div
                  key={j}
                  className="cell"
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
      <footer className="footer">
        <a href="https://github.com/ashychiu/" target="_blank" rel="noreferrer">
          <span>Created by Ashley Chiu</span>
        </a>
      </footer>
    </>
  );
}
