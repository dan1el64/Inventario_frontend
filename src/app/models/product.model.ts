export interface Product {
    id?: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}