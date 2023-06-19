import authService from "../services/authService";
import { useHistory } from "react-router-dom";
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ViewListIcon from "@material-ui/icons/ViewList";
import { Paper, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Register(props) {
  const classes = useStyles();
  let history = useHistory();
  const { from } = props.location.state || { from: { pathname: "/" } };
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogined, setIsLogined] = React.useState(false);

  React.useEffect(() => {
    setIsLogined(authService.isAuthenticated());
  }, []);

  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const register = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setIsPasswordError(true);
      return;
    }
    authService
      .register(user)
      .then(
        () => {
          history.push("/login");
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setUser({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        });
      });
  };
  if (isLogined) {
    history.push("/");
  }
  return (
    <div>
      <CssBaseline />
      <div style={{ display: "flex", flexGrow: 1, textAlign: "start" }}>
        <AppBar position="relative" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <ViewListIcon
              className={classes.icon}
              onClick={() => {
                history.push("/");
              }}
            />

            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Google Form Clone
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br></br>
      <main>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <br></br>
        <br></br>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary" disabled>
                  Register
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Paper
              elevation={3}
              style={{
                maxWidth: "500px",
                margin: "auto",
              }}
            >
              {/* Login View */}
              <form onSubmit={register}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <TextField
                      id="outlined-name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      name="name"
                      required
                      value={user.name}
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <TextField
                      id="outlined-email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      name="email"
                      required
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <TextField
                      id="outlined-password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      name="password"
                      required
                      value={user.password}
                      type="password"
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <TextField
                      id="outlined-confirmPassword"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      required
                      name="confirmPassword"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e) => {
                        setUser({ ...user, confirmPassword: e.target.value });
                      }}
                      error={isPasswordError}
                    />
                    {
                      <div style={{ textAlign: "left" }}>
                        {isPasswordError ? (
                          <Typography variant="caption" color="error">
                            Passwords do not match
                          </Typography>
                        ) : null}
                      </div>
                    }
                  </div>

                  <div style={{ padding: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
