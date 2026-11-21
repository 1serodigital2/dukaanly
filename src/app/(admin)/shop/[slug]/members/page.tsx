"use client";

import { useState } from "react";

import useShop from "@/src/app/hooks/useStore";
import { useGetStoreMembers } from "@/src/features/members/queries";
import InviteModal from "@/src/components/members/InviteModal";

const StoreMemberPage = () => {
  const [showModal, setShowModal] = useState(false);

  const { getActiveStoreId } = useShop();
  const activeStoreId = getActiveStoreId();

  const { data, isPending, isError, error } = useGetStoreMembers(activeStoreId);

  if (isError) {
    console.log("[StoreMemberPage] error", error);
  }

  console.log("[StoreMemberPage] data", data);

  // const handleInviteMemberBtn = () => {
  //   setShowModal((prevState) => !prevState);
  // };

  return (
    <div className="flex justify-between">
      <h1>Store member pagdse</h1>
      <button
        className="border rounded p-3 cursor-pointer"
        onClick={() => setShowModal((prevState) => !prevState)}
      >
        Invite Members
      </button>

      {showModal && <InviteModal setShowModal={setShowModal} />}
    </div>
  );
};

export default StoreMemberPage;
