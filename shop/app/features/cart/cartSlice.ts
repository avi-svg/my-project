import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
            const item = state.items.find(i => i.id === action.payload.id);

            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        increment(state, action: PayloadAction<number>) {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        decrement(state, action: PayloadAction<number>) {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },

        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
    },
});

export const {
    addItem,
    increment,
    decrement,
    removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
