import React from "react";
import Link from "next/link";

export default function Layout({ children }: any) {
  return (
    <div>
      <nav>
        <Link href={"/"}>상품목록</Link>
        <Link href={"/cart"}>장바구니</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
