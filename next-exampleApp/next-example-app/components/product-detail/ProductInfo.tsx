import React from 'react';
import {ProductDetailProps} from "@/pages/products/[productId]";
import Image from "next/image";
import {useRouter} from "next/router";
import {createCartItem} from "@/api";

export default function ProductInfo({product}: ProductDetailProps) {

    const router = useRouter();

    const addCart = async () => {

        const response = await createCartItem(product);
        console.log(response);
        alert(`장바구니에 추가됨`);
        router.push("/cart");
    }

    return (
        <div className={"flex"}>
            <div>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={250}
                    height={250}
                />
            </div>
            <div className={"ml-[10px]"}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <button onClick={addCart}>장비구니에 담기</button>
            </div>
        </div>
    );
}