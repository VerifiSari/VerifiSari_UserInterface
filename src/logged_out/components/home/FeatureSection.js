import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import MeassageIcon from "@material-ui/icons/Message";
import CancelIcon from "@material-ui/icons/Cancel";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Data on demand",
    text:
      "Request-based sharing of verifiable work experience to potential employers and interviwers.",
    icon: <img
      src={`${process.env.PUBLIC_URL}/images/card/01.jpg`}
      width="200" height="200"
    />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#00C853",
    headline: "Trusted data",
    text:
      "Maintain employee onboarding and departure information as a proof of work experience.",
    icon: <img
      src={`${process.env.PUBLIC_URL}/images/card/02.jpg`}
      width="200" height="200"
    />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#00C853",
    headline: "Employee hub",
    text:
      "One-stop shop for maintaining all employement related experience certificate and achievements.",
    icon: <img
      src={`${process.env.PUBLIC_URL}/images/card/03.jpg`}
      width="200" height="200"
    />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#00C853",
    headline: "Background check",
    text:
      "Request and verify candidate work experience without waiting for a external background check.",
    icon: <img
      src={`${process.env.PUBLIC_URL}/images/card/04.jpg`}
      width="200" height="200"
    />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#00C853",
    headline: "Plug and Play",
    text:
      "API support for integration with 3rd party appications such as employer website or employement-based social networking and other webites.",
    icon: <img
      src={`${process.env.PUBLIC_URL}/images/card/05.jpg`}
      width="200" height="200"
    />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#00C853",
    headline: "Experience letter",
    text:
      "Issue and maintain employee experience and achievement certificates in the form of NFTs (Non Fungible Token)",
    icon: <img
      src={`${process.env.PUBLIC_URL}/images/card/06.jpg`}
      width="200" height="200"
    />,
    mdDelay: "0",
    smDelay: "0"
  }
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Features
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map(element => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired
};

export default withWidth()(FeatureSection);
