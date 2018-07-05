//import { Router } from 'express';
import wrapResponseBody	from './wrapResponseBody'
import parseRequestBody	from './parseRequestBody'

/*export default function() {
	const routes = Router();

  if (process.env.ENV !== 'production')
    routes.use(morgan('dev'))

	return routes;
}*/

export default {
  wrapResponseBody : wrapResponseBody,
	parseRequestBody : parseRequestBody
}
