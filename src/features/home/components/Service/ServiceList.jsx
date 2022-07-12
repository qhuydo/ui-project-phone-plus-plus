import { Box } from "@mui/material";
import ServiceCard from "features/home/components/Service/ServiceCard";
import {
  BuildFilledIcon,
  BuildIcon,
  GiftCardIcon,
  HandshakeFilledIcon,
  HandshakeIcon,
  LocalPhoneFilledIcon,
  LocalPhoneIcon,
  PhoneFilledIcon,
  PhoneIcon,
  SupportAgentIcon,
} from "features/home/assets/icons";

const categoryArr = [
  {
    id: "gift-n-awards",
    name: "Gifts & Awards",
    Icon: GiftCardIcon,
    FilledIcon: GiftCardIcon,
  },
  {
    id: "id-3d-interaction",
    name: "3D Interaction",
    Icon: PhoneIcon,
    FilledIcon: PhoneFilledIcon,
  },
  {
    id: "repair-appointment",
    name: "Repair Appointment",
    Icon: BuildIcon,
    FilledIcon: BuildFilledIcon,
  },
  {
    id: "id-247-support",
    name: "24/7 Support",
    Icon: SupportAgentIcon,
    FilledIcon: SupportAgentIcon,
  },
  {
    id: "phone-comparison",
    name: "Phone Comparison",
    Icon: HandshakeIcon,
    FilledIcon: HandshakeFilledIcon,
  },
  {
    id: "return-support",
    name: "Return Support",
    Icon: LocalPhoneIcon,
    FilledIcon: LocalPhoneFilledIcon,
  },
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
          <ServiceCard
            iconImage={item.Icon}
            filledIconImage={item.FilledIcon}
            name={item.name}
            key={item.name}
          />
        );
      })}
    </Box>
  );
}

export default ServiceList;
