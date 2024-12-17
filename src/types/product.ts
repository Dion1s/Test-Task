export interface Product {
    id: number;
    name: string;
    count: number;
    size: { width: number; height: number };
    weight: string;
    imageUrl: string;
    comments: string[];
  }

  export interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }