import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import CartContext from "./store";
import Footer from "./Footer";

const CartPage = (props) => {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div className="flex flex-col gap-10 container pb-20">
            <Header />
            <p className="">Total: {cart.reduce((prev, curr) => +curr.price + +prev, 0)}</p>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
                {cart.map((item, i) =>
                    <Card key={i} className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 justify-between">
                            <div className="flex flex-col">
                                <p className="text-tiny uppercase font-bold">{item.price} USD</p>
                                <small className="text-default-500">{item.country}</small>
                                <h4 className="font-bold text-large">{item.name}</h4>
                            </div>
                            <Button color="danger" variant="shadow"
                                onClick={() => removeFromCart(item)}>
                                Remove
                            </Button>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt=""
                                className="object-contain rounded-xl w-fit mx-auto h-72"
                                classNames={{ wrapper: '!max-w-full w-full' }}
                                src={item.imageUrl}
                            />
                        </CardBody>
                    </Card>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;