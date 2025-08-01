import { useState } from 'react';

const questions = [
  {
    question: "Vilket land reste ni till 1990 enligt datan?",
    options: ["Sverige", "Tyskland", "Tjeckien", "USA"],
    answer: "Tyskland",
  },
  {
    question: "Vart åkte familjen på skidsemster i  Mars 2006?",
    options: ["Idre", "Åre", "Vemdalen", "Hundfjället"],
    answer: "Hundfjället",
  },
  {
    question: "Vilket år skedde flest resor?",
    options: ["2023", "1992", "2008", "2015"],
    answer: "2023",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[current];

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎯 Familjequiz</h2>

      {showResult ? (
        <div>
          <h3>Du fick {score} av {questions.length} rätt!</h3>
        </div>
      ) : (
        <>
          <p>{currentQuestion.question}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={selected !== null}
                className="button"
                style={{
                  backgroundColor: selected === option
                    ? option === currentQuestion.answer
                      ? 'green'
                      : 'red'
                    : undefined
                }}
              >
                {option}
              </button>
            ))}
            {selected && (
              <button className="button secondary" onClick={nextQuestion}>Nästa</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
