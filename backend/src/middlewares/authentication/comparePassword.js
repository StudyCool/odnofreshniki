import { User } from '../../models';

import { ForbiddenError } from '../../utils/errors';

import bcrypt from 'bcrypt';

export default async (req, res, next) => {
  try {
    /*
     * {
     *   password: 'Artur1992',
     *   email: 'artur1992@gmail.com'
     * }
     *
     * */

    if (await bcrypt.compare( req.body.password, req.user.password )) {
      return next();
    }
    next( new ForbiddenError() );
  } catch (e) {
    next( e );
  }
}