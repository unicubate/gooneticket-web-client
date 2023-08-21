import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
require(`dayjs/locale/fr`);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale(`fr`);

export const formateDateDayjs = (date: Date) => {
  const todaysDate = new Date();
  const dateInit = dayjs(date);
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.format("YYYY"));
  return currentYear === dateYear
    ? dateInit.format("ll")
    : dateInit.format("DD/MM/YYYY");
};

export const getMonthFormatDays = (date: Date) => {
  const currentMouth = dayjs(date).locale("fr").format("MMM");
  return currentMouth;
};

export const formateDaysMonthYearFormatDays = (date: Date) => {
  const currentMouth = dayjs(date).locale("fr").format("DD MMM YYYY");
  return currentMouth;
};

export const formateDDMMYYHH = (date: Date) => {
  return date ? dayjs(date).locale("fr").format("DD/MM/YYYY HH:mm") : null;
};

export const formateDMYHH = (date: Date) => {
  return date ? dayjs(date).locale("fr").format("DD MMM YYYY HH:mm") : null;
};

export const formateDDMMYYYY = (date: Date) => {
  return date ? dayjs(date).format("DD/MM/YYYY") : null;
};

export const formateFromNow = (date: Date) => {
  return date ? dayjs(date).locale("fr").fromNow() : null;
};

export const subtractYears = (numOfYears: number, date: Date) => {
  const dateSub = new Date(date.getTime());
  dateSub.setFullYear(dateSub.getFullYear() - numOfYears);
  return dateSub;
};
