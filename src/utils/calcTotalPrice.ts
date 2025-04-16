import { CartItemType } from "../store/cart/types";

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);
}
