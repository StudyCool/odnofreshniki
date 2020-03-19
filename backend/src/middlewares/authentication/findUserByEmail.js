import { User } from '../../models';

import { ResourceNotFoundError } from '../../utils/errors';

export default async (req, res, next) => {
  try {

    req.user = await User.findOne( {
                                     where: {
                                       email: req.body.email,
                                     }
                                   } );
    if (req.user) {
      return next();
    }
    next( new ResourceNotFoundError( User.name ) );

  } catch (e) {
    next( e );
  }
}