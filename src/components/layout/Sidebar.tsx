import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="p-5 flex flex-col gap-3 border-r">
      <div>Dukaanly</div>
      <ul>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
