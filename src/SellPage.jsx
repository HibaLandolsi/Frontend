import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from './assets/banner.jpeg'
import { Button, Card, CardBody, CardHeader, Image, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CartContext from "./store";

const SellPage = (props) => {
    const [preview, setPreview] = useState();
    const navigate = useNavigate();

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        } else {
            setPreview('');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        await axios.post('/upload', data);
        navigate('/');
    }

    return (
        <div className="flex flex-col gap-10 container pb-20 min-h-screen">
            <Header />
            <form className="flex-1 flex flex-col gap-10" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold">Add a new item</h1>
                <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col gap-4">
                        <Input
                            isRequired
                            type="text"
                            label="Product name"
                            name="name"
                        />
                        <Input
                            isRequired
                            type="text"
                            label="Country"
                            name="country"
                        />
                        <Input
                            isRequired
                            min={0}
                            type="number"
                            label="Price"
                            name="price"
                        />
                        <Button color="primary" type="submit">Submit</Button>
                    </div>
                    <label className="rounded-xl border border-gray-500 border-dashed grid place-content-center overflow-hidden">
                        <input type="file" accept="image/*" name="image" hidden onChange={handleFileUpload} required />
                        {!preview && <span className="">Click here to upload file</span>}
                        <img src={preview} alt="" className="max-h-80" />
                    </label>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default SellPage;