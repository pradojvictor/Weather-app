import axios from 'axios';
import { useState } from 'react';
import './styles/style.css'
import { icons } from './assets/assets';

function App() {
    const [weather, setweather] = useState(null);
    const [city, setCity] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [language, setLang] = useState('pt_br')

    const fetchWeather = async () => {
        try {
            const rensponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&units=metric&appid=ae630488379a73f9a1c2b4114fb744d2`);
            setweather(rensponse.data)
        } catch (error) {
            console.error('error fetching weather data:', error)
        }
    };
    return (
        <main className='main'>
            <div className='glass'>
                <div className='div-1'>
                    <section className='search'>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            fetchWeather();
                        }}>
                            <input
                                type='text'
                                placeholder='Digite o nome da cidade...'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button type='submit'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    className="icon-search">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>

                        </form>
                    </section>
                    <section className='info'>
                        {weather ? (
                            <>
                                <div className='flag'>
                                    <img src={`https://flagsapi.com/${weather.sys.country}/flat/48.png`} />
                                </div>
                                <div className='div-2'>
                                    <div className='temp'>
                                        <p>{weather.main.temp} °C</p>
                                        <p className='city-name'>{weather.name}, {weather.sys.country}</p>
                                    </div>
                                    <div className='city-info'>
                                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                                        <p>{weather.weather[0].description}</p>
                                    </div>
                                    <div>
                                        <div className='icons'>
                                            <img src={icons.humidity} />
                                            <p>{weather.main.humidity} %</p>
                                        </div>
                                        <div className='icons'>
                                            <img src={icons.thermal} />
                                            <p>{weather.main.feels_like} °C</p>
                                        </div>
                                        <div className='icons'>
                                            <img src={icons.wind} />
                                            <p>{weather.wind.speed} m/s</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>nome incorreto</p>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default App
