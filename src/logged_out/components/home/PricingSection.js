import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    }
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  }
});

function PricingSection(props) {
  const { width, classes } = props;
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        <b>Preview</b>
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >
          {/* <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            className={classes.cardWrapper}
            data-aos="zoom-in-up"
          >
            <PriceCard
              title="Starter"
              pricing={
                <span>
                  $14.99
                  <Typography display="inline"> / month</Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <PriceCard
              highlighted
              title="Premium"
              pricing={
                <span>
                  $29.99
                  <Typography display="inline"> / month</Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid> */}
          
        </Grid>
        <div class="row">
  <div class="col-sm-6">
    <div class="card">
    <img
    src={`${process.env.PUBLIC_URL}/images/logged_out/comp.jpg`}
    class="card-img-top"
    alt="..."
    height="400px"
    width="400px"
  />
      <div class="card-body">
        <h5 class="card-title">Company</h5>
        <p class="card-text">
        Are you looking to verify Job applicants work experience and issue work experience certificates in secure manner?
        </p>
        <a href="#" class="btn btn-primary">Explore</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
    <img
    src={`${process.env.PUBLIC_URL}/images/logged_out/employee.png`}
    class="card-img-top"
    alt="..."
    height="400px"
    width="400px"
  />
      <div class="card-body">
        <h5 class="card-title">Employee</h5>
        <p class="card-text">
        Are you looking to share your work experience with potential employers and maintain your work achievements in secured manner?
        </p>
        <a href="#" class="btn btn-primary">Explore</a>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(PricingSection)
);
