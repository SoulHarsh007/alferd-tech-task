import {dbConnect} from '../../utils/mongodb.js';
import {compareSync} from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @async
 * @function loginHandler
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Login handling api
 * @param {import('next').NextApiRequest} req - Incoming request with next.js default middleware and helpers
 * @param {import('next').NextApiResponse} res - Incoming request with next.js default middleware and helpers
 * @returns {Promise<void>} returns void
 */
export default async function loginHandler(req, res) {
  if (req.method === 'POST') {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        error: 'Missing Fields',
      });
    }
    const mongo = await dbConnect();
    const user = await mongo
      .db(process.env.USER_DB)
      .collection(process.env.USER_COL)
      .findOne({
        email: req.body.email,
      });
    if (!user) {
      return res.status(404).json({
        error: "User doesn't exist!",
      });
    }
    if (compareSync(req.body.password, user.password)) {
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
    return res.status(401).json({
      error: 'Incorrect password!',
    });
  }
  res.status(403).send();
}
