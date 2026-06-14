import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ── MongoDB sync ──────────────────────────────────────────────────────────

// Cart MongoDB তে save করো (logged-in user)
export const syncCartToDB = createAsyncThunk(
  'cart/syncToDB',
  async ({ userId, items }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items }),
      });
      if (!res.ok) throw new Error('Failed to sync cart');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// MongoDB থেকে cart load করো
export const loadCartFromDB = createAsyncThunk(
  'cart/loadFromDB',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to load cart');
      const data = await res.json();
      return data.items || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // items: [{ productId, name, price, image, color, size, quantity, stock }]
    items: [],
    buyNowItem: null, // শুধু "Buy Now" এর জন্য — cart এ যাবে না
    loading: false,
    error: null,
  },

  reducers: {
    // ── Add to cart ──
    addToCart(state, action) {
      const incoming = action.payload;

      state.items.push({
        ...incoming,
        quantity: incoming.quantity ?? 1,
      });
    },

    // ── Remove from cart ──
    removeFromCart(state, action) {
      const { productId, color, size } = action.payload;
      state.items = state.items.filter(
        (i) =>
          !(i.productId === productId && i.color === color && i.size === size),
      );
    },

    // ── Update quantity ──
    updateQuantity(state, action) {
      const { productId, color, size, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.productId === productId && i.color === color && i.size === size,
      );
      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock ?? 99));
      }
    },

    // ── Clear cart ──
    clearCart(state) {
      state.items = [];
      state.buyNowItem = null;
    },

    // ── Buy Now (checkout এ সরাসরি যাবে, cart এ add হবে না) ──
    setBuyNow(state, action) {
      state.buyNowItem = {
        ...action.payload,
        quantity: action.payload.quantity ?? 1,
      };
    },
    clearBuyNow(state) {
      state.buyNowItem = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCartFromDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCartFromDB.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCartFromDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncCartToDB.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setBuyNow,
  clearBuyNow,
} = cartSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────
export const selectCartItems = (state) => state.cart.items;
export const selectBuyNowItem = (state) => state.cart.buyNowItem;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;
