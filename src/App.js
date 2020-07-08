import "./App.scss";

import React from "react";
import randomWords from "random-words";
import { calc } from "./utils";

function App() {
  const [start, setStart] = React.useState(null);
  const [wordCount, setWordCount] = React.useState(50);
  const [charCount, setCharCount] = React.useState(0);
  const [WPM, setWPM] = React.useState(0);
  const [ACC, setACC] = React.useState(0);
  const [input, setInput] = React.useState("");
  const [currentWord, setCurrentWord] = React.useState(0);
  const [words, setWords] = React.useState([]);

  React.useEffect(() => {
    const randWords = randomWords(wordCount);
    setCharCount(randWords.reduce((acc, word) => acc + word.length, 0));
    setWords(
      randWords.reduce(
        (acc, word, i) => [...acc, { word, selected: i === 0, correct: null }],
        []
      )
    );
  }, [wordCount]);

  const handleChange = ({ target: { value } }) => {
    if (input === "" && currentWord === 0) {
      setStart(Date.now());
    }
    if (value[value.length - 1] === " ") {
      const newWords = [...words];
      console.log(newWords);
      console.log(value.trim() === newWords[currentWord]);
      newWords[currentWord].correct =
        value.trim() === newWords[currentWord].word;
      if (currentWord + 1 === newWords.length) {
        const { acc, wpm } = calc(start, charCount, words);
        setACC(parseInt(acc));
        setWPM(parseInt(wpm));
        return;
      }
      newWords[currentWord].selected = false;
      newWords[currentWord + 1].selected = true;
      setWords(newWords);
      setCurrentWord(currentWord + 1);
      setInput("");
    } else {
      setInput(value);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>typing tester</p>
      </header>
      <section className="App-main-container">
        <div className="App-main-header">
          <div>10 / 25 / 50 / 100 / 250</div>
          <div>
            WPM: <span>{WPM}</span> / ACC: <span>{ACC}</span>
          </div>
        </div>
        <div className="App-words-card">
          <div>
            {words.map(({ selected, correct, word }) => (
              <span
                className={`${selected ? "selected" : ""} ${
                  correct === null ? "" : correct ? "correct" : "incorrect"
                }`}
              >
                {word}{" "}
              </span>
            ))}
          </div>
          <div className="App-input-container">
            <input id="type-here" value={input} onChange={handleChange} />
            <button id="redo">redo</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
