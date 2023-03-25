import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { Link, Navigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import { userSchema, userInitial } from '../../schemas/user.schema'
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../api/auth.service';

function SignIn() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);
  const handleSubmit = (formValues) => {
    console.log({
      username: formValues.username,
      password: formValues.password,
    });

    authService.signIn(dispatch, formValues);
  };

  if (auth.logged) {
    return <Navigate to="/home" />;
  }

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box>
              <Formik
                  initialValues={userInitial}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}
                >
                {({ errors, isValid, touched, dirty }) => (
                  <Form>
                    <Field
                      type="text"
                      name="username"
                      as={TextField}
                      label="Username"
                      variant="outlined"
                      fullWidth 
                      sx={{ mt: 1 }} 
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <Field
                      type="password"
                      name="password"
                      as={TextField}
                      label="Password"
                      variant="outlined"
                      fullWidth 
                      sx={{ mt: 1 }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!dirty ||!isValid}
                    >
                      Sign In
                    </Button>
                  </Form>
                )}
              </Formik>
              <Grid container>
                <Grid item>
                  <Link to="/signup" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
export default SignIn;