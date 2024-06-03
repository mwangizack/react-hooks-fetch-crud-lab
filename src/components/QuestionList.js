import React, {useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, setQuestions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(`Error fetching questions: ${error}`))
  },[])

  function handleDeleteQuestion(questionToBeDeleted){
    const remainingQuestions = questions.filter(question => question.id !== questionToBeDeleted.id)
    setQuestions(remainingQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question} handleDeleteQuestion={handleDeleteQuestion}/>
      )}</ul>
    </section>
  );
}

export default QuestionList;
