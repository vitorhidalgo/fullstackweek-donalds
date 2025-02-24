"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { createContext } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev);
    }

    
    const addProduct = (product: CartProduct) => {
        const productIsAlreadyTheCart = products.find((p) => p.id === product.id);
        if(!productIsAlreadyTheCart) {
            return setProducts([...products, product]);
        }

        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if(prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity,
                    }
                }
                return prevProduct;
            })
        });
    }
    
    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}