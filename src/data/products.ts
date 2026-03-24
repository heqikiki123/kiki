export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tag?: 'New' | 'Sale' | 'Hot' | 'Best';
  colors: string[];
  inStock: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
};

export const categories: Category[] = [
  { id: '1', name: 'All', icon: 'grid', count: 128 },
  { id: '2', name: 'Clothing', icon: 'shirt', count: 48 },
  { id: '3', name: 'Shoes', icon: 'footprint', count: 32 },
  { id: '4', name: 'Bags', icon: 'bag', count: 24 },
  { id: '5', name: 'Accessories', icon: 'watch', count: 16 },
  { id: '6', name: 'Beauty', icon: 'sparkle', count: 8 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Linen Blazer',
    brand: 'Studio Co.',
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviewCount: 312,
    category: 'Clothing',
    tag: 'Sale',
    colors: ['#1E293B', '#D4A574', '#E2E8F0'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Air Cushion Sneakers',
    brand: 'Stride',
    price: 145,
    rating: 4.9,
    reviewCount: 587,
    category: 'Shoes',
    tag: 'Hot',
    colors: ['#FFFFFF', '#059669', '#000000'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Quilted Shoulder Bag',
    brand: 'Lumé',
    price: 210,
    originalPrice: 280,
    rating: 4.7,
    reviewCount: 198,
    category: 'Bags',
    tag: 'Sale',
    colors: ['#1E293B', '#9F7AEA', '#F9A8D4'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Slim Tapered Chinos',
    brand: 'Forme',
    price: 64,
    rating: 4.6,
    reviewCount: 421,
    category: 'Clothing',
    tag: 'New',
    colors: ['#B5B5A9', '#1E293B', '#8B5E3C'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Titanium Watch',
    brand: 'Kronos',
    price: 395,
    rating: 4.9,
    reviewCount: 143,
    category: 'Accessories',
    tag: 'Best',
    colors: ['#C0C0C0', '#B8860B', '#1E293B'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Merino Crew Sweater',
    brand: 'Woolen & Co.',
    price: 98,
    originalPrice: 130,
    rating: 4.7,
    reviewCount: 267,
    category: 'Clothing',
    tag: 'Sale',
    colors: ['#E2E8F0', '#FCA5A5', '#6EE7B7'],
    inStock: true,
  },
];

export type CartItem = Product & { quantity: number; selectedColor: string; size: string };
