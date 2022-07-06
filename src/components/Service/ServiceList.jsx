import { Card, CardActionArea } from "@mui/material";
import ServiceCard from "./ServiceCard";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import BuildIcon from "@mui/icons-material/Build";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const categoryArr = [
  { name: "Gifts & Awards", Icon: CardGiftcardIcon },
  { name: "3D Interaction", Icon: PhoneIphoneIcon },
  { name: "Repair Appointment", Icon: BuildIcon },
  { name: "24/7 Support", Icon: SupportAgentIcon },
  { name: "Phone Comparison", Icon: HandshakeIcon },
  { name: "Return Support", Icon: LocalPhoneIcon },
];

const cardStyle = {
  mx: 6,
  borderStyle: "none",
};

const cardActionArea = {
  ".MuiCardActionArea-focusHighlight": {
    bgcolor: "transparent",
  },
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridAutoColumns: "1fr",
  gap: 6,
};

function ServiceList() {
  return (
    <Card variant="outlined" sx={cardStyle}>
      <CardActionArea sx={cardActionArea} component="div">
        {categoryArr.map((item) => {
          return (
            <ServiceCard
              iconImage={item.Icon}
              name={item.name}
              key={item.name}
            />
          );
        })}
      </CardActionArea>
    </Card>
  );
}

export default ServiceList;
