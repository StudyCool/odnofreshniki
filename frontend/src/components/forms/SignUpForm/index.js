import React, { useState }         from 'react';
import { Form, withFormik, Field } from 'formik';
import Button                      from '../Button';
import StyledErrorMessage          from '../StyledErrorMessage';
import Input                       from '../Input';
import Label                       from '../Label';
import styles                      from './SignUpForm.module.scss';
import * as Yup                    from 'yup';
import { signUpUser }              from '../../../api';

const SignUpForm = (props) => {

  const { values, isSubmitting } = props;

  const [fields, setFields] = useState( [
                                          {
                                            name: 'firstName',
                                            type: 'text',
                                            placeholder: 'Name',

                                          },
                                          {
                                            name: 'lastName',
                                            type: 'text',
                                            placeholder: 'Surname',
                                          },
                                          {
                                            name: 'email',
                                            type: 'email',
                                            placeholder: 'Email address',

                                          },
                                          {
                                            name: 'password',
                                            type: 'password',
                                            placeholder: 'Password',

                                          },
                                          {
                                            name: 'confirmPassword',
                                            type: 'password',
                                            placeholder: 'Confirm password',

                                          },
                                        ] );

  const renderFields = () => {

    return fields.map( ({ name, ...rest }) => (
      <Field key={name} name={name} value={values[name]}>
        {
          fieldProps => (
            <Label className={styles.fieldWrapper}>
              <Input {...rest} {...fieldProps}/>
              <StyledErrorMessage className={styles.errorWrapper} name={fieldProps.field.name}/>
            </Label>
          )
        }
      </Field>) );
  };

  return (
    <Form className={styles.form}>
      {
        renderFields()
      }
      <Button className={styles.submitButton} disabled={isSubmitting}
              type='submit'>Create account</Button>
    </Form>
  );
};

export default withFormik( {
                             mapPropsToValues: () => ({
                               firstName: '',
                               lastName: '',
                               email: '',
                               password: 'Test1234',
                               confirmPassword: 'Test1234',
                             }),
                             handleSubmit: async (values, formikBag) => {

                               try {
                                 const { data: { user } } = await signUpUser( values );
                                 formikBag.props.onSubmit( user );
                               } catch (e) {
                                 const { response: { data } } = e;
                                 alert( data );
                               }

                             },
                             validationSchema: Yup.object( {
                                                             firstName: Yup.string().label( 'User name' ).required(
                                                               'don\'t forget your name' ),
                                                             lastName: Yup.string().label( 'User surname' ).required(),
                                                             email: Yup.string().email().required(),
                                                             password: Yup.string()
                                                                          .matches(
                                                                            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,16}$/,
                                                                            'Your password must be 8-16 characters, and include at least one lowercase letter, one uppercase letter, and a number. '
                                                                          )
                                                                          .required(),

                                                             confirmPassword: Yup.string()
                                                                                 .oneOf(
                                                                                   [Yup.ref( 'password' ), null],
                                                                                   'Passwords must match'
                                                                                 ).required(),
                                                           } )
                           } )( SignUpForm );