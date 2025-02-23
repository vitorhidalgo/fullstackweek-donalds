"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailProps {
    product: Prisma.ProductGetPayload<{ include: { restaurant: {
        select: { avatarImageUrl: true, name: true }
    } } }>;
};

const ProductDetail = ({ product}: ProductDetailProps) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleDecreaseQuantity = () => {
        if(quantity === 1) return;
        setQuantity((prev) => prev - 1);
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    return (
        <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5 flex flex-col flex-auto">
            <div className="flex-auto">
                <div className="flex items-center gap-1.5">
                    <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
                    <p className="text-xs text-muted-foreground gap-1 space-x-1">{product.restaurant.name}</p>
                </div>
                <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
                <div className="flex items-center justify-between mt-2">
                    <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>
                    <div className="flex items-center gap-3 text-center">
                        <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Sobre</h4>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex gap-1 items-center">
                        <ChefHatIcon size={18} />
                        <h4 className="font-semibold">Ingredientes</h4>
                    </div>
                    <ul>
                        {product.ingredients.map((ingredient, key) => <li key={`ingredients-${key}`} className="text-sm text-muted-foreground list-disc ml-4">{ingredient}</li>)}
                    </ul>
                </div>
            </div>
            <Button className="rounded-full w-full mt-6">Adicionar à sacola</Button>
        </div>
    );
}
 
export default ProductDetail;