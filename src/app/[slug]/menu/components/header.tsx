"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="pointer-events-auto absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="pointer-events-auto absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        className="object-cover"
        fill
      />
    </div>
  );
};

export default RestaurantHeader;
