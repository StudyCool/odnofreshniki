import React                                   from 'react';
import { withRouter }                          from 'react-router';
import { Redirect }                            from 'react-router-dom';
import styles                                  from './SignInPage.module.css';
import SignInForm                              from '../../components/forms/SignInForm';
import { loginUser }                           from '../../api';
import withContext                             from '../../components/HoCs/withContext.js';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../constants';

const SignInPage = props => {

  const { user, setUser } = props;

  const formSubmitHandler = (user) => {
    setUser( user );
  };

  if (user) {
    return <Redirect to={'/'}/>;
  }

  return (
    <div className={styles.container}>
      <SignInForm onSubmit={formSubmitHandler}/>
    </div>
  );
};

export default withContext( withRouter( SignInPage ) );