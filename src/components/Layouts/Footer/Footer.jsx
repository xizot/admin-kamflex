import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Facebook, GitHub, Instagram } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './Footer.styles';
function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container>
        <Grid container className={classes.content}>
          <Grid item xs={6} sm={3}>
            <ul className={classes.options}>
              <li className={classes.optionItem}>
                <Link to="/">Contact</Link>
              </li>
              <li className={classes.optionItem}>
                <Link to="/">About Us</Link>
              </li>
              <li className={classes.optionItem}>
                <Link to="/">License</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ul className={classes.options}>
              <li className={classes.optionItem}>
                <Link to="/">Browse</Link>
              </li>
              <li className={classes.optionItem}>
                <Link to="/">Movies</Link>
              </li>
              <li className={classes.optionItem}>
                <Link to="/">TV Show</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ul className={classes.options}>
              <li className={classes.optionItem}>
                <Link to="/">
                  <Facebook className={classes.optionItemIcon} />
                  Facebook
                </Link>
              </li>
              <li className={classes.optionItem}>
                <Link to="/">
                  <Instagram className={classes.optionItemIcon} />
                  Instagram
                </Link>
              </li>
              <li className={classes.optionItem}>
                <Link to="/">
                  <GitHub className={classes.optionItemIcon} />
                  Github
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
      <Box>
        <Typography variant="body1" className={classes.copyright}>
          Copyright © 2021 PhimChua. All Rights reserved.
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
