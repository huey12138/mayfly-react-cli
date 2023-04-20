import moment from "moment";

export const getTimePoints = (
  start = "9:00",
  end = "18:30",
  inputFormat = "H:mm",
  intervalMinute = 30,
  resultFormat = "hh mm a"
): string[] => {
  const startTime = moment(start, inputFormat);
  const endTime = moment(end, inputFormat);

  const result = [startTime.format(resultFormat)];
  const mStart = startTime.clone();
  while (mStart.isBefore(endTime)) {
    result.push(mStart.add(intervalMinute, "minute").format(resultFormat));
  }
  return result;
};
