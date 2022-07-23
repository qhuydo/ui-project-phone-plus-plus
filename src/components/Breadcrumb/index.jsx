import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Router } from "routes";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PropTypes from "prop-types";

export const DefaultBreadcrumb = ({ links, currentPage }) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mt: 2 }}
    >
      <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to={Router.HOME}
      >
        Home
      </Link>
      {links.map((link, idx) => (
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          key={idx}
          to={link.to}
        >
          {link.page}
        </Link>
      ))}

      <Typography color="text.primary">{currentPage}</Typography>
    </Breadcrumbs>
  );
};

DefaultBreadcrumb.defaultProps = {
  links: [],
  currentPage: "",
};

DefaultBreadcrumb.propTypes = {
  links: PropTypes.array,
  currentPage: PropTypes.string,
};
