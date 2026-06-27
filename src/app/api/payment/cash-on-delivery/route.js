import { getLoggedInToken } from '@/app/lib/auth';
import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  const body = await req.json();
  const orderInfo = body.orderData;

  const token = await getLoggedInToken(req);
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const userCollections = await connect('users');

  const loginUserData = await userCollections.findOne({
    userId: token.id,
  });

  // Fetch product details for all items in cart
  let cartItems = [];
  let subtotal = 0;

  if (orderInfo?.items && orderInfo.items.length > 0) {
    const productCollections = await connect('products');
    const productIds = orderInfo.items.map(
      (item) => new ObjectId(item.productId),
    );

    const products = await productCollections
      .find({ _id: { $in: productIds } })
      .toArray();

    // Map products back to cart items with product details
    cartItems = orderInfo.items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      const itemTotal = (product?.price || 0) * item.quantity;
      subtotal += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        product: product
          ? {
              name: product.productName,
              price: product.price,
              image: product.images[0],
            }
          : null,
        itemTotal,
      };
    });
  }

  const tran_id = `TXN-${Date.now()}`;
  const oderObj = {
    orderId: `EBORD${Date.now()}`,
    tran_id,
    name: loginUserData.name,
    email: loginUserData?.email || orderInfo?.shippingInfo?.email,
    phone: loginUserData?.phone || orderInfo?.shippingInfo?.phone,
    userId: loginUserData._id.toString(),
    address: orderInfo?.shippingInfo?.address,
    district: orderInfo?.shippingInfo?.district,
    postalCode: orderInfo?.shippingInfo?.postalCode,
    note: orderInfo?.shippingInfo?.note,
    shippingMethod: 'standard',
    shippingCost: 60,
    subtotal: subtotal,
    discount: 0,
    total: subtotal + 60, // subtotal + shipping cost
    createAt: new Date(),
    items: cartItems,
    paymentMethod: 'cash-on-delivery',
    paymentStatus: 'pending',
    orderStatus: [
      {
        stage: 'Order placed',
        time: new Date(),
      },
    ],
  };

  console.log(oderObj);

  const orderCollections = await connect('orders');
  const order = await orderCollections.insertOne(oderObj);

  return Response.json({
    success: true,
    order,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order-success?type=cod&tran_id=${tran_id}`,
  });
}
