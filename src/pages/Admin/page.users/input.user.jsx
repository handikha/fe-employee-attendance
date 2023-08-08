import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { capitalizeEachWords } from "../../../utils/capitalizeEachWords";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../../store/slices/users/slices";
import {
  inputUserValidationSchema,
  updateUserValidationSchema,
} from "../../../store/slices/users/validation";
import Toast from "react-hot-toast";
import InputImage from "../../../components/InputImage";

export default function InputUser({ userData, roles }) {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [confrimAdd, setConfirmAdd] = useState(false);

  const [file, setFile] = useState(null);
  const [userDataImage, setUserDataImage] = useState(null);

  const { isSubmitUserLoading } = useSelector((state) => {
    return {
      isSubmitUserLoading: state.users.isSubmitUserLoading,
    };
  });

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const birthdateRef = useRef(null);
  const joinDateRef = useRef(null);
  const baseSalaryRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    if (userData) {
      usernameRef.current.value = userData.username || "";
      fullNameRef.current.value = userData.fullName || "";
      emailRef.current.value = userData.email || "";
      baseSalaryRef.current.value = userData.salary || "";
      roleRef.current.value = userData.roleId || "";
      birthdateRef.current.value = userData.birthdate || "";
      joinDateRef.current.value = userData.joinDate || "";
      setUserDataImage(userData.image);
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputUserData = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      fullName: capitalizeEachWords(fullNameRef.current?.value),
      birthdate: birthdateRef.current?.value,
      joinDate: joinDateRef.current?.value,
      baseSalary: baseSalaryRef.current?.value,
      roleId: roleRef.current?.value,
      image: file,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(inputUserData));
    if (file) formData.append("file", file);

    try {
      if (userData) {
        await updateUserValidationSchema.validate(inputUserData, {
          abortEarly: false,
        });

        setError("");
        setConfirmAdd(true);

        if (confrimAdd) {
          dispatch(updateUser({ id: userData.id, formData }));
        }
      } else {
        await inputUserValidationSchema.validate(inputUserData, {
          abortEarly: false,
        });

        setError("");
        setConfirmAdd(true);

        if (confrimAdd) {
          dispatch(createUser(formData));
        }
      }
    } catch (error) {
      const errors = {};

      Toast.error("Check your input fields");
      error.inner.forEach((innerError) => {
        errors[innerError.path] = innerError.message;
      });
      setError(errors);
    }
  };

  return (
    <form className="px-2 py-2" onSubmit={handleSubmit}>
      <div
        className={`${
          confrimAdd ? "hidden" : null
        } flex max-h-[400px] flex-col gap-3 overflow-y-auto px-2 py-2 `}
      >
        <div className="">
          <Input
            ref={usernameRef}
            type="text"
            placeholder="ex: johndoe"
            name="username"
            label="Username"
            id="username"
            errorInput={error.username}
            onChange={() => setError({ ...error, username: false })}
            autoFocus
          />
          {error.username && (
            <div className=" text-red-500 dark:text-red-400">
              {error.username}
            </div>
          )}
        </div>

        <div className="">
          <Input
            ref={emailRef}
            type="text"
            placeholder="ex: johndoe@mail.com"
            name="email"
            label="Email"
            id="email"
            errorInput={error.email}
            onChange={() => setError({ ...error, email: false })}
          />
          {error.email && (
            <div className=" text-red-500 dark:text-red-400">{error.email}</div>
          )}
        </div>

        <div className="">
          <Input
            ref={fullNameRef}
            type="text"
            placeholder="ex: John Doe"
            name="name"
            label="Name"
            id="name"
            errorInput={error.fullName}
            onChange={() => setError({ ...error, fullName: false })}
          />
          {error.fullName && (
            <div className=" text-red-500 dark:text-red-400">
              {error.fullName}
            </div>
          )}
        </div>

        <label htmlFor="roles">Role</label>
        <select
          ref={roleRef}
          id="roles"
          onChange={() => setError({ ...error, roleId: false })}
          className={`-mt-3 w-full rounded-lg border bg-slate-100 px-2 py-2 outline-none focus:ring-2  dark:bg-slate-800 ${
            error.roleId
              ? "border-danger/50 focus:border-danger focus:ring-danger/50 dark:focus:ring-danger"
              : "border-primary/50 focus:border-primary focus:ring-primary/50 dark:focus:ring-primary"
          }`}
        >
          <option value="" className="text-light-gray">
            Select Role
          </option>
          {roles?.map((role, index) => (
            <option key={index} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {error.roleId && (
          <div className="-mt-3 text-red-500 dark:text-red-400">
            {error.roleId}
          </div>
        )}

        <div className="">
          <Input
            ref={baseSalaryRef}
            type="number"
            placeholder="ex: 35000"
            name="baseSalary"
            label="Salary"
            id="baseSalary"
            errorInput={error.baseSalary}
            onChange={() => setError({ ...error, baseSalary: false })}
          />
          {error.baseSalary && (
            <div className=" text-red-500 dark:text-red-400">
              {error.baseSalary}
            </div>
          )}
        </div>

        <div className="">
          <Input
            ref={birthdateRef}
            type="date"
            name="birthdate"
            label="Birthdate"
            id="birthdate"
            errorInput={error.birthdate}
            onChange={() => setError({ ...error, birthdate: false })}
          />
          {error.birthdate && (
            <div className=" text-red-500 dark:text-red-400">
              {error.birthdate}
            </div>
          )}
        </div>

        <div className="">
          <Input
            ref={joinDateRef}
            type="date"
            name="joinDate"
            label="Join Date"
            id="joinDate"
            errorInput={error.joinDate}
            onChange={() => setError({ ...error, joinDate: false })}
          />
          {error.joinDate && (
            <div className=" text-red-500 dark:text-red-400">
              {error.joinDate}
            </div>
          )}
        </div>

        <InputImage
          error={error}
          userData={userData}
          file={file}
          setFile={setFile}
          userDataImage={userDataImage}
          setUserDataImage={setUserDataImage}
        />

        {userData ? (
          <Button
            isButton
            isPrimary
            title="Edit User"
            className="mt-4"
            type="submit"
          />
        ) : (
          <Button
            isButton
            isPrimary
            title="Add User"
            className="mt-4"
            type="submit"
          />
        )}
      </div>

      <div className={`${!confrimAdd ? "hidden" : null}`}>
        {userData ? (
          <p className="modal-text">
            Are you sure you want to update this user?
          </p>
        ) : (
          <p className="modal-text">
            Are you sure you want to add{" "}
            <span className="font-bold">
              {capitalizeEachWords(fullNameRef.current?.value)}
            </span>
            ?
          </p>
        )}
        <div className="flex justify-end gap-2">
          {!isSubmitUserLoading && (
            <Button
              isButton
              isSecondary
              title="Back"
              className="mt-4"
              type="button"
              onClick={() => setConfirmAdd(false)}
            />
          )}

          <Button
            isButton
            isPrimary
            title="Sure"
            className="mt-4"
            type="submit"
            isLoading={isSubmitUserLoading}
          />
        </div>
      </div>
    </form>
  );
}
