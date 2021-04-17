import Container from 'react-bootstrap/Container';
import createPersistedState from 'use-persisted-state';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
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
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <Container fluid="xl">
      <p className="text-center">
        {question} - {answer}
      </p>
      <br />
      <ButtonToolbar className="justify-content-between">
        <Button
          onClick={() => {
            const q1 = questions.filter(x => x.confidence === 1);
            const q2 = questions.filter(x => x.confidence === 2);
            const q3 = questions.filter(x => x.confidence === 3);
            const q4 = questions.filter(x => x.confidence === 4);
            if (q1.length) {
              setAnswer('');
              return setQuestion(
                q1[Math.floor((q1.length - 1) * Math.random())].question
              );
            } else if (q2.length) {
              setAnswer('');
              return setQuestion(
                q2[Math.floor((q2.length - 1) * Math.random())].question
              );
            } else if (q3.length) {
              setAnswer('');
              return setQuestion(
                q3[Math.floor((q3.length - 1) * Math.random())].question
              );
            } else if (q4.length) {
              setAnswer('');
              return setQuestion(
                q4[Math.floor((q4.length - 1) * Math.random())].question
              );
            } else {
              setAnswer('');
              return setQuestion('All questions have a 5 / 5 score!');
            }
          }}
        >
          Show Question
        </Button>
        <Button
          onClick={() => {
            if (!question) {
              return;
            }
            if (question === 'All questions have a 5 / 5 score!') {
              return setAnswer('All questions have a 5 / 5 score!');
            }
            setAnswer(questions.filter(y => y.question === question)[0].answer);
          }}
        >
          Show Answer
        </Button>
        <ButtonGroup>
          <Button disabled>Set Score: </Button>
          <Button
            onClick={() =>
              setQuestions(x => {
                if (question === 'All questions have a 5 / 5 score!') {
                  return x;
                }
                x.filter(y => y.question === question)[0].confidence = 1;
                return x;
              })
            }
          >
            1
          </Button>
          <Button
            onClick={() =>
              setQuestions(x => {
                if (question === 'All questions have a 5 / 5 score!') {
                  return x;
                }
                x.filter(y => y.question === question)[0].confidence = 2;
                return x;
              })
            }
          >
            2
          </Button>
          <Button
            onClick={() =>
              setQuestions(x => {
                if (question === 'All questions have a 5 / 5 score!') {
                  return x;
                }
                x.filter(y => y.question === question)[0].confidence = 3;
                return x;
              })
            }
          >
            3
          </Button>
          <Button
            onClick={() =>
              setQuestions(x => {
                if (question === 'All questions have a 5 / 5 score!') {
                  return x;
                }
                x.filter(y => y.question === question)[0].confidence = 4;
                return x;
              })
            }
          >
            4
          </Button>
          <Button
            onClick={() =>
              setQuestions(x => {
                if (question === 'All questions have a 5 / 5 score!') {
                  return x;
                }
                x.filter(y => y.question === question)[0].confidence = 5;
                return x;
              })
            }
          >
            5
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Container>
  );
}
