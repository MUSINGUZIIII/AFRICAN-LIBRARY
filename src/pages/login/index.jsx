import React, { useContext } from "react";
import { loginStyle } from "./style";
import {
  Breadcrumbs,
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import ValidationErrorMessage from "../../components/ValidationErrorMessage";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../../service/auth.service";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/auth";

export const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be more than 5 charector")
      .required("Password is required."),
  });

  const classes = loginStyle();

  // console.log("user loggedin" authContext.user)

  const onSubmit = (data) => {
    authService.login(data).then((res) => {
      toast.success("Login successfully");
      authContext.setUser(res);
    });
  };

  return (
    <div className={classes.loginWrapper}>
      <div className="login-page-wrapper">
        <div className="container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="breadcrumb-wrapper"
          >
            <Link color="inherit" href="/" title="Home">
              Home
            </Link>
            <Typography style={{ color: '#3385ff' }} >ABOUT</Typography>
          </Breadcrumbs>
          <Typography variant="h1">AFRICAN LIBRARY PROJECT</Typography>
          <p variant="h1"> African Libary project is a source of East African literature. 
          It comprises of books by great writers from Uganda, Kenya,
          Tanzania, Rwanda , Burundi, etc.
          Over the years, East African culture has been infiltrated by the western culture.
           African Library Project is fighting hard to revive the culture by selling these authors' books.
           come and support us  in this fight, Thank you!   </p>
          <Typography variant="h1">Login or Create an Account</Typography>
          <div className="login-row">
            <div className="content-col">
              <div className="top-content">
                <Typography variant="h2"> Registration</Typography>
                <List className="bullet-list">
                  <ListItem>To create a customer profile</ListItem>
                  <ListItem>To provide customer service</ListItem>
                  <ListItem>To market products or services to customers</ListItem>
                </List>
              </div>
              <div className="btn-wrapper">
                <Button
                  // className="pink-btn btn"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create an Account
                </Button>
              </div>
            </div>
            <div className="form-block">
              <Typography variant="h2">Registered Customers</Typography>
              <p>If you have an account already, please log in.</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-row-wrapper">
                      <div className="form-col">
                        <TextField
                          id="email"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Email Address *"
                          autoComplete="off"
                          variant="outlined"
                          inputProps={{ className: "small" }}
                        />
                        <ValidationErrorMessage
                          message={errors.email}
                          touched={touched.email}
                        />
                      </div>
                      <div className="form-col">
                        <TextField
                          id="password"
                          name="password"
                          label="Password *"
                          type="password"
                          variant="outlined"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{ className: "small" }}
                          autoComplete="off"
                        />
                        <ValidationErrorMessage
                          message={errors.password}
                          touched={touched.password}
                        />
                      </div>
                      <div className="btn-wrapper">
                        <Button
                          type="submit"
                          // className="pink-btn btn"
                          variant="contained"
                          color="primary"
                          disableElevation
                          onClick={handleSubmit}
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;