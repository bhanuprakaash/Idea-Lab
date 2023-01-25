import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto',
  },
  grid: {
    padding: theme.spacing(2),
  }
}));

export default function Profile(props) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Avatar alt={"avatar"} src="" className={classes.large} />
              <Typography variant="h5" component="h2">
                {"Bhanu Prakash Sai"}
              </Typography>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <Typography className={classes.pos} color="textSecondary">
                {"bhanuprakashsai13@gmail.com"}
              </Typography>
              <Typography variant="body2" component="p">
                Bio: {"Student"}
              </Typography>
              <Typography variant="body2" component="p">
                Skills: {"C++, Python, Java"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.grid}>
          "Add code for displaying user's posts or projects here"
          "fjfkjk"
        </Grid>
      </Grid>
    </div>
  );
}
