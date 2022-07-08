import { X } from "phosphor-react";
import { useState } from "react";
import DownloadButton from "./download";

export default function Shelf() {
  const [collapsed, setCollapsed] = useState(false);

  /**
   * Toggles the state of the shelf.
   * @returns {void}
   */
  function closeBtnClick(): void {
    setCollapsed(true);
  }

  if (collapsed) {
    return <></>
  } else {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 pt-2">
        <div className="flex flex-col items-center bg-white pt-8">
          <h3 className="text-center mx-6">Share your accounts, link up with other users and connect in real time</h3>
          <DownloadButton />
          <button className="flex items-center gap-1 mb-6" onClick={e => {
            e.preventDefault();
            closeBtnClick();
          }}>
            <h3 className="text-gray-500">Close</h3>
            <X size={25} color="#9c9c9c"/>
          </button>
        </div>
      </div>
    )
  }
}