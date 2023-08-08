import React from "react";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../../store/slices/users/slices";
import Button from "../../../components/Button";
import SuccessMessage from "../../../components/SuccessMessage";
import InputUser from "./input.user";
import formatNumber from "../../../utils/formatNumber";

export default function RenderUserModals({
  showModal,
  type,
  selectedUser,
  handleCloseModal,
  role,
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

  const handleDeleteProduct = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdateStatus = (id, status) => {
    const inputProductData = {
      status: status(),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(inputProductData));
    dispatch(updateUser({ id, formData }));
  };

  return (
    <>
      {showModal && type === "Add" && (
        <Modal
          showModal={showModal}
          title={`${type} User`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage message={`User added successfully`} />
          ) : (
            <InputUser roles={roles} />
          )}
        </Modal>
      )}

      {showModal && type === "Details" && (
        <Modal
          showModal={showModal}
          title={`${type} User`}
          closeModal={() => handleCloseModal()}
        >
          <div className="flex flex-col">
            <div className="aspect-[5/3] w-full overflow-hidden rounded-lg">
              <img
                src={
                  process.env.REACT_APP_PRODUCT_IMAGE_URL + selectedUser?.image
                }
                alt={`${selectedUser.fullName}`}
                className="h-full w-full object-cover "
              />
            </div>
            <h3 className="title mt-4">{selectedUser.fullName}</h3>
            <p className="capitalize text-primary">{role}</p>
            <p className="">{selectedUser.email}</p>
            <p className="mt-2">
              Salary : IDR {formatNumber(selectedUser.salary)}
            </p>
            <p className="">Birthdate : {selectedUser.birthdate}</p>
            <p className="">Join Date : {selectedUser.joinDate}</p>
          </div>
        </Modal>
      )}

      {showModal && type === "Edit" && (
        <Modal
          showModal={showModal}
          title={`${type} User`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`User ${selectedUser.fullName} updated successfully`}
            />
          ) : (
            <InputUser userData={selectedUser} roles={roles} />
          )}
        </Modal>
      )}

      {showModal && type === "Delete" && (
        <Modal
          showModal={showModal}
          title={`${type} User`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`User ${selectedUser.fullName} deleted successfully`}
            />
          ) : (
            <>
              <p className="modal-text">
                Are you sure to delete{" "}
                <span className="font-bold">{selectedUser.name}</span>?{" "}
                <p className="modal-text">
                  You won't be able to undo the changes after deleting.
                </p>
              </p>

              <div className="mt-4 flex justify-end gap-2">
                {!isDeleteUserLoading && (
                  <Button
                    title="No"
                    isButton
                    isSecondary
                    onClick={handleCloseModal}
                  />
                )}
                <Button
                  title="Yes"
                  isButton
                  isDanger
                  isLoading={isDeleteUserLoading}
                  onClick={() => handleDeleteProduct(selectedUser.id)}
                />
              </div>
            </>
          )}
        </Modal>
      )}

      {showModal && type === "Change Status" && (
        <Modal
          showModal={showModal}
          title={`${type} Product`}
          closeModal={() => handleCloseModal()}
        >
          {success ? (
            <SuccessMessage
              message={`${selectedUser.name} status changed successfully`}
            />
          ) : (
            <>
              <p className="modal-text">
                Are you sure to
                {selectedUser.status === 1 ? (
                  <span className="text-red-500"> deactive </span>
                ) : (
                  <span className="text-primary"> activate </span>
                )}
                <span className="font-bold">{selectedUser.name}</span>?
              </p>

              <div className="mt-4 flex justify-end gap-2">
                {!isSubmitUserLoading && (
                  <Button
                    title="No"
                    isButton
                    isSecondary
                    onClick={handleCloseModal}
                  />
                )}
                <Button
                  title="Yes"
                  isButton
                  isPrimary={selectedUser.status === 0}
                  isDanger={selectedUser.status === 1}
                  isLoading={isSubmitUserLoading}
                  onClick={() =>
                    handleUpdateStatus(selectedUser.id, () => {
                      if (selectedUser.status === 1) {
                        return 0;
                      }

                      return 1;
                    })
                  }
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
