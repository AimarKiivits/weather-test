import { createServer } from 'miragejs'
import results from './search-result.json'
import weather from './weather.json'

export const createMockServer = () => {
    return createServer({
        routes() {
            this.urlPrefix = 'http://api.openweathermap.org'
            this.get('/geo/1.0/direct', () => {
                return results
            })

            this.get('/data/2.5/weather', () => {
                return weather
            })
        },
    })
}