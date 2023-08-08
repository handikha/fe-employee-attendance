
import Button from "../../../components/Button";
import { motion } from "framer-motion";

import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import formatNumber from "../../../utils/formatNumber";

export default function UsersTable({
  users,
  isGetUsersLoading,
  handleShowModal,
  roles,
}) {
  const getRoleByName = (id) => {
    const role = roles.find((item) => item.id === id);
    return role?.name;
  };

  return (
    <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
      <thead className="text-gray-700 dark:bg-gray-700 dark:text-gray-400 bg-slate-100 text-sm uppercase dark:bg-slate-800">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">
            <span className="flex items-center gap-1">Name</span>
          </th>
          <th className="p-3">Username</th>
          <th className="p-3">Role</th>
          <th className="p-3">Salary</th>
          <th className="p-3">Image</th>
          <th className="p-3">
            <span className="flex items-center gap-1">Status</span>
          </th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {isGetUsersLoading ? (
          <tr className="text-center">
            <td colSpan={7} className="p-3">
              <div className="mx-auto block h-6 w-6 animate-spin rounded-full border-[3px] border-r-transparent">
                <span className="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        ) : users.length === 0 ? (
          <tr className="text-center">
            <td colSpan={8} className="p-3">
              No data to display
            </td>
          </tr>
        ) : (
          users?.map((item, index) => (
            <motion.tr
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              key={index}
              className="cursor-pointer duration-300 odd:bg-slate-200/70 even:bg-slate-100 hover:bg-primary/30 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:hover:bg-primary/40"
              onClick={() => handleShowModal("Details", item.id)}
            >
              <th
                scope="row"
                className="text-gray-900 whitespace-nowrap p-3 font-medium dark:text-white"
              >
                {index + 1}
              </th>
              <td className="p-3">{item.fullName}</td>
              <td className="p-3">{item.username}</td>
              <td className="p-3">{getRoleByName(item.roleId)}</td>
              <td className="p-3">IDR {formatNumber(item.salary)}</td>
              <td className="p-3">
                <div className="aspect-[4/3] w-10">
                  <img
                    src={process.env.REACT_APP_PRODUCT_IMAGE_URL + item.image}
                    alt={`${item.fullName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </td>
              <td className="p-3">
                {item.status === 1 ? (
                  <Button
                    isSmall
                    isPrimary
                    onClick={() => handleShowModal("Change Status", item.id)}
                    title="Active"
                  />
                ) : item.status === 0 ? (
                  <Button
                    isSmall
                    isWarning
                    onClick={() => handleShowModal("Change Status", item.id)}
                    title="Inactive"
                  />
                ) : (
                  item.status === 2 && (
                    <Button isSmall isDanger isDisabled title="Deleted" />
                  )
                )}
              </td>

              <td className="p-3">
                {item.status !== 2 && (
                  <div className="flex gap-2">
                    <Button
                      isSmall
                      isWarning
                      onClick={() => handleShowModal("Edit", item?.id)}
                      title={<HiOutlinePencilSquare className="text-lg" />}
                    />
                    <Button
                      isSmall
                      isDanger
                      onClick={() => handleShowModal("Delete", item.id)}
                      title={<HiOutlineTrash className="text-lg" />}
                    />
                  </div>
                )}
              </td>
            </motion.tr>
          ))
        )}
      </tbody>
    </table>
  );
}
