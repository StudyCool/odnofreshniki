import React               from 'react';
import PropTypes           from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ to, ...rest }) => {

  const user = sessionStorage.getItem( 'user' );

  return (
  user
    ? <Route {...rest}/>
    : <Redirect to={to}/>
  );
};

PrivateRoute.propTypes = {
  to: PropTypes.oneOfType( [
                             PropTypes.string,
                             PropTypes.object,
                           ] ).isRequired,
};

export default PrivateRoute;