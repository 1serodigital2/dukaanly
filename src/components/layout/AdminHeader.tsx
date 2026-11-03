import LogoutButton from "../profile/Logout";

const AdminHeader = () => {
  return (
    <div className="border-b flex justify-between py-1 px-5">
      <div></div>
      <LogoutButton />
    </div>
  );
};

export default AdminHeader;
