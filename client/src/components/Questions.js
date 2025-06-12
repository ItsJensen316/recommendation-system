import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Questions({ question, selectedAnswer, onResponseChange }) {
    function handleSelectChange(e){
        onResponseChange(question.question, e.target.value);
    }
  return (
    <FloatingLabel
      controlId="floatingSelect"
      label={question.question}
      className=" whitespace-normal text-wrap"
    >
      <Form.Select
        aria-label="Floating label select example"
        value={selectedAnswer}
        onChange={handleSelectChange}
      >
        <option>Choose...</option>
        {question.answers.map((answer, index) => (
          <option key={index} value={answer}>{answer}</option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

export default Questions;
