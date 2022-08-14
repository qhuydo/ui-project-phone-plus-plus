import { Slide, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";

const HideOnScroll = ({ children, forceShow }) => {
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger || forceShow}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element,
  forceShow: PropTypes.bool,
};

export default HideOnScroll;
