import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
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
  const [sortName, setSortName] = useState(true);
  const [sortPrice, setSortPrice] = useState(null);
  const [sortStatus, setSortStatus] = useState("");

  const searchRef = useRef(null);

  const {
    users,
    roles,
    isDeleteUserLoading,
    isSubmitUserLoading,
    isGetUsersLoading,
    // current_page,
    // total_pages,
  } = useSelector((state) => {
    return {
      users: state.users?.data,
      roles: state.roles.data,
      // current_page: state.products.current_page,
      // total_pages: state.products.total_pages,
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
      console.log(userData);
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

  // const handlePagination = (type) => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });

  //   dispatch(
  //     getProducts({
  //       category_id: selectedRole,
  //       page: type === "prev" ? current_page - 1 : current_page + 1,
  //       sort_name:
  //         sortName === true
  //           ? "ASC"
  //           : sortName === false
  //           ? "DESC"
  //           : sortName === null && "",
  //       sort_price:
  //         sortPrice === true
  //           ? "ASC"
  //           : sortPrice === false
  //           ? "DESC"
  //           : sortPrice === null && "",
  //       limit: 10,
  //       keywords: searchRef ? searchRef.current.value : "",
  //       status: sortStatus,
  //     })
  //   );
  // };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   setSortName(true);
  //   setSortPrice(null);
  //   setSortStatus("");

  //   dispatch(
  //     getProducts({
  //       category_id: selectedRole,
  //       page: 1,
  //       sort_name: "",
  //       sort_price: "",
  //       limit: 10,
  //       keywords: searchRef.current.value,
  //       status: "",
  //     })
  //   );
  // };

  // const resetSearch = () => {
  //   searchRef.current.value = "";
  //   dispatch(
  //     getProducts({
  //       category_id: selectedRole,
  //       page: 1,
  //       sort_name: "",
  //       sort_price: "",
  //       limit: 12,
  //       keywords: "",
  //       status: "",
  //     })
  //   );
  // };

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
      {/* <form className="relative w-full lg:w-1/2" onSubmit={handleSearch}>
        <Input ref={searchRef} type="text" placeholder="Search product..." />
        <button
          type="submit"
          className="absolute right-0 top-0 cursor-pointer p-[11px] duration-300 hover:text-primary"
        >
          {searchRef.current?.value ? (
            <HiXMark className="text-xl" onClick={resetSearch} />
          ) : (
            <HiMagnifyingGlass className="text-xl " />
          )}
        </button>
      </form> */}

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
          // current_page={current_page}
          selectedRole={selectedRole}
          // sortName={sortName}
          // setSortName={setSortName}
          // sortPrice={sortPrice}
          // setSortPrice={setSortPrice}
          // sortStatus={sortStatus}
          // setSortStatus={setSortStatus}
          // keywords={searchRef}
        />
      </div>

      {/* {!isGetUsersLoading && total_pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            isPrimary
            isButton
            isDisabled={current_page === 1}
            title="Prev"
            onClick={() => handlePagination("prev")}
          />
          <Button
            isPrimary
            isButton
            title="Next"
            isDisabled={current_page === total_pages}
            onClick={() => handlePagination("next")}
          />
        </div>
      )} */}

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
