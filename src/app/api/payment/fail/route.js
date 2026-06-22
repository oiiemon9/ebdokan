const getTranId = async (req) => {
  let tran_id = null;

  console.log(req);

  if (req.method === 'POST') {
    const form = await req.formData();
    tran_id = form.get('tran_id');
  }

  if (!tran_id) {
    const url = new URL(req.url);
    tran_id = url.searchParams.get('tran_id');
  }

  return tran_id;
};

const redirectToFailure = (tran_id) =>
  Response.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment-failed?tran_id=${tran_id ?? ''}`,
  );

export async function POST(req) {
  const tran_id = await getTranId(req);
  return redirectToFailure(tran_id);
}

export async function GET(req) {
  const tran_id = await getTranId(req);
  return redirectToFailure(tran_id);
}
