export type CartItem = {
  id: number
  title: string
  size: number
  type: string
  price: number
  count: number
  imageUrl: string
}

export interface CartSliceInterface {
  totalPrice: number;
  items: CartItem[]
}