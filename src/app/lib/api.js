export async function getHotDeals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/hotDeals`,
    { cache: 'no-store' },
  );
  return res.json();
}
export async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    { cache: 'no-store' },
  );
  return res.json();
}
