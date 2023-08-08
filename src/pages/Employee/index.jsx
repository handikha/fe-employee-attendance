import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clockIn,
  clockOut,
  getAttendances,
} from "../../store/slices/attendances/slices";
import { motion } from "framer-motion";

export default function Employee({ user }) {
  const dispatch = useDispatch();
  const { attendances, isGetAttendancesLoading, isClockLoading } = useSelector(
    (state) => {
      return {
        attendances: state.attendances.data,
        isGetAttendancesLoading: state.attendances.isGetAttendancesLoading,
        isClockLoading: state.attendances.isClockLoading,
      };
    }
  );

  const greeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const [time, setTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAttendance = (type) => {
    if (type === "clockin") {
      dispatch(clockIn());
    }

    if (type === "clockout") {
      dispatch(clockOut());
    }
  };

  const [isClockIn, setIsClockIn] = useState(false);
  const [isClockOut, setIsClockOut] = useState(false);

  useEffect(() => {
    const today = new Date("2023-08-01").toLocaleDateString();
    // const today = new Date().toLocaleDateString();

    const clockInToday =
      Array.isArray(attendances) &&
      attendances.length > 0 &&
      attendances.find(
        (attendance) => attendance.date === today && attendance.clockIn !== null
      );
    setIsClockIn(!!clockInToday);

    const clockOutToday =
      Array.isArray(attendances) &&
      attendances.length > 0 &&
      attendances.find(
        (attendance) => attendance.date === today && attendance.clockIn !== null
      );
    setIsClockOut(!!clockOutToday);

    console.log(attendances);
  }, [attendances]);

  useEffect(() => {
    dispatch(getAttendances());
  }, [isClockLoading]);

  return (
    <div className="container  px-4 py-24">
      <div className="flex flex-col items-center justify-center">
        <h3>
          {greeting()}, {user.fullName}!
        </h3>
        <div className="">{time}</div>
        <div className="">Your worked hours</div>
        <div className="flex gap-4">
          <div className="">08:00:00 AM</div>
          <div className=""> - </div>
          <div className="">05:00:00 PM</div>
        </div>
        <div className="flex gap-3">
          <Button
            isButton
            isPrimary
            title="Clock In"
            className="w-40"
            isDisabled={isClockIn}
            onClick={() => handleAttendance("clockin")}
          />
          <Button
            isButton
            isPrimary
            title="Clock Out"
            className="w-40"
            isDisabled={isClockOut}
            onClick={() => handleAttendance("clockout")}
          />
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
          <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Date</th>
              <th className="p-3">Clock In</th>
              <th className="p-3">Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {isGetAttendancesLoading ? (
              <tr className="text-center">
                <td colSpan={7} className="p-3">
                  <div className="mx-auto block h-6 w-6 animate-spin rounded-full border-[3px] border-r-transparent">
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : Array.isArray(attendances) && attendances.length > 0 ? (
              attendances.map((item, index) => (
                <motion.tr
                  initial={{
                    opacity: 0,
                  }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: index * 0.05 }}
                  key={index}
                  className="cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/40"
                >
                  <th
                    scope="row"
                    className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.clockIn}</td>
                  <td className="p-3">{item.clockOut}</td>
                </motion.tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={7} className="p-3">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
