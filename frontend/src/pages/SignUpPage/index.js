import React          from 'react';
import { withRouter } from 'react-router';
import { Redirect }   from 'react-router-dom';
import SignUpForm     from '../../components/forms/SignUpForm';
import styles         from './SignUpPage.module.scss';
import AppContext     from './../../store';
import withContext    from '../../components/HoCs/withContext.js';

const SignUpPage = (props) => {
  const { user, setUser } = props;

  if (user) {
    return <Redirect to={'/'}/>;
  }
  return (
    <div className={styles.container}>
      <SignUpForm onSubmit={setUser}/>
    </div>
  );

};

export default withRouter( withContext( SignUpPage ) );