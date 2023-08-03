import React, { useState } from 'react';
import axios from 'axios';

const UriValidator = () => {
  const [searchTerm, setSearchTerm] = useState('Programming');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    // Wait 500ms before sending the request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // If the input is still the same after the timeout, make the API request
    if (input === searchTerm) {
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&format=json`
        );
        const data = response.data;
        const text = data[1];
        const links = data[3];
        const suggestionsList = text.map((item, index) => ({
          text: item,
          link: links[index],
        }));
        setSuggestions(suggestionsList);
      } catch (error) {
        console.error('Error fetching data from Wikipedia API:', error);
      }
    }
  };

  return (
    <div>
      <input
        data-testid="searchterm"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div data-testid="suggestion">
        {suggestions.map((item, index) => (
          <a key={index} href={item.link}>
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default UriValidator;
