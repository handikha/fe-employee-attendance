import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayrollData } from "../../store/slices/payroll/slices";
import { motion } from "framer-motion";
import { HiMinus } from "react-icons/hi2";
import formatNumber from "../../utils/formatNumber";

export default function Payroll({ user }) {
  const dispatch = useDispatch();
  const { payrollReport, isGetPayrollLoading } = useSelector((state) => {
    return {
      payrollReport: state.payroll.data,
      isGetPayrollLoading: state.payroll.isGetPayrollLoading,
    };
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sort, setSort] = useState("asc");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    dispatch(
      getPayrollData({
        startDate,
        endDate,
        sort,
      })
    );
  }, [sort, startDate, endDate]);

  const attendances = payrollReport?.attendances;

  console.log(payrollReport);
  return (
    <div className="container  px-4 py-24">
      <h3>Payroll Report</h3>
      <div className="my-4 flex items-center gap-4">
        <p className="text-base">Select Date : </p>
        <div className="">
          <input
            className="rounded-lg border bg-inherit p-2 focus:outline-primary"
            type="date"
            id="startDatePicker"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
          />
        </div>

        <p className="text-base">to</p>

        <div className="">
          <input
            className="rounded-lg border bg-inherit p-2 focus:outline-primary"
            type="date"
            id="endDatePicker"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
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
            {isGetPayrollLoading ? (
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
                  <td className="p-3">
                    {item.clockOut ? item.clockOut : "--:--:--"}
                  </td>
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

      <div className="mt-10 flex items-center gap-2 font-semibold">
        <p className=" text-lg ">Result for period </p>

        <span className="flex items-center gap-2">
          {payrollReport.period?.startDate}
          <HiMinus />
          {payrollReport.period?.endDate}
        </span>
      </div>
      <div className=" w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-gray-500 dark:text-gray-400 mt-4 w-full text-left text-sm">
          <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
            <tr>
              <th className="p-3">Base Salary</th>
              <th className="p-3">Daily Salary</th>
              <th className="p-3">Working Days</th>
              <th className="p-3">Total Salary</th>
              <th className="p-3">Deduction</th>
              <th className="p-3">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="p-3">{formatNumber(payrollReport.baseSalary)}</td>
              <td className="p-3">{formatNumber(payrollReport.dailySalary)}</td>
              <td className="p-3">{payrollReport.totalWorkingDays}</td>
              <td className="p-3">
                {formatNumber(
                  payrollReport.totalWorkingDays * payrollReport.dailySalary
                )}
              </td>
              <td className="p-3">
                {formatNumber(payrollReport.totalDeduction)}
              </td>
              <td className="p-3">{formatNumber(payrollReport.totalSalary)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
