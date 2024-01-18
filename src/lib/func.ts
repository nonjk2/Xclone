import { ActionType } from "@/components/main/center/home/HomeListItemActionBar";

const convertToJSDate = (javaDate: Date): Date => {
  const date = new Date(javaDate);
  date.setHours(date.getHours() - 9);
  return date;
};

const getTimeAgo = (javaDate: Date): string => {
  const date = convertToJSDate(javaDate);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
  }
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

const switchColor = (type: ActionType) => {
  switch (type) {
    case "RePost":
      return {
        hoverCircle: "group-hover:bg-hoverGreen",
        hoverText: "group-hover:text-green",
        hoverIcon: "group-hover:text-green",
      };
    case "Heart":
      return {
        hoverCircle: "group-hover:bg-hoverRed",
        hoverText: "group-hover:text-red",
        hoverIcon: "group-hover:text-red",
      };

    default:
      return {
        hoverCircle: "group-hover:bg-hoverLightBlue",
        hoverText: "group-hover:text-blue",
        hoverIcon: "group-hover:text-blue",
      };
  }
};

export { convertToJSDate, getTimeAgo, switchColor };
