import { Box } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { ReactComponent as GiftCardIcon } from "assets/icons/redeem.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone-android.svg";
import { ReactComponent as BuildIcon } from "assets/icons/build.svg";
import { ReactComponent as SupportAgentIcon } from "assets/icons/support-agent.svg";
import { ReactComponent as HandshakeIcon } from "assets/icons/handshake.svg";
import { ReactComponent as LocalPhoneIcon } from "assets/icons/call.svg";

const categoryArr = [
  { id: "gift-n-awards", name: "Gifts & Awards", Icon: GiftCardIcon },
  { id: "id-3d-interaction", name: "3D Interaction", Icon: PhoneIcon },
  { id: "repair-appointment", name: "Repair Appointment", Icon: BuildIcon },
  { id: "id-247-support", name: "24/7 Support", Icon: SupportAgentIcon },
  { id: "phone-comparison", name: "Phone Comparison", Icon: HandshakeIcon },
  { id: "return-support", name: "Return Support", Icon: LocalPhoneIcon },
];

const boxStyle = (theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoColumns: "1fr",
  gap: 1,
  mx: 0,
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 1,
    mx: 6,
  },
  [theme.breakpoints.only("md")]: {
    gap: 1.75,
    mx: 4,
  },
});

function ServiceList() {
  return (
    <Box my={2} sx={boxStyle}>
      {categoryArr.map((item) => {
        return (
          <ServiceCard iconImage={item.Icon} name={item.name} key={item.name} />
        );
      })}
    </Box>
  );
}

export default ServiceList;
