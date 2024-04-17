import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Badge } from '@nextui-org/react';
import React, { useContext } from 'react';
import SearchIcon from './SearchIcon';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import CartContext from './store';

function Header(props) {
    const navigate = useNavigate();
    const { cart }  = useContext(CartContext);

    function search(event) {
        const data = new FormData(event.target)
        navigate(`/?q=${data.get('search')}`)
    }

    return (
        <Navbar className="justify-between max-w-full px-0" classNames={{ wrapper: "justify-between max-w-full px-0" }}>
            <NavbarBrand>
                <Link to="/" className="font-bold text-inherit">
                    Souvenir shop
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <form onSubmit={search}>
                    <Input
                        classNames={{
                            base: "w-96",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        type="search"
                        name="search"
                        endContent={
                            <button><SearchIcon /></button>
                        }
                    />
                </form>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Badge content={cart.length} size="sm" color="primary" variant="shadow">
                        <NavLink to="/cart">
                            Cart
                        </NavLink>
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                    <NavLink to="/sell">
                        Sell
                    </NavLink>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default Header;