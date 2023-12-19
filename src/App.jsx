import axios from 'axios';
import { useState } from 'react';
import './styles/style.css'
import { icons } from './assets/assets';

function App() {
    const [weather, setweather] = useState(null);
    const [city, setCity] = useState('');
    const [language, setLanguage] = useState('pt_br');
    const [units, setUnits] = useState('metric');
    const [simbolo, setSimb] = useState('C')

    const fetchWeather = async () => {
        try {
            const rensponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&units=${units}&appid=ae630488379a73f9a1c2b4114fb744d2`);
            setweather(rensponse.data)
        } catch (error) {
            console.error('error fetching weather data:', error)
        }
    };
    function unitMetric() {
        setUnits('metric');
        setSimb('C');
    }
    function unitImperial() {
        setUnits('imperial');
        setSimb('F');
    }
    return (
        <main className='main'>
            <div className='glass'>
                <div className='div-1'>
                    <section className='search'>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            fetchWeather();
                        }}>
                            <div className='div-form'>
                                <input
                                    type='text'
                                    placeholder='Digite o nome da cidade...'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <button className='btn-submit' type='submit'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                        className="icon-search">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </button>
                            </div>
                            <div className='line'></div>
                            <div className='div-btn-option'>
                                <button className='btn-option' onClick={() => setLanguage('en')} type='submit'>EN</button>
                                <button className='btn-option' onClick={() => setLanguage('pt_br')} type='submit'>PT-BR</button>
                                <button className='btn-option' onClick={unitImperial} type='submit'>°F</button>
                                <button className='btn-option' onClick={unitMetric} type='submit'>°C</button>
                            </div>
                            <div className='line'></div>
                           
                        </form>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            fetchWeather();
                        }}>
                        <div className='div-city'>
                                <button className='btn-cities' type='submit' onClick={() => setCity('New York')}><h3>New York, US</h3></button>
                                <button className='btn-cities' type='submit' onClick={() => setCity('Tokyo')}><h3>Tokyo, JP</h3></button>
                                <button className='btn-cities' type='submit' onClick={() => setCity('Seoul')}><h3>Seoul, KR</h3></button>
                                <button className='btn-cities' type='submit' onClick={() => setCity('Paris')}><h3>Paris, FR</h3></button>
                            </div>
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
                                        <p>{weather.main.temp} °{simbolo}</p>
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
                                            <p>{weather.main.feels_like} °{simbolo}</p>
                                        </div>
                                        <div className='icons'>
                                            <img src={icons.wind} />
                                            <p>{weather.wind.speed} m/s</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className='intro-name'>Weather App</p>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default App
