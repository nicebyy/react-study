import axios, {AxiosInstance} from "axios";
import {Product} from "@/pages";

const instance: AxiosInstance = axios.create({
    baseURL: `http://localhost:4000`,
});

export const fetchProduct = () => instance.get(`/products`);
export const fetchProductById = (productId: string) => instance.get(`/products/${productId}`);
export const createCartItem = (product: Product) => {
    return instance.post(`/carts`, {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
    });
}
export const fetchCarts = () => instance.get(`/carts`);
export const removeCartItem = (id: string) => instance.delete(`/carts/${id}`);

