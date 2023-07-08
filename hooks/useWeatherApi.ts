import axios from "axios";
import React from "react";

const useWeatherApi = (cityName: string, days: number) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const forcast_endpoint = `http://api.weatherapi.com/v1/current.json?key=af023ef008a7404eb5554235230807&q=${cityName}&days=${days}&aqi=no`;
  const search_endpoint = `http://api.weatherapi.com/v1/search.json?key=af023ef008a7404eb5554235230807&q=${cityName}`;

  const apiCall = async (query: string) => {
    const options = {
      method: "GET",
      url: forcast_endpoint,
    };

    try {
      setLoading(true);
      const res = await axios.request(options);
      setData(res.data);
    } catch (error) {
      console.log("❌ File:useWeatherApi | Function: apiCall | error:", error);

      setError(true);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForcast = () => {
    return apiCall(forcast_endpoint);
  };

  React.useEffect(() => {
    fetchWeatherForcast();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useWeatherApi;
