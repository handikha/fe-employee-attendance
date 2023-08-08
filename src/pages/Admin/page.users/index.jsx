import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import Button from "../../../components/Button";
import { getUsers, resetSuccessUser } from "../../../store/slices/users/slices";
import { getRoles } from "../../../store/slices/roles/slices";
import Input from "../../../components/Input";
import UsersTable from "./table.user";
import RenderUserModals from "./modals";

export default function Users() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const {
    users,
    roles,
    isDeleteUserLoading,
    isSubmitUserLoading,
    isGetUsersLoading,
  } = useSelector((state) => {
    return {
      users: state.users?.data,
      roles: state.roles.data,
      isDeleteUserLoading: state.users.isDeleteUserLoading,
      isSubmitUserLoading: state.users.isSubmitUserLoading,
      isGetUsersLoading: state.users.isGetUsersLoading,
    };
  });

  const getRoleByName = (id) => {
    const role = roles.find((item) => item.id === id);
    return role?.name;
  };

  const handleShowModal = (action, id) => {
    if (action === "Add") setShowModal({ show: true, type: action });

    if (action === "Details") {
      const userData = users.find((item) => item.id === id);
      setSelectedUser(userData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Edit") {
      const userData = users.find((item) => item.id === id);
      setSelectedUser(userData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Delete") {
      const userData = users.find((item) => item.id === id);
      setSelectedUser(userData);
      setShowModal({ show: true, type: action, id });
    }

    if (action === "Change Status") {
      const userData = users.find((item) => item.id === id);
      setSelectedUser(userData);
      setShowModal({ show: true, type: action, id });
    }
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getRoles());
  }, [isDeleteUserLoading, isSubmitUserLoading, selectedRole]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetSuccessUser());
  };

  return (
    <>
      <div className="col-span-full my-4 flex items-center justify-between">
        <h3 className="title">Users</h3>
        <Button
          isButton
          isPrimary
          className=" flex items-center gap-2"
          onClick={() => handleShowModal("Add")}
        >
          <FaPlus /> Add User
        </Button>
      </div>

      <div className="col-span-full flex gap-3 overflow-auto py-2">
        <Button
          title="All"
          isSmall
          onClick={() => {
            setSelectedRole("");
          }}
          className={`whitespace-nowrap px-2 py-1 text-sm text-white duration-300 md:text-base  ${
            selectedRole === ""
              ? "bg-primary"
              : "bg-primary/60 hover:bg-primary/80 dark:bg-primary/40 dark:hover:bg-primary/60"
          }`}
        />
        {roles.map((role, index) => (
          <Button
            key={index}
            title={role.name}
            isSmall
            onClick={() => {
              setSelectedRole(role.id);
            }}
            className={`whitespace-nowrap px-2 py-1 text-sm text-white duration-300 md:text-base  ${
              role.id === selectedRole
                ? "bg-primary"
                : "bg-primary/60 hover:bg-primary/80 dark:bg-primary/40 dark:hover:bg-primary/60"
            }`}
          />
        ))}
      </div>

      <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <UsersTable
          users={users}
          roles={roles}
          handleShowModal={handleShowModal}
          isGetUsersLoading={isGetUsersLoading}
          selectedRole={selectedRole}
        />
      </div>

      <RenderUserModals
        showModal={showModal.show}
        type={showModal.type}
        selectedUser={selectedUser}
        handleCloseModal={handleCloseModal}
        role={getRoleByName(selectedUser?.roleId)}
      />
    </>
  );
}
