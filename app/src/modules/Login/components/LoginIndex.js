import { useCallback } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import FacebookIcon from "../../icons/Facebook";
import GoogleIcon from "../../icons/Google";
import FaceIcon from "@mui/icons-material/Face";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginIndex = (props) => {
  const { keycloak } = useKeycloak();

  const kcLogin = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center"
        }}>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "demo@devias.io",
              password: "Password123"
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
              password: Yup.string().max(255).required("Password is required")
            })}
            onSubmit={() => {
              navigate("/app/dashboard", { replace: true });
            }}>
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={(e) => handleSubmit()}
                      size="large"
                      variant="contained">
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={(e) => handleSubmit()}
                      size="large"
                      variant="contained">
                      Login with Google
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button fullWidth startIcon={<FaceIcon />} onClick={kcLogin} size="large" variant="contained">
                      Login with Aloi
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}>
                  <Typography align="center" color="textSecondary" variant="body1">
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};
export default LoginIndex;
