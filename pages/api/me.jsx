import {dbConnect} from '../../utils/mongodb.js';
import jwt from 'jsonwebtoken';

/**
 * @async
 * @function me
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Profile handling api
 * @param {import('next').NextApiRequest} req - Incoming request with next.js default middleware and helpers
 * @param {import('next').NextApiResponse} res - Incoming request with next.js default middleware and helpers
 * @returns {Promise<void>} returns void
 */
export default async function me(req, res) {
  if (req.method === 'GET') {
    if (!req.query.token) {
      return res.status(401).json({
        error: 'Not logged in!',
      });
    }
    let decoded;
    const token = req.query.token;
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
      return res.status(200).json({
        questions: user.questions,
      });
    }
    return res.status(401).json({
      error: 'Not logged in!',
    });
  }
  if (req.method === 'POST') {
    if (!req.body.token) {
      return res.status(401).json({
        error: 'Not logged in!',
      });
    }
    if (!req.body.questions || !req.body.questions?.length) {
      return res.status(400).json({
        error: 'Missing Fields',
      });
    }
    let decoded;
    const token = req.body.token;
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
        .updateOne(
          {
            email: decoded.email,
          },
          {
            $set: {
              questions: req.body.questions,
            },
          }
        );
      return res.status(200).json({
        questions: user.questions,
      });
    }
    return res.status(401).json({
      error: 'Not logged in!',
    });
  }
}
