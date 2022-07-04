import PropTypes from "prop-types";
import { Slide, useScrollTrigger } from "@mui/material";

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
