import axios from 'axios';
import { useState } from 'react';
import './styles/style.css'

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
                                placeholder='Digite o nome da cidade'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button type='submit'>
                                

                            </button>

                        </form>
                    </section>
                    <section className='info'>
                        {weather ? (
                            <div>
                                <h2>Clima para {weather.name}, {weather.sys.country}</h2>
                                <img src={`https://flagsapi.com/${weather.sys.country}/flat/48.png`} />
                                <p>Descrição: {weather.weather[0].description}</p>
                                <p>Temperatura: {weather.main.temp}°C</p>
                                <p>Sensação termica {weather.main.feels_like}°C</p>
                                <p>humidade: {weather.main.humidity}%</p>
                                <p>velocidade do vento: {weather.wind.speed}m/s, seta aqui {weather.wind.deg}°</p>
                                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
                            </div>
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
