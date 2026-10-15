import Link from "next/link";

const ShopList = ({ data }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {data.map((store) => (
        <Link
          href={`/shop/${store.slug}`}
          className="border rounded-xl p-4"
          key={store.id}
        >
          <h3>{store.name}</h3>
          <ul>
            <li>{store.phone}</li>
            <li>{store.email}</li>
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default ShopList;
