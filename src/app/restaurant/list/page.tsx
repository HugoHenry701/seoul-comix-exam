import { serverClient } from '@/app/_trpc/serverClient';

export default async function RestaurantListPage() {
  const listRestaurant = await serverClient.getAllRestaurant({
    page_num: 1,
    page_size: 10,
  });
  return (
    <main className="max-w-3xl mx-auto mt-5">
      {listRestaurant && listRestaurant.length > 0 ? (
        <table className="w-full border-collapse border border-white">
          <thead>
            <tr>
              <th className="p-2 w-[40%] border border-white">Name</th>
              <th className="p-2 border border-white">City</th>
              <th className="p-2 border border-white">Rating</th>
            </tr>
          </thead>
          <tbody>
            {listRestaurant.map((e, i) => (
              <tr key={i}>
                <td className="p-2 border border-white">{e.name}</td>
                <td className="text-center p-2 border border-white">
                  {e.city}
                </td>
                <td className="text-center  p-2 border border-white text-yellow-300">
                  {e.rating &&
                    Array(e.rating)
                      .fill(0)
                      .map(() => '☆')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Data not found</p>
      )}
    </main>
  );
}
