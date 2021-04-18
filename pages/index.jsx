import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Alert from 'react-bootstrap/Alert';
import Router from 'next/router';
import {useState} from 'react';
import {dbConnect} from '../utils/mongodb.js';
import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';

/**
 * @function index
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Index page
 * @param {{data: any[]}} param1 - props passed to the page
 * @returns {Container<any>} - React Body
 */
export default function index({data}) {
  const token = cookie.get('token');
  const [questions, setQuestions] = useState(data);
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
            setQuestions(data);
            setShow(true);
            return x;
          });
          fetch('/api/me', {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              questions,
              token,
            }),
          }).then(x => x.json());
          Router.push('/');
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
            required
          />
          <br />
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="This will be your answer"
            name="answer"
            required
          />
        </Form.Group>
        <ButtonToolbar className="justify-content-between">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" onClick={() => Router.push('/quiz')}>
            Quiz
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
          {questions.map((x, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{x.question}</td>
              <td>{x.answer}</td>
              <td>{x.confidence}</td>
              <td>
                <Button
                  onClick={() => {
                    setQuestions(a => {
                      a[i].confidence = 1;
                      return a;
                    });
                    fetch('/api/me', {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      method: 'POST',
                      body: JSON.stringify({
                        questions,
                        token,
                      }),
                    }).then(x => x.json());
                  }}
                >
                  Reset
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    setQuestions(a => {
                      a.splice(i, 1);
                      return a;
                    });
                    fetch('/api/me', {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      method: 'POST',
                      body: JSON.stringify({
                        questions,
                        token,
                      }),
                    }).then(x => x.json());
                  }}
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

/**
 * @async
 * @function getServerSideProps
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Server Side Props Handler
 * @param {import('next').GetServerSidePropsContext} context - Incoming request context
 * @returns {import('next').GetServerSidePropsResult} - Server props
 */
export async function getServerSideProps(context) {
  if ('token' in context.req.cookies) {
    let decoded;
    const token = context.req.cookies.token;
    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        console.error(e);
      }
    }
    if (decoded) {
      const mongo = await dbConnect();
      const user = await mongo
        .db(process.env.USER_DB)
        .collection(process.env.USER_COL)
        .findOne({
          email: decoded.email,
        });
      return {
        props: {
          data: user.questions,
        },
      };
    }
  }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
