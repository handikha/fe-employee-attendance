import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../../store/slices/users/slices";
import Button from "../../../components/Button";
import SuccessMessage from "../../../components/SuccessMessage";

export default function RenderAttendanceModal({
  showModal,
  type,
  selectedAttendance,
  handleCloseModal,
}) {
  const dispatch = useDispatch();
  const { roles, success, isDeleteUserLoading, isSubmitUserLoading } =
    useSelector((state) => {
      return {
        roles: state.roles.data,

        success: state.users.success,
        // current_page: state.products.current_page,
        // total_pages: state.products.total_pages,
        isDeleteUserLoading: state.users.isDeleteUserLoading,
        isSubmitUserLoading: state.users.isSubmitUserLoading,
      };
    });

  const [clockOutTime, setClockOutTime] = useState("");

  console.log(clockOutTime);
  useEffect(() => {
    if (selectedAttendance) {
      setClockOutTime(selectedAttendance.clockOut || "");
    }
  }, [selectedAttendance]);

  const handleClockOutChange = (event) => {
    setClockOutTime(event.target.value);
  };

  return (
    <>
      {showModal && type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${type} Attendance`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message={`Attendance updated successfully`} />
          ) : (
            <input
              type="time"
              id="clockOutTime"
              name="clockOutTime"
              value={clockOutTime}
              onChange={handleClockOutChange}
            ></input>
          )}
        </Modal>
      )}
    </>
  );
}
