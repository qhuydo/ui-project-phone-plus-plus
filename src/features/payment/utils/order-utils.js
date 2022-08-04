import { DELIVERY_DATE_FORMAT } from "features/payment/utils/constants";
import moment from "moment";

export function getEstimatedDeliveryDate(type, date) {
  if (type === "standard") {
    return moment(date ?? new Date())
      .add(4, "day")
      .format(DELIVERY_DATE_FORMAT);
  }
  return moment(date ?? new Date())
    .add(2, "day")
    .format(DELIVERY_DATE_FORMAT);
}
