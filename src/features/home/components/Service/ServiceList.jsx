import { Box } from "@mui/material";
import ServiceCard from "features/home/components/Service/ServiceCard";

const categoryArr = [
  {
    id: "gift-n-awards",
    name: "Gifts & Awards",
    image: "https://i.imgur.com/a4nZ6eg.png",
  },
  {
    id: "id-3d-interaction",
    name: "3D Interaction",
    image: "https://i.imgur.com/IzgZvHd.png",
  },
  {
    id: "repair-appointment",
    name: "Repair Appointment",
    image: "https://i.imgur.com/W86eJOf.png",
  },
  {
    id: "id-247-support",
    name: "24/7 Support",
    image: "https://i.imgur.com/7rDmHtu.png",
  },
  {
    id: "phone-comparison",
    name: "Phone Comparison",
    image: "https://i.imgur.com/9rVwAwR.png",
  },
  {
    id: "return-support",
    name: "Return Support",
    image: "https://i.imgur.com/Ceug5i0.png",
  },
];

const boxStyle = (theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoColumns: "1fr",
  mx: 4,
  rowGap: 1,
  columnGap: 1,
  [theme.breakpoints.only("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 2,
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 3,
  },
});

function ServiceList() {
  return (
    <Box my={2} sx={boxStyle}>
      {categoryArr.map((item) => {
        return (
          <ServiceCard image={item.image} name={item.name} key={item.name} />
        );
      })}
    </Box>
  );
}

export default ServiceList;
