export async function getHotDeals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/hotDeals`,
    { cache: 'no-store' },
  );
  return res.json();
}
