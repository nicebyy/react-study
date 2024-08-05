import React from "react";
import ProductList from "@/components/ProductList";

export type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
};

export default function ProductPage() {
    return (
        <div>
            <h1>상품 목록 페이지</h1>
            <ProductList/>
        </div>
    );
}
