import React from "react";

import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ViewListIcon from "@material-ui/icons/ViewList";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import CardActionArea from "@material-ui/core/CardActionArea";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import IconButton from "@material-ui/core/IconButton";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://www.stillthristy.in/">
        Rohit Saini
      </Link>
      {" © "}
      <Link color="inherit" href="https://github.com/rohitsaini1196">
        GitHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },

  footer: {
    backgroundColor: "#DAE0E2",
    padding: theme.spacing(2),
    position: "relative",
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:
      "url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttongg: {
    backgroundColor: "teal",
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

const cards = [];

export default function LangingPage() {
  const classes = useStyles();
  let history = useHistory();

  function loginClick() {
    history.push("/login");
  }

  return (
    <div>
      <CssBaseline />
      <div style={{ display: "flex", flexGrow: 1, textAlign: "start" }}>
        <AppBar position="relative" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <ViewListIcon className={classes.icon} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Google Form Clone
            </Typography>
            <Button color="inherit" onClick={loginClick}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <main style={{ textAlign: "start" }}>
        <div>
          <Container>
            <br></br>
            <br></br>
            <br></br>
            <Paper className={classes.mainFeaturedPost}>
              {/* Increase the priority of the hero background image */}
              {
                <img
                  style={{ display: "none" }}
                  src="https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="gg"
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      Google Form Clone
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      Plan your next camping trip, manage event registrations,
                      whip up a quick poll, create a pop quiz, and much more.
                    </Typography>
                    <div className={classes.buttons}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttongg}
                        onClick={() => history.push("/register")}
                      >
                        Signup Now
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttongg}
                        onClick={loginClick}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <br></br>
            <br></br>
            <br></br>
          </Container>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </main>
    </div>
  );
}

var gg = `
<Typography variant="h5" align="center" color="textSecondary" paragraph>
            Plan your next camping trip, manage event registrations, whip up a quick poll, create a pop quiz, and much more.


              Fast and easy solution for collecting data, conducting quizzes, getting something reviewed within seconds. With user friedly interface and smart features you can even conduct exams.
            </Typography>
            `;
