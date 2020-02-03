import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    props.setFilter(event.target.value)
  }
  return (
    <div>
      find countries <input value={props.filter} onChange={handleFilterChange} />
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <h3>languages</h3>
      <div>
        <ul>
          {country.languages.map((language) =>
            <li key={language.name}>{language.name}</li>)}
        </ul>
      </div>
      <img src={country.flag} alt="flag" heigh="100" width="100" ></img>
    </div>
  )
}

const Countries = (props) => {

  const handleShowClick = (event) => {
    props.setFilter(event.target.value)
  }

  if (props.countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (props.countries.length > 1) {
    return (
      <div>
        {props.countries.map((country) =>
          <div key={country.name}>{country.name}
            <button value={country.name} onClick={handleShowClick}>show</button>
          </div>)}
      </div>
    )
  }
  if (props.countries.length === 1) {
    return (
      <div>
        <Country country={props.countries[0]}></Country>
      </div>
    )
  }
  return (
    <div></div>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const countriesToShow = filter
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return (
    <div>
      <Filter setFilter={setFilter} filter={filter}></Filter>
      <Countries setFilter={setFilter} 
      countries={countriesToShow}></Countries>
    </div>
  )

}

export default App;
