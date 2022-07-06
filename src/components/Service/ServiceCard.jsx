import { Card, Link, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

const cardStyle = (theme) => ({
  borderWidth: `2px`,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 5,
  },
});

function ServiceCard(props) {
  const IconImage = props.iconImage;
  const serviceName = props.name;

  const [isSelected, setSelected] = useState(false);

  const iconStyle = () => ({
    width: "100px",
    height: "100px",
    color: isSelected ? "white" : "secondary.dark",
  });

  const onMouseOver = useCallback(() => {
    setSelected(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setSelected(false);
  }, []);

  return (
    <Card
      variant="outlined"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      sx={cardStyle}
    >
      {/*TODO navigate to product details page*/}
      <Link
        color="inherit"
        underline="none"
        component={RouterLink}
        to={`/phones/`}
      >
        <Stack
          spacing={1}
          direction="column"
          sx={{ py: { xs: 2, sm: 0 } }}
          alignItems="center"
        >
          <IconImage sx={iconStyle} />
          <Typography
            variant="h6"
            fontWeight="bold"
            color={isSelected ? "white" : "secondary"}
          >
            {serviceName}
          </Typography>
        </Stack>
      </Link>
    </Card>
  );
}
ServiceCard.propTypes = {
  iconImage: PropTypes.element,
  name: PropTypes.element,
};

export default ServiceCard;
