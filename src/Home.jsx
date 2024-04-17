import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from './assets/banner.jpeg'
import { Button, Card, CardBody, CardHeader, Image, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CartContext from "./store";

const HomePage = (props) => {
    const [items, setItems] = useState([]);
    const [countries, setCountries] = useState([]);
    const [params, setParams] = useSearchParams();
    const { cart, addItemToCart } = useContext(CartContext);

    useEffect(() => {
        const query = new URLSearchParams();
        query.append('name', params.get('search'));
        query.append('country', params.get('country'));
        // query.append('sortOrder', params.get('sortOrder'));
        axios.get(`/items?${query.toString()}`).then(({ data }) => setItems(data));
    }, [params])

    useEffect(() => {
        axios.get('/countries').then(res => setCountries(res.data));
    }, [])

    function handleSelection(key, val) {
        const query = new URLSearchParams(params.toString());
        query.set(key, val);
        setParams(query.toString());
    }

    return (
        <div className="flex flex-col gap-10 container pb-20">
            <Header />
            <Image
                classNames={{ wrapper: '!max-w-full w-full' }}
                className="w-full object-cover"
                alt=""
                src={Banner}
            />
            <div className="flex item-center gap-4 justify-end">
                {/* <Select
                    label="Sort by price"
                    className="max-w-xs"
                    onChange={e => handleSelection('sortOrder', e.target.value)}
                >
                    <SelectItem key="asc" value="asc">
                        From low to hight
                    </SelectItem>
                    <SelectItem key="desc" value="desc">
                        From high to low
                    </SelectItem>
                </Select> */}

                <Select
                    label="Filter by country"
                    className="max-w-xs"
                    onChange={e => handleSelection('country', e.target.value)}
                >
                    {countries.map(c =>
                        <SelectItem key={c} value={c} className="capitalize">
                            {c}
                        </SelectItem>
                    )}
                </Select>
            </div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
                {items.map((item, i) =>
                    <Card key={i} className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 justify-between">
                            <div className="flex flex-col">
                                <p className="text-tiny uppercase font-bold">{item.price} USD</p>
                                <small className="text-default-500">{item.country}</small>
                                <h4 className="font-bold text-large first-letter:uppercase">{item.name}</h4>
                            </div>
                            <Button color="primary" variant="shadow"
                                isDisabled={!!cart.find(it => it.id === item.id)}
                                onClick={() => addItemToCart(item)}>
                                Add to cart
                            </Button>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt=""
                                className="object-contain rounded-xl w-fit mx-auto h-72"
                                classNames={{ wrapper: '!max-w-full w-full' }}
                                src={item.imageUrl.location}
                            />
                        </CardBody>
                    </Card>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;