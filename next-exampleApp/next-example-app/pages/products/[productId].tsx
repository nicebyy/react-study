import React from 'react';
import {GetServerSideProps} from "next";
import ProductHeader from "@/components/ProductHeader";
import {Product} from "@/pages";
import {fetchProductById} from "@/api";
import ProductInfo from "@/components/product-detail/ProductInfo";

export interface ProductDetailProps {
    product: Product;
}

export default function ProductDetailPage({product}: ProductDetailProps) {

    const title = "상품 상세 정보 페이지";

    return (
        <div>
            <ProductHeader title={title}/>
            <ProductInfo product={product}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const productId = context.params?.productId;
    const {data} = await fetchProductById(String(productId));

    return {
        props: {
            product: data
        }
    };
};


