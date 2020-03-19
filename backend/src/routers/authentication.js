import { loginByEmail }                           from '../middlewares/authentication';
import {
  findRefreshToken, getUserByRefreshToken,
  signAccessToken,
  signRefreshToken, updateRefreshToken,
  verifyRefreshToken
}                                                 from '../middlewares/authentication/tokens.js';
import express                                    from 'express';
import { RefreshTokenController, UserController } from '../controllers';
import { createValidationMW }                     from '../middlewares/validation';
import { LOGIN_USER_SCHEMA, SING_UP_USER_SCHEMA } from '../utils/validation/user.js';

const authenticationRoute = express.Router();

const sendAuthData = (req, res, next) => {
  const { accessTokenValue, refreshTokenValue, user } = req;
  res.send( {
              user,
              tokenPair: {
                accessToken: accessTokenValue,
                refreshToken: refreshTokenValue,
              },
            } );
};

authenticationRoute.post( '/sign_in',
                          createValidationMW( LOGIN_USER_SCHEMA ),
                          loginByEmail,
                          signRefreshToken,
                          RefreshTokenController.saveRefreshToken,
                          signAccessToken,
                          sendAuthData
);
authenticationRoute.post( '/refresh_sign_in',
                          verifyRefreshToken,
                          findRefreshToken,
                          getUserByRefreshToken,
                          signRefreshToken,
                          updateRefreshToken,
                          signAccessToken,
                          sendAuthData,
);
authenticationRoute.post( '/sign_up',
                          createValidationMW( SING_UP_USER_SCHEMA ),
                          UserController.createUser,
                          signRefreshToken,
                          RefreshTokenController.saveRefreshToken,
                          signAccessToken,
                          sendAuthData
);

authenticationRoute.post( '/refresh_tokens',
                          verifyRefreshToken,
                          findRefreshToken,
                          getUserByRefreshToken,
                          signRefreshToken,
                          updateRefreshToken,
                          signAccessToken,
                          (req, res) => {
                            const { accessTokenValue, refreshTokenValue } = req;
                            res.send( {
                                        accessToken: accessTokenValue,
                                        refreshToken: refreshTokenValue,
                                      } );
                          }
);

export default authenticationRoute;
