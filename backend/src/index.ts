import express from 'express';
import type {Express} from 'express';
import cors from 'cors';
import continentRoutes from './continents/handler.ts';
import countryRoutes from './countries/handler.ts';
import cityRoutes from './cities/handler.ts';
import tourRoutes from './tours/handler.ts';
import flightRoutes from './flights/handler.ts';
import hotelRoutes from './hotels/handler.ts';
import restaurantRoutes from './restaurants/handler.ts';
import attractionRoutes from './attractions/handler.ts';

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cors());

app.use('/continents', continentRoutes)
app.use('/countries', countryRoutes)
app.use('/cities', cityRoutes)
app.use('/tours', tourRoutes)
app.use('/flights', flightRoutes)
app.use('/hotels', hotelRoutes)
app.use('/restaurants', restaurantRoutes)
app.use('/attractions', attractionRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
