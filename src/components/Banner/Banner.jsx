import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="banner">
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat Alternates",
            }}
          >
            Crypto Jungle
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat Alternates",
            }}
          >
            Find all the Coins and details regarding about Crypto Coins you love
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
