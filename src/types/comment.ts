export interface Comment {
    id: number;
    productId: number;
    description: string;
    date: string;
  }
  
  export interface CommentsState {
    items: Comment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }