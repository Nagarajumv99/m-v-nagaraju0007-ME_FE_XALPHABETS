import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const addLetter = (letter) => setText((currentText) => currentText + letter)
  const removeLetter = () => setText((currentText) => currentText.slice(0, -1))

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault()
        removeLetter()
        return
      }

      if (/^[a-z]$/i.test(event.key)) {
        addLetter(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="app-shell">
      <section className="alphabet-card" aria-labelledby="page-title">
        <header className="intro">
          <h1 id="page-title">Alphabet Buttons</h1>
          <p>Click letters (or use your keyboard) to build text.</p>
        </header>

        <div className="output" aria-live="polite">
          {text || 'Your text will appear here...'}
        </div>

        <div className="controls">
          <button type="button" className="backspace" onClick={removeLetter}>
            Backspace
          </button>
        </div>

        <div className="key-grid" aria-label="Alphabet buttons">
          {letters.map((letter) => (
            <button
              type="button"
              className="key"
              key={letter}
              onClick={() => addLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
