import React from 'react';
import {GetServerSideProps} from "next";
import ProductHeader from "@/components/ProductHeader";
import axios from "axios";
import {Product} from "@/pages";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetailPage({product}: ProductDetailProps) {

    const title = "상품 상세 정보 페이지";

    return (
        <div>
            <ProductHeader title={title}/>
            <p>{product.name}</p>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const productId = context.params?.productId;

    const response = await axios.get(`http://localhost:4000/products/${productId}`);
    const product: Product = response.data;

    return {
        props: {
            product
        }
    };
};


