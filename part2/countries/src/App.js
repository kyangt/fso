import React, {useEffect, useState} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({filterCountry, handleCountryChange}) => {
	return (
		<div>
			Please filter country:{' '}
			<input value={filterCountry} onChange={handleCountryChange} />
		</div>
	)
}

const ButtontoShow = ({country, handleButtonClick}) => {
	return (
		<div>
			<button onClick={() => handleButtonClick(country)}>Show</button>
		</div>
	)
}

const Languages = ({languages}) => {
	return languages.map(language => {
		return <li key={language}>{language}</li>
	})
}

const Countries = ({countries, handleButtonClick}) => {
	if (countries.length === 0) {
		return <div>Please provide a filter to search country</div>
	} else if (countries.length > 10) {
		return <div>Too many matches, specify another filter</div>
	} else if (countries.length === 1) {
		const tempCountry = countries[0]
		const tempCountryName = tempCountry.name.common
		const tempCountryLanguages = Object.values(tempCountry.languages)
		return (
			<div>
				<div>
					<h1>{tempCountryName}</h1>
					Capital: {tempCountry.capital}
					<br />
					Population: {tempCountry.population}
					<br />
				</div>
				<div>
					<h2>Languages</h2>
					<ul>
						<Languages languages={tempCountryLanguages} />
					</ul>
					<br />
				</div>
				<img src={tempCountry.flags.png} alt={tempCountryName} />
				<Weather city={tempCountry.capital[0]} />
			</div>
		)
	} else {
		return countries.map((country, countryIndex) => {
			return (
				<div key={country.name.common}>
					{country.name.common}{' '}
					<ButtontoShow
						country={country.name.common}
						handleButtonClick={handleButtonClick}
					/>
				</div>
			)
		})
	}
}

const Weather = ({city}) => {
	const [temperature, setTemperature] = useState('')
	const [weather, setWeather] = useState('')
	const [weatherIcon, setWeatherIcon] = useState('')
	const [wind, setWind] = useState([])

	const degToDirection = num => {
		const val = Math.floor(num / 22.5 + 0.5) % 16
		const arr = [
			'N',
			'NNE',
			'NE',
			'ENE',
			'E',
			'ESE',
			'SE',
			'SSE',
			'S',
			'SSW',
			'SW',
			'WSW',
			'W',
			'WNW',
			'NW',
			'NNW',
		]
		return arr[val]
	}

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
			)
			.then(response => {
				const WeatherData = response.data
				setTemperature(`${WeatherData.main.temp} Celsius`)
				setWeather(WeatherData.weather[0].main)
				setWeatherIcon(
					`https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`
				)
				setWind([WeatherData.wind.speed, WeatherData.wind.deg])
			})
		return () => {
			setTemperature('')
			setWeather('')
			setWeatherIcon('')
			setWind([])
		}
	}, [city])

	return (
		<div>
			<h2>Weather in {city}</h2>
			<img src={weatherIcon} alt={`weather in ${city}`} />
			<br />
			<strong>Weather:</strong> {weather}
			<br />
			<strong>Temperature:</strong> {temperature}
			<br />
			<strong>Wind:</strong> {wind[0]} m/s direction{' '}
			{degToDirection(wind[1])}
		</div>
	)
}

const App = () => {
	const [filterCountry, setFilterCountry] = useState('')
	const [countries, setCountries] = useState([])

	const url = filterCountry
		? `https://restcountries.com/v3.1/name/${filterCountry}`
		: ''

	const handleCountryChange = event => {
		setFilterCountry(event.target.value)
	}

	const handleButtonClick = country => {
		setFilterCountry(country)
	}

	useEffect(() => {
		if (filterCountry) {
			axios
				.get(url)
				.then(response => {
					setCountries(response.data)
				})
				.catch(error => {
					setCountries([])
				})
		}
		return () => setCountries([])
	}, [filterCountry, url])

	return (
		<div>
			<Filter
				filterCountry={filterCountry}
				handleCountryChange={handleCountryChange}
			/>
			<Countries
				countries={countries}
				handleButtonClick={handleButtonClick}
			/>
		</div>
	)
}

export default App
