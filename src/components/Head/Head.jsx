import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

export const Head = ({ title, description }) => {
  return (
    <Helmet
      title={title ? `${title} | PHONE++` : undefined}
      defaultTitle="PHONE++"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};

Head.defaultProps = {
  title: "",
  description: "",
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
