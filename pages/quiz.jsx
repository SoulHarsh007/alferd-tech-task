import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {useState} from 'react';
import jwt from 'jsonwebtoken';
import {dbConnect} from '../utils/mongodb.js';
import cookie from 'js-cookie';

/**
 * @function quiz
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Quiz page
 * @param {{data: any[]}} param1 - props passed to the page
 * @returns {Container<any>} - React Body
 */
export default function quiz({data}) {
  const token = cookie.get('token');
  const [questions, setQuestions] = useState(data);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const updateDb = () => {
    fetch('/api/me', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        questions,
        token,
      }),
    })
      .then(x => x.json())
      .then(x => x);
  };
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
                updateDb();
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
                updateDb();
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
                updateDb();
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
                updateDb();
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
                updateDb();
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
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
