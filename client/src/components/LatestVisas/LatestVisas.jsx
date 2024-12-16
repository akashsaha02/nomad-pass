import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const LatestVisas = () => {

  const [visas, setVisas] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/latest')
      .then((response) => {
        setVisas(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch latest visas:', error);
      });
  }, []);

  console.log(visas);


  return (
    <div>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Latest Visas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <div key={visa._id} className="bg-white shadow-md rounded-lg p-4">
            <img src={visa.countryImage} alt={visa.countryName} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{visa.countryName}</h3>
            <p className="text-gray-500 mt-2">{visa.visaType}</p>
            <p className="text-gray-500 mt-2">{visa.processingTime}</p>
            <p className="text-gray-500 mt-2">{visa.fee}</p>
            <p className="text-gray-500 mt-2">{visa.validity}</p>
            <Link to={`/visa-details/${visa._id}`}>See details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestVisas
