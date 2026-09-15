import AddBusinessForm from "@/components/addVendor/AddBusinessForm";
import { useAuth } from "@/context/authContext";
import { Link } from "react-router-dom";
export default function AddBusiness() {
  const { isLoggedIn } = useAuth();
  const { user, loading } = useAuth();

  console.log(user);

  return (
    <div>
      {isLoggedIn ? (
        <AddBusinessForm />
      ) : (
        <div className="flex justify-center flex-col items-center gap-3 p-3">
          <h1 className="text-6xl">اول وارد شو</h1>
          <Link
            className="px-10 py-2 bg-brand-300 text-white rounded-xl"
            to="/auth"
          >
            ورود
          </Link>
        </div>
      )}
    </div>
  );
}
