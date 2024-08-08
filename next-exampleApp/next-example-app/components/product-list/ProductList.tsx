import React, {useEffect, useState} from "react";
import {Product} from "@/pages";
import Link from "next/link";
import Image from "next/image";
import {fetchProduct} from "@/api";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        fetchProduct().then(response => {
            // response.data;
            setProducts(response.data);
        });
    }, []);
    console.log(products);
    // return <div style={{ color: "blue" }}>ProductPage</div>;

    return (
        <ul>
            {
                products?.map((product: Product) => {
                    return (
                        <li key={product.id} className={"inline-block w-300 h-300 m-12"}>
                            <Link href={`/products/${product.id}`}>
                                <div>
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                    ></Image>
                                </div>
                                <div>{product.name}</div>
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
}
