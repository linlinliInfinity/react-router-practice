import React, { useState, useEffect } from "react";



import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const fetchCountriesImplicitPromise = () =>
	fetch("https://api.covid19api.com/countries").then(result => result.json());

// Explicit Promise
export const fetchCountriesExplicitPromise = () =>
	new Promise((resolve, reject) => {
		fetch("https://api.covid19api.com/countries")
			.then(result => result.json())
			.then(data => resolve(data))
			.catch(error => reject(error));
	});

// Async/Await
export const fetchCountriesAsync = async () => {
	const result = await fetch("https://api.covid19api.com/countries");
	return result.json();
};

const Post = () => {
  const { id } = useParams();
  return <h2>This is Country Name: {id} </h2>;
};
const HomePage=()=><h1>I am at Home Page</h1>

const Button = ({currentCountry,country,setCountry })=>{

const navigate = useNavigate();


  return  <button
                className={`${
                  currentCountry === country.Country ? "selected" : null
                }`}
                onClick={() => {
                  setCountry(country.Country);
                  navigate(`/country/${country.Country}`);
                }}
              >
                {country.Country}
              </button>
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCountry] = useState("");
  
  useEffect(() => {
    fetchCountriesImplicitPromise().then(setCountries);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <section>
          {countries.length &&
            countries.map((country) => <Button currentCountry={currentCountry}  country={country} setCountry={setCountry}/>)}
        </section>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
 
          <Route path="/country/:id" element={<Post />}  exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
