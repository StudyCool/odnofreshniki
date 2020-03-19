import React               from 'react';
import PropTypes           from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AccessRoute = ({ permissions, to, ...rest }) => {

  const user = JSON.parse( sessionStorage.getItem( 'user' ) );

  const checkAccess = () => user && user.roles.some(
    role =>  permissions.includes( role )
  );
  return (
    checkAccess()
    ? <Route {...rest}/>
    : <Redirect to={to}/>

  );
};

AccessRoute.propTypes = {
  permissions: PropTypes.arrayOf( PropTypes.string ).isRequired,
  to: PropTypes.oneOfType( [
                             PropTypes.string,
                             PropTypes.object,
                           ] ).isRequired,
};

export default AccessRoute;