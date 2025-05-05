import express, {Express} from 'express';
import cors from 'cors';
import continentRoutes from './continents/handler';
import countryRoutes from './countries/handler';
import cityRoutes from './cities/handler';
import tourRoutes from './tours/handler'
import flightRoutes from './flights/handler';
import hotelRoutes from './hotels/handler';
import restaurantRoutes from './restaurants/handler';
import attractionRoutes from './attractions/handler';

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
