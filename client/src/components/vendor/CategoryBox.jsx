import { Link } from "react-router-dom";

export default function CategoryBox({ url = "/lists", icon, title = "test" }) {
  return (
    <Link
      to={url}
      className="box justify-center items-center w-1/5 flex flex-col gap-2"
    >
      <div className="icon-box size-15 rounded-xl flex justify-center items-center bg-brand-200">
        {icon}
      </div>
      <div className="title">{title}</div>
    </Link>
  );
}
