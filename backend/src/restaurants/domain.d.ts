import type {RowDataPacket} from "mysql2";

export type Restaurant = {
    restaurantId: number,
    cityId: number,
    name: string,
    location: string,
    imageUrl: string,
    priceSymbols: string,
}

export type RestaurantDb = RowDataPacket & {
    restaurant_id: number,
    city_id: number,
    name: string,
    location: string,
    image_url: string,
    price_symbols: string,
}


