import React from "react";
import ProductList from "@/components/product-list/ProductList";
import ProductHeader from "@/components/ProductHeader";

export type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
};

export default function ProductPage() {

    const headerTitle = `상품 목록 페이지`;

    return (
        <div>
            <ProductHeader title={headerTitle}/>
            <ProductList/>
        </div>
    );
}
