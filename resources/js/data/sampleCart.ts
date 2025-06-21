export interface CartItem {
  id: number;
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export const sampleCart: CartItem[] = [
  {
    id: 1,
    product: {
      name: 'Oakwood Dining Table',
      price: 1299,
      image: '/placeholder.svg?height=100&width=100',
    },
    quantity: 1,
  },
  {
    id: 2,
    product: {
      name: 'Velvet Armchair',
      price: 799,
      image: '/placeholder.svg?height=100&width=100',
    },
    quantity: 2,
  },
];
