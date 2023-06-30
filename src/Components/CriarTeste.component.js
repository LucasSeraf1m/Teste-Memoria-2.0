import React, { useState } from 'react';

function CriarTeste() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', ''] }]);
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const saveQuestions = () => {
    // Aqui você pode fazer uma chamada para API para salvar as perguntas no MongoDB
    console.log(questions);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Digite a pergunta"
            value={question.question}
            onChange={(e) => handleQuestionChange(e, index)}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder="Digite uma opção"
              value={option}
              onChange={(e) => handleOptionChange(e, index, optionIndex)}
            />
          ))}
        </div>
      ))}
      <button onClick={addQuestion}>Adicionar pergunta</button>
      <button onClick={saveQuestions}>Salvar perguntas</button>
    </div>
  );
}



export default CriarTeste;
