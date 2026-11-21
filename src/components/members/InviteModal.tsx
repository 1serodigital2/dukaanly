import { useState } from "react";

import { Input } from "../form/Input";

const InviteModal = ({ setShowModal }) => {
  const [invites, setInvites] = useState([{ email: "", role: "" }]);

  const handleInputChange = () => {};

  const InviteMore = () => {
    setInvites((prevState) => {
      return [...prevState, { email: "", role: "" }];
    });

    console.log("[InviteMore] invites", invites);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center`">
      <div className="border rounded-2xl w-[500px] bg-black p-5  max-h-[90vh] h-[600px]">
        <div className="flex justify-between mb-5">
          <h4>Invite members</h4>
          <div
            onClick={() => setShowModal((prevState) => !prevState)}
            className="cursor-pointer"
          >
            Close
          </div>
        </div>
        <button
          className="border px-3 py-2 rounded mb-5 cursor-pointer"
          onClick={InviteMore}
        >
          Add more
        </button>
        <form action="">
          {invites.map((invite, index) => (
            <div className="flex gap-3" id="invite_field">
              <Input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
              />
              <select name="role" id="">
                <option value="">--Select Role--</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
