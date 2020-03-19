import jwt                    from 'jsonwebtoken';
import util                   from 'util';
import { AuthorizationError } from '../../utils/errors';
import { RefreshToken }       from './../../models';

const sign = util.promisify( jwt.sign );
const verify = util.promisify( jwt.verify );

export const verifyRefreshToken = async (req, res, next) => {
  try {
    const { body: { refreshToken } } = req;
    req.refreshTokenPayload = await verify( refreshToken, 'secret' );
    next();
  } catch (e) {
    next( new AuthorizationError() );
  }
};

export const signRefreshToken = async (req, res, next) => {
  try {
    const { user } = req;
    req.refreshTokenValue = await sign( {
                                          userId: user.id,
                                        }, 'secret', {
                                          expiresIn: '30d',
                                        } );
    next();

  } catch (e) {
    next( e );
  }
};
export const signAccessToken = async (req, res, next) => {
  try {
    const { user } = req;
    req.accessTokenValue = await sign( {
                                         userId: user.id,
                                         email: user.email,
                                       }, 'secret', {
                                         expiresIn: '20s',
                                       } );

    next();
  } catch (e) {
    next( e );
  }
};

export const findRefreshToken = async (req, res, next) => {
  try {

    const {
      body: { refreshToken: refreshTokenValue }, refreshTokenPayload: {
        userId
      }
    } = req;
    req.refreshToken = await RefreshToken.findOne( {
                                                     where: {
                                                       value: refreshTokenValue,
                                                       userId,
                                                     }
                                                   } );
    if (req.refreshToken) {

      return next();
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthorizationError() );
  }

};

export const getUserByRefreshToken = async (req, res, next) => {
  try {
    const user = (await req.refreshToken.getUser());

    if (user) {
      const prepareUser = user.get();
      delete prepareUser.password;
      req.user = prepareUser;
      return next();
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthorizationError() );
  }
};

export const updateRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken, refreshTokenValue } = req;
    const updatedRefreshToken = await refreshToken.update( {
                                                             value: refreshTokenValue
                                                           } );

    if (updatedRefreshToken) {
      return next();
    }
    next( new AuthorizationError() );
  } catch (e) {
    next( new AuthorizationError() );
  }

};