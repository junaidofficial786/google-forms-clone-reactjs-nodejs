import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import { Icon, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import formService from "../../services/formService";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    position: "relative",
    marginInline: "auto",
  },
  media: {
    height: 140,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function OneForm(props) {
  const classes = useStyles();

  const [form, setForm] = React.useState({});

  React.useEffect(() => {
    //console.log(props.formData)
    setForm(props.formData);
  }, [props.formData]);

  const deleteForm = async (formId) => {
    try {
      const formDelete = await formService.deleteForm(formId, props.userId);
      console.log(formDelete);
    } catch (error) {}
  };
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.root}>
        <CardActionArea href={"/form/" + form._id}>
          <CardMedia
            className={classes.media}
            image="https://static.makeuseof.com/wp-content/uploads/2019/06/AutoGradingQuizResults-GoogleForms.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {form.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {form.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Opened: <Moment fromNow>{form.updatedAt}</Moment>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => deleteForm(form._id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
