import Router, { RouterContext } from "koa-router";
import dotenv from "dotenv";
import path from "path";
import { rateLimiter } from "../security/rateLimiter";

const ROUTER_OPTIONS = {
    prefix: "/hotel",
};

interface Picture {
    photo1: string;
    photo2: string;
}

interface Hotel {
    name: string;
    pictures: Picture;
    book?: string;
}

interface Hotels {
    [key: string]: Hotel[];
}

const hotels = {

}

const hotelsWithPictures: Hotels = {
    "hotel1": [
        {
            "name": "aaaaaaaaaaa",
            "pictures": {
                "photo1": "EEEEEEEEEEE.png",
                "photo2": "DDDDDDDDDDD.png"
            }
        }
    ],
    "hotel2": [
        {
            "name": "bbbbbbbbbbbbbbb",
            "pictures": {
                "photo1": "FFFFFFFFFFF.png",
                "photo2": "GGGGGGGGGGG.png"
            }
        }
    ],
    "hotel3": [
        {
            "name": "cccccccccccccccccccc",
            "pictures": {
                "photo1": "HHHHHHHHHHHH.png",
                "photo2": "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"
            }
        }
    ],
};

const hotelsWithBooking: Hotels = {
    "hotel1": [
        {
            "name": "aaaaaaaaaaa",
            "pictures": {
                "photo1": "EEEEEEEEEEE.png",
                "photo2": "DDDDDDDDDDD.png"
            },
            "book": "false"
        }
    ],
    "hotel2": [
        {
            "name": "bbbbbbbbbbbbbbb",
            "pictures": {
                "photo1": "FFFFFFFFFFF.png",
                "photo2": "GGGGGGGGGGG.png"
            },
            "book": "false"
        }
    ],
    "hotel3": [
        {
            "name": "cccccccccccccccccccc",
            "pictures": {
                "photo1": "HHHHHHHHHHHH.png",
                "photo2": "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII.png"
            },
            "book": "true"
        }
    ],
};

// Load environment variables from .env.development or .env
dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});

export default new Router(ROUTER_OPTIONS)

    .get("/", rateLimiter(15, 1), async (ctx: RouterContext) => {
        if (Object.keys(hotels).length === 0) {
            ctx.body = { message: "Aucun hôtels disponible" };
        } else {
            ctx.body = hotels;
        }
    })

    .get("/reservations", rateLimiter(15, 1), async (ctx: any) => {
        ctx.body = {
            "reservation1": "aaaaaaaaaaa",
            "reservation2": "bbbbbbbbb",
            "reservation3": "ccccccccccc"
        }
    })

    .get("/pictures/:hotel?", rateLimiter(15, 1), async (ctx: RouterContext) => {
        const hotelParam = ctx.params.hotel as string;
        if (hotelParam && hotelsWithPictures[hotelParam]) {
            const hotelArray = hotelsWithPictures[hotelParam];
            const hotelsWithNoPictures = hotelArray.filter(hotel => !hotel.pictures.photo1 && !hotel.pictures.photo2);
            if (hotelsWithNoPictures.length > 0) {
                ctx.status = 404;
                ctx.body = { message: "L'un des hôtels n'a aucune photo pour le moment" };
            } else {
                ctx.body = hotelArray;
            }
        } else if (hotelParam) {
            ctx.status = 404;
            ctx.body = { message: "Hotel not found" };
        } else {
            ctx.body = hotels;
        }
    })

    .get("/bookings", rateLimiter(15, 1), async (ctx: RouterContext) => {
        const bookedHotels = Object.keys(hotels).reduce((accum, key) => {
            const filteredHotels = hotelsWithBooking[key].filter(hotel => hotel.book === "true");
            if (filteredHotels.length > 0) {
                accum[key] = filteredHotels;
            }
            return accum;
        }, {} as Hotels);

        if (Object.keys(bookedHotels).length === 0) {
            ctx.status = 404;
            ctx.body = { message: "Vous n'avez fait aucune réservation" };
        } else {
            ctx.body = bookedHotels;
        }
    });
