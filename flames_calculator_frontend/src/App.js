import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // theme toggling
  const [theme, setTheme] = useState('dark');
  // FLAMES state
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState(null); // FLAMES result object or null
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    const { name, value } = e.target;
    setError('');
    setResult(null);
    if (name === "name1") setName1(value);
    if (name === "name2") setName2(value);
  }

  // PUBLIC_INTERFACE
  function handleCalculate(e) {
    e.preventDefault();
    // Basic validation
    if (!name1.trim() || !name2.trim()) {
      setError("Please enter both names.");
      setResult(null);
      return;
    }
    // FLAMES algorithm
    const flamesResult = calculateFlames(name1.trim(), name2.trim());
    setResult(flamesResult);
    setError('');
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setName1('');
    setName2('');
    setResult(null);
    setError('');
  }

  // PUBLIC_INTERFACE
  function calculateFlames(n1, n2) {
    // Remove spaces, convert to lowercase
    let a = n1.replace(/\s/g, '').toLowerCase();
    let b = n2.replace(/\s/g, '').toLowerCase();

    // Remove common letters
    let arrA = a.split('');
    let arrB = b.split('');
    for (let i = 0; i < arrA.length; i++) {
      const idx = arrB.indexOf(arrA[i]);
      if (idx !== -1) {
        arrB.splice(idx, 1);
        arrA[i] = '';
      }
    }
    const remCount = arrA.filter(Boolean).length + arrB.length;

    // FLAMES logic
    const flamesList = [
      {letter: "F", meaning: "Friends", description: "You two are destined to be great friends."},
      {letter: "L", meaning: "Love", description: "A romantic bond is in the stars!"},
      {letter: "A", meaning: "Affection", description: "Mutual affection and liking."},
      {letter: "M", meaning: "Marriage", description: "Prospects of a lifelong partnership."},
      {letter: "E", meaning: "Enemies", description: "Watch out! You might get on each other's nerves."},
      {letter: "S", meaning: "Siblings", description: "You share a sibling-like companionship."},
    ];
    if (remCount === 0) {
      return {
        letter: 'F',
        meaning: "Friends",
        description: "A perfect balance! Destined for strong friendship."
      };
    }
    let n = remCount;
    let tempList = [...flamesList];
    let idx = 0;
    while (tempList.length > 1) {
      idx = (n % tempList.length) - 1;
      if (idx >= 0) {
        tempList = [...tempList.slice(idx + 1), ...tempList.slice(0, idx)];
      } else {
        tempList.pop();
      }
    }
    return tempList[0];
  }

  return (
    <div className="App">
      <header className="App-header" style={{minHeight: '100vh', justifyContent: 'flex-start'}}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="flames-container">
          <h1 className="flames-title" style={{
            letterSpacing: '2px',
            marginBottom: '8px',
            color: '#000000'
          }}>FLAMES Relationship Calculator</h1>
          <p className="flames-desc" style={{
            color: "var(--text-secondary)",
            marginBottom: '32px',
            fontWeight: 400,
            fontSize: 18,
            maxWidth: 340,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Enter two names to find out your FLAMES relationship outcome.
          </p>
          <form className="flames-form" onSubmit={handleCalculate} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: 380,
            margin: '0 auto',
            width: '100%'
          }}>
            <input
              autoComplete="off"
              type="text"
              name="name1"
              placeholder="Name 1"
              className="flames-input"
              value={name1}
              onChange={handleInputChange}
              aria-label="First Name"
              required
            />
            <input
              autoComplete="off"
              type="text"
              name="name2"
              placeholder="Name 2"
              className="flames-input"
              value={name2}
              onChange={handleInputChange}
              aria-label="Second Name"
              required
            />
            <div style={{display: 'flex', gap: 12, marginTop: 8}}>
              <button
                type="submit"
                className="flames-button"
                style={{flex: 1}}
                aria-label="Calculate FLAMES outcome"
              >
                Calculate
              </button>
              <button
                type="button"
                className="flames-button flames-clear"
                onClick={handleReset}
                style={{flex: 1}}
                aria-label="Clear form"
              >
                Clear
              </button>
            </div>
          </form>
          {error && (
            <div className="flames-error" style={{marginTop: 18, color: "#ff5e5e", fontSize: 15}}>
              {error}
            </div>
          )}
          {result && (
            <div
              className="flames-result"
              style={{
                marginTop: 38,
                padding: "34px 18px 26px 18px",
                borderRadius: 18,
                maxWidth: 415,
                marginLeft: 'auto',
                marginRight: 'auto',
                background: "transparent",
                boxShadow: "0 6px 38px 1px #fbb7c87c, 0 3px 15px 1px #ff33662a",
                border: "none",
                zIndex: 1,
              }}>
              <div style={{
                fontSize: 46,
                fontWeight: 800,
                letterSpacing: 2,
                color: 'var(--rose-red)',
                textShadow: '0 4px 18px #fbb7c871, 0 1px 0 #fffafd',
                marginBottom: 1
              }}>
                {result.letter}
              </div>
              <div style={{
                fontSize: 26,
                fontWeight: 700,
                marginTop: 7,
                color: 'var(--rose-5)',
                letterSpacing: 1.3,
                textShadow: '0 2px 11px #fbb7c844'
              }}>
                {result.meaning}
              </div>
              <div style={{
                marginTop: 15,
                color: "var(--rose-3)",
                fontSize: 17.2,
                fontWeight: 500,
              }}>
                {result.description}
              </div>
            </div>
          )}
        </div>
        <footer className="flames-footer" style={{
          marginTop: 'auto',
          fontSize: 14,
          padding: 24,
          color: "var(--text-secondary)"
        }}>
          &copy; {new Date().getFullYear()} FLAMES Calculator · Made with React
        </footer>
      </header>
    </div>
  );
}
export default App;
