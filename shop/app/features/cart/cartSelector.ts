import {RootState} from '@/app/store/store'
import { createSelector } from '@reduxjs/toolkit';


export const selectorCartItems = (state: RootState) => state.cart.items;

export const selectorCartTotalQuantity = (state: RootState) => 
    state.cart.items.reduce((sum, item) => (sum += item.quantity), 0);

export const selectorCartTotalPrice = createSelector(
    [selectorCartItems],
    (items) => {
        return items.reduce(
            (sum, item) => (sum + item.price * item.quantity),
            0
        )
    }
);
