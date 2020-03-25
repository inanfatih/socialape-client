import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'; //built in react for type checking. Minimizes potential errors
import AppIcon from '../images/Monkey.png';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
    width: 200,
  },
};
class login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt='Monkey' className={classes.image} />
          <Typography variant='h2' className={classes.pageTitle}>
            Login
          </Typography>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
