import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttendances } from "../../../store/slices/attendances/slices";
import { motion } from "framer-motion";
import Button from "../../../components/Button";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { attendances, isGetAttendancesLoading } = useSelector((state) => {
    return {
      attendances: state.attendances.data,
      isGetAttendancesLoading: state.attendances.isGetAttendancesLoading,
    };
  });

  const handleShowModal = (action, id) => {
    if (action === "Edit") {
      const attendanceData = attendances.find((item) => item.id === id);
      setSelectedAttendance(attendanceData);
      setShowModal({ show: true, type: action, id });
    }
  };

  useEffect(() => {
    dispatch(getAttendances());
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h3 className="title">Dashboard</h3>
      <div className="mt-4 w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
          <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Date</th>
              <th className="p-3">Name</th>
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
                  <td className="p-3">{item.fullName}</td>
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


    </>
  );
}
