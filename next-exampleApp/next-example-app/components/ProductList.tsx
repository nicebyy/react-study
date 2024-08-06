import React, {useEffect, useState} from "react";
import {Product} from "@/pages";
import axios from "axios";
import styles from "./ProductList.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        axios.get(`http://localhost:4000/products`).then(response => {
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
                        <li key={product.id} className={styles.item}>
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
