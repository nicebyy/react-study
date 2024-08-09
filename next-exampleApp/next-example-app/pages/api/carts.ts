import {NextApiRequest, NextApiResponse} from "next";
import {removeCartItem} from "@/api";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>,
) {
    const id = req.body.id;
    const {data} = await removeCartItem(id);
    res.status(200).send(`${data.name} 이 삭제 되었습니다.`);
}