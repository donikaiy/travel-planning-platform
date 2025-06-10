export type Restaurant = RestaurantCreate & {
    restaurantId: number
}

export type RestaurantCreate = {
    cityId: number,
    name: string,
    location: string,
    imageUrl: string,
    priceSymbols: string,
}

export type RestaurantWithRating = Restaurant & {
    rating: number
}
