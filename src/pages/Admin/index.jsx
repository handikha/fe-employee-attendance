import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "./profile.card";
import Dashboard from "./page.dashboard/dashboard";
import { Toaster } from "react-hot-toast";
import Users from "./page.users";
import { useEffect } from "react";

export default function Admin({ user }) {
  const navigate = useNavigate();
  const isVerified = false;
  const { context } = useParams();

  useEffect(() => {
    const allowedContext = ["dashboard", "users"].find(
      (item) => item === context
    );

    if (!allowedContext) {
      return navigate("/not-found", { replace: true });
    }
  }, [context]);

  if (!user.role) {
    return navigate("/");
  }

  return (
    <>
      <div className="container px-10 py-24">
        <div className="grid grid-cols-4 gap-10">
          <ProfileCard
            username={user.username}
            fullName={user.fullName}
            profileImg={user.image}
            isVerified={isVerified}
            context={context}
          />

          <div className="col-span-full md:col-span-3">
            {context === "dashboard" && <Dashboard />}
            {context === "users" && <Users />}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
