import { Slide, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element,
};

export default HideOnScroll;
