import React, {useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, setQuestions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.log(`Error fetching questions: ${error}`))
  },[])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question}/>
      )}</ul>
    </section>
  );
}

export default QuestionList;
