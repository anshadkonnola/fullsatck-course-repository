import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ({ countries, filter }) => {
    if(filter === '') {
        return (
        <div>
            Search for a country
        </div>
        )
    }
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (filteredCountries.length > 10) {
        return (
        <div>
            Too many matches, specify another filter
        </div>
        )
    } else if (filteredCountries.length === 1) {
        return (
        <div>
            <CountryInfo country={filteredCountries[0]} />
        </div>
        )
    } else {
        return (
        <ul>
            {filteredCountries.map(country => 
                <Country
                    key={country.name}
                    country={country}
                />
             )}
        </ul>
        )
    }
}

export default Countries