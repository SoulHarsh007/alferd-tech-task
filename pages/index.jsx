import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import createPersistedState from 'use-persisted-state';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Alert from 'react-bootstrap/Alert';
import {useState} from 'react';

/**
 * @async
 * @function index
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Index page
 * @returns {Container<any>} - React Body
 */
export default function index() {
  const useQuestionState = createPersistedState('questions');
  const [questions, setQuestions] = useQuestionState([]);
  const [view, setView] = useState([]);
  const [show, setShow] = useState(false);
  return (
    <Container fluid="xl">
      {show ? (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          <p>Added to your questions list!</p>
        </Alert>
      ) : undefined}
      <Form
        onSubmit={e => {
          e.preventDefault();
          setQuestions(x => {
            x.push({
              question: e.currentTarget.question.value,
              answer: e.currentTarget.answer.value,
              confidence: 1,
            });
            setView(x);
            return x;
          });
        }}
        className="text-center"
      >
        <Form.Group>
          <Form.Label>Add a question!</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="This will be your question"
            name="question"
          />
          <br />
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="This will be your answer"
            name="answer"
          />
        </Form.Group>
        <ButtonToolbar className="justify-content-between">
          <Button variant="primary" type="submit" onClick={() => setShow(true)}>
            Submit
          </Button>
          <Button variant="primary" onClick={() => setView(questions)}>
            Load Questions List
          </Button>
        </ButtonToolbar>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Score</th>
            <th>Reset</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {view.map((x, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{x.question}</td>
              <td>{x.answer}</td>
              <td>{x.confidence}</td>
              <td>
                <Button
                  onClick={() =>
                    setQuestions(a => {
                      a[i].confidence = 1;
                      return a;
                    })
                  }
                >
                  Reset
                </Button>
              </td>
              <td>
                <Button
                  onClick={() =>
                    setQuestions(a => {
                      a.splice(i, 1);
                      return a;
                    })
                  }
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
