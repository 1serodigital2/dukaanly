import { useEffect, useState } from "react";

import { Input } from "../form/Input";

const InviteModal = ({ setShowModal }) => {
  const [invites, setInvites] = useState([
    { id: crypto.randomUUID(), email: "", role: "" },
  ]);

  const handleInputChange = (
    inputType: string,
    value: string,
    index?: number,
  ) => {
    if (index === undefined) return;
    setInvites((prevState) =>
      prevState.map(
        (invite, i) =>
          i === index
            ? { ...invite, [inputType]: value } // Keep existing fields, update only inputType
            : invite, // Leave all other items untouched
      ),
    );
  };

  const InviteMore = () => {
    setInvites((prevState) => {
      return [...prevState, { id: crypto.randomUUID(), email: "", role: "" }];
    });

    console.log("[InviteMore] invites", invites);
  };

  const removeField = (index: number) => {
    console.log("[removeField] index", index);
    if (index === null) return;
    const latestInvites = invites.filter((_, i) => i != index);
    setInvites(latestInvites);

    // const targetRow = document.getElementById(`email_${index}`).style.display = 'none';

    console.log("[removeField] latestInvites", latestInvites);
  };

  const handleFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("[handleFormSubmit] invites", invites);
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
        <form action="" onSubmit={handleFormSubmit}>
          {invites.map((invite, index) => (
            <div className="flex gap-2 mb-3" key={invite.id} id={`email_${invite.id}`}>
              <div className="flex gap-3" id="invite_field">
                <Input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleInputChange}
                  index={index}
                  value={invite.email}
                />
                <select
                  name="role"
                  id=""
                  className="border rounded"
                  onChange={(e) =>
                    handleInputChange("role", e.target.value, index)
                  }
                  value={invite.role}
                >
                  <option value="">--Select Role--</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              {invites.length > 1 && (
                <button
                  type="button"
                  className="border p-3 flex items-center justify-center cursor-pointer"
                  onClick={() => removeField(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button className="border w-full text-center py-2 rounded mt-4 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
