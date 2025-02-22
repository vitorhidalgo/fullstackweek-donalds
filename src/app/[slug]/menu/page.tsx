import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
// import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import RestaurantHeader from "./components/header";
import RestaurantsCategories from "./components/categories";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) return notFound();

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });

  if (!restaurant) return notFound;

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantsCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
