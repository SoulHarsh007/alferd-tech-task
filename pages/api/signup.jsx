import {dbConnect} from '../../utils/mongodb.js';
import {hashSync} from 'bcrypt';
import {v4} from 'uuid';
import jwt from 'jsonwebtoken';

/**
 * @async
 * @function signUpHandler
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Sign up handling api
 * @param {import('next').NextApiRequest} req - Incoming request with next.js default middleware and helpers
 * @param {import('next').NextApiResponse} res - Incoming request with next.js default middleware and helpers
 * @returns {Promise<void>} returns void
 */
export default async function signUpHandler(req, res) {
  if (req.method === 'POST') {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({error: 'Missing Fields'});
    }
    const mongo = await dbConnect();
    let user = await mongo
      .db(process.env.USER_DB)
      .collection(process.env.USER_COL)
      .findOne({
        email: req.body.email,
      });
    if (user) {
      return res.status(403).json({error: 'User already exists!'});
    }
    const hash = hashSync(req.body.password, 10);
    await mongo
      .db(process.env.USER_DB)
      .collection(process.env.USER_COL)
      .insertOne({
        email: req.body.email,
        password: hash,
        uuid: v4(),
        questions: [],
      });
    user = await mongo
      .db(process.env.USER_DB)
      .collection(process.env.USER_COL)
      .findOne({
        email: req.body.email,
      });
    const token = jwt.sign(
      {
        userId: user.uuid,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );
    return res.status(200).json({
      token,
    });
  }
  res.status(403).send();
}
