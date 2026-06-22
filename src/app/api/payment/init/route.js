import { getLoggedInToken } from '@/app/lib/auth';
import { connect } from '@/app/lib/dbConnect';
import axios from 'axios';
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
    _id: new ObjectId(token.id),
  });
  console.log(token);
  console.log('login user', loginUserData._id);
  console.log(orderInfo);

  const cartCollections = await connect('carts');
  const cart = await cartCollections.findOne({
    userId: loginUserData?._id.toString(),
  });
  console.log(cart.items);

  // Fetch product details for all items in cart
  let cartItems = [];
  let subtotal = 0;

  if (cart?.items && cart.items.length > 0) {
    const productCollections = await connect('products');
    const productIds = cart.items.map((item) => new ObjectId(item.productId));

    const products = await productCollections
      .find({ _id: { $in: productIds } })
      .toArray();

    // Map products back to cart items with product details
    cartItems = cart.items.map((item) => {
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

  console.log('order cart', cartItems);

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
    items: cartItems,
    paymentStatus: 'pending',
  };

  const orderCollections = await connect('orders');
  const order = await orderCollections.insertOne(oderObj);

  if (order.insertedId) {
    try {
      const data = {
        store_id: process.env.SSLC_STORE_ID,
        store_passwd: process.env.SSLC_STORE_PASSWORD,
        total_amount: oderObj.total,
        currency: 'BDT',
        tran_id,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
        fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
        ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'EB Dokan Order',
        product_category: 'Ecommerce',
        product_profile: 'general',
        cus_name: oderObj.name,
        cus_email: oderObj.email,
        cus_phone: oderObj.phone,
        cus_add1: oderObj.address,
        cus_country: 'Bangladesh',
        // 🔥 IMPORTANT SHIPPING FIELDS
        ship_name: 'Customer',
        ship_add1: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: '1200',
        ship_country: 'Bangladesh',

        shipping_method: 'NO',
        product_name: 'Product',
        product_category: 'General',
        product_profile: 'general',
      };

      const response = await fetch(
        'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data),
        },
      );

      const result = await response.json();

      console.log(result);

      return Response.json({
        url: result.GatewayPageURL,
        sessionkey: result.sessionkey,
      });
    } catch (error) {
      console.error('Payment gateway error:', error);
      return new Response(
        JSON.stringify({
          ok: false,
          error: error.message || 'Payment initialization failed',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
  } else {
    return;
  }
}
