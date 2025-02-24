import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import { createMockServer } from '../mock/createMockServer';
import { act } from 'react';
import WeatherCard from '../components/WeatherCard';

let server;
beforeEach(() => {
    server = createMockServer();
});
afterEach(() => {
    server.shutdown();
});

describe('Weather App tests', () => {
    it('renders weather app title', () => {
        render(<App />);
        const title = screen.getByText(/Weather App/i);
        expect(title).toBeInTheDocument();
    });

    it('shows city search results', async () => {
        render(<App />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'Melbourne');

        const button = screen.getByTestId('search-button');
        await userEvent.click(button);


        await waitFor(() => expect(screen.getAllByText(/Melbourne/i)).toHaveLength(5));
    });

    it('shows city search result details', async () => {
        render(<App />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'Melbourne');

        const button = screen.getByTestId('search-button');
        await userEvent.click(button);

        await waitFor(() => expect(screen.getAllByText(/Melbourne/i)).toHaveLength(5));
        expect(screen.getByText(/-37.8141705, 144.9655616/i)).toBeInTheDocument();
    });

    it('add search result to my weather list', async () => {
        render(<App />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'Melbourne');

        const button = screen.getByTestId('search-button');
        await userEvent.click(button);

        await waitFor(() => expect(screen.getAllByText(/Melbourne/i)).toHaveLength(5));

        const selected = screen.getAllByText(/Melbourne/i)[0];
        await act(async () => {
            await userEvent.click(selected);
        })

        expect(within(screen.getByTestId('my-weather-list')).getByText(/Melbourne/i)).toBeInTheDocument();

        expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
    });
});

describe('WeatherCard component tests', () => {
    it('renders city name', () => {
        const city = {
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat: 0,
            lon: 0
        };

        render(<WeatherCard city={city} />);
        expect(screen.getByText(/Melbourne/i)).toBeInTheDocument();
    });

    it('renders temperature', async () => {
        const city = {
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat: 0,
            lon: 0
        };

        render(<WeatherCard city={city} />);
        await waitFor(() => expect(screen.getByText(14.93)).toBeInTheDocument());
    });

    it('renders placeholder when temperature is not available', () => {
        const city = {
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat: 0,
            lon: 0
        };

        render(<WeatherCard city={city} />);
        expect(screen.getByText('-/-')).toBeInTheDocument();
    });

    it('renders weather information', async () => {
        const city = {
            name: 'Melbourne',
            country: 'Australia',
            state: 'Victoria',
            lat: 0,
            lon: 0
        };

        render(<WeatherCard city={city} />);
        await waitFor(() => expect(screen.getByText(/Clouds/i)).toBeInTheDocument());
    });
});