import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Formik } from 'formik';

import './SignIn.css';
import { AuthContext } from '../../Context/Auth';
import { Loading } from '../Loading';

const SignIn = (props) => {



    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;



    return (
        <div className='formWrapper'><form noValidate onSubmit={handleSubmit}>
            <h2 className='headStyle'>Sign In</h2>
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
                    error={!!errors.password && !!touched.password}
                    helperText={!!errors.password && !!touched.password ? errors.password : null}
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
                    Sign In
                    </Button>
            </div>
            {errors.common && <p className='invalidDataStyle'>{errors.common}</p>}
            <div className='inputStyle'>
                <Link to='/signup' className='linkStyle'>Or create new account</Link>
            </div>
        </form>
        </div >
    );
};


export const SignInWithFormik = () => {

    const { isAuthenticated, isLoading, login } = useContext(AuthContext)
    const history = useHistory();

    const validate = values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    };

    const handleSubmit = (values) => {
        login(values);
    }

    if (isAuthenticated) {
        history.push('/');
    }

    return (
        isLoading
            ? <Loading />
            : <Formik component={SignIn}
                validate={validate}
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={handleSubmit} />
    )
}