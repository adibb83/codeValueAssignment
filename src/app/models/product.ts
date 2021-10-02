export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  creationDate: Date;
}

export const ProductsMock: Product[] = [
  {
    id: 1,
    name: 'Gazelle',
    description: `Remember 1991? It's ok if you don't. Lace up in these adidas Gazelle shoes and give yourself a second chance.`,
    price: 75,
    creationDate: new Date(),
  },

  {
    id: 2,
    name: 'Zx 700 HD',
    description: `Can you ever really lose spirit? The adidas ZX series would say no. Years may pass, things may change. The core remains.`,
    price: 60,
    creationDate: new Date(),
  },
  {
    id: 3,
    name: 'Stan Smith',
    description: `Timeless appeal. Effortless style. Everyday versatility. For over 50 years and counting, adidas Stan Smith Shoes have continued to hold their place as an icon. `,
    price: 50,
    creationDate: new Date(),
  },
];
