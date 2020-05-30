import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Formik } from 'formik';

import { SuccessSignUp } from '../SuccessSignUp';
import './SignUp.css'
import { AuthContext } from '../../Context/Auth';
import { Loading } from '../Loading';

const SignUp = props => {

    const history = useHistory();

    const { successSignUp, signUpError, resetErrors, resetSuccessSignUp } = useContext(AuthContext);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    useEffect(() => {
        resetErrors()
        // eslint-disable-next-line
    }, [])

    if (successSignUp) {
        setTimeout(() => {
            history.push('/signin');
            resetSuccessSignUp();
        }, 2000)

        return <SuccessSignUp />
    }

    return (
        <div className='formWrapper'>
            <form noValidate onSubmit={handleSubmit}>
                <h2 className='headStyle'>
                    Sign Up
                    </h2>
                <div className='inputStyle'>
                    <TextField
                        name="username"
                        type="text"
                        label="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.username && !!touched.username}
                        helperText={!!errors.username && !!touched.username ? errors.username : null}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className='inputStyle'>
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.password && !!errors.password}
                        helperText={!!touched.password && !!errors.password ? errors.password : null}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className='inputStyle'>
                    <TextField
                        name="passwordRepeat"
                        type="password"
                        label="Repeat password"
                        value={values.passwordRepeat}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.passwordRepeat && !!touched.passwordRepeat}
                        helperText={!!errors.passwordRepeat && !!touched.passwordRepeat ? errors.passwordRepeat : null}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className='inputStyle'>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit">
                        Sign Up
                    </Button>
                </div>
                <p className='invalidDataStyle'>{!successSignUp && signUpError}</p>
                <div className='inputStyle'>
                    <Link to='/signin' className='linkStyle'>Or sign in</Link>
                </div>
            </form>
        </div>
    );
};

export const SignUpWithFormik = () => {

    const { isAuthenticated, isLoading, signUp } = useContext(AuthContext)
    const history = useHistory();

    const validate = values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (values.username.length > 20) {
            errors.username = 'username should contain no more than 20 characters'
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = 'password should contain at least 6 characters';
        }

        if (!values.passwordRepeat) {
            errors.passwordRepeat = 'Required';
        } else if (values.passwordRepeat !== values.password) {
            errors.passwordRepeat = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = (values) => {
        signUp(values);
    }

    if (isAuthenticated) {
        history.push('/');
    }

    return (
        isLoading
            ? <Loading />
            : <Formik component={SignUp}
                validate={validate}
                initialValues={{
                    username: '',
                    password: '',
                    passwordRepeat: ''
                }}
                onSubmit={handleSubmit} />
    )
}