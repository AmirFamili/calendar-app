import dayjs from "dayjs";

export const getMonth = (month = dayjs().month(),year = dayjs().year()) => {
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  const dayMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill([null]).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return dayMatrix;
};

export const getDay = (day = dayjs().date(),month = dayjs().month(),year = dayjs().year()) => {

  const firstHourOfTheDay = dayjs(new Date(year, month, day, 1)).hour();
  let currentDayCount = 0 - firstHourOfTheDay;

  const hourMatrix = new Array(24).fill([]).map(() => {
    currentDayCount++;
    return dayjs(new Date(year, month, day, currentDayCount));
  });
  return hourMatrix;
};
