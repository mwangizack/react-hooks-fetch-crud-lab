import React from "react";

function QuestionItem({ question, handleDeleteQuestion, handleChangeCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => console.log(`${question.prompt} has been DELETED!`))
      .catch(error => console.log(`Error deleting question: ${error}`))
    
    handleDeleteQuestion(question)
  }

  function handleChange(e) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...question, correctIndex: parseInt(e.target.value)})
    })
      .then(response => response.json())
      .then(data => handleChangeCorrectAnswer(data))
      .catch(error => console.log(`Error updating correct answer: ${error}`))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
