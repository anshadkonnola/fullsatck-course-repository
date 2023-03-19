import { useState } from 'react'
import CountryInfo from './CountryInfo'

const Country = ({ country }) => {
    const [showInfo, setShowInfo] = useState(false)

    return(
        <li>
            {country.name} <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'show'}</button>
            {showInfo ? <CountryInfo country={country} /> : <></>}
        </li>
    )
}

export default Country