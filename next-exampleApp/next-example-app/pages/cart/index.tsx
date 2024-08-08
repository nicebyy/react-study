import React from "react";
import {GetServerSideProps} from "next";
import {fetchCarts} from "@/api";
import CartHeader from "@/components/cart/CartHeader";
import CartList from "@/components/cart/CartList";

export interface Cart {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
}

export interface CartPageProps {
    carts: Cart[]
}

export default function CartPage({carts}: CartPageProps) {
    console.log(carts)
    return (
        <div>
            <CartHeader/>
            <CartList carts={carts}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {data} = await fetchCarts();

    return {
        props: {
            carts: data
        }
    };
};


