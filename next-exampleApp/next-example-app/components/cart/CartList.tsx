import React from 'react';
import {Cart, CartPageProps} from "@/pages/cart";
import Image from "next/image";
import {useRouter} from "next/router";
import axios from "axios";

export default function CartList({carts}: CartPageProps) {

    const totalPrice = carts
        .map((cart) => (+cart.price))
        .reduce((acc, cur) => acc + cur, 0);

    const totalCount = carts.length;

    const router = useRouter();
    const removeCart = async (id: string) => {

        // const response = await removeCartItem(id);
        // alert(`${response.data.name} 삭제가 되었습니다.`)
        // router.replace(router.asPath);

        const {data} = await axios.post(`http://localhost:3000/api/carts`, {
            id: id
        });
        alert(data);
        await router.replace(router.asPath);

    }
    return (
        <div>
            <div>
                <ul>
                    {carts &&
                        carts.map((cart: Cart) => (
                            <li className={"flex"}
                                key={cart.id}>
                                <div>
                                    <Image
                                        src={cart.imageUrl}
                                        alt={cart.name}
                                        width={75}
                                        height={75}
                                    />
                                </div>
                                <div className={"ml-[8px]"}>
                                    <div>{cart.name}</div>
                                    <div>{cart.price}</div>
                                    <button onClick={() => removeCart(cart.id)}>삭제하기</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <p>총 가격 : {totalPrice}</p>
                <p>총 수량 : {totalCount}</p>
            </div>
        </div>
    );
}