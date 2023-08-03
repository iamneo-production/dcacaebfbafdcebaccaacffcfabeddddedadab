import axios from 'axios';

const fetchData = async (searchTerm) => {
  const params = {
    action: 'opensearch',
    origin: '*',
    search: searchTerm
  };

  try {
    const res = await axios.get('https://en.wikipedia.org/w/api.php', { params });
    return res.data[1].map((suggestion, i) => ({ text: suggestion, link: res.data[3][i] }));
  } catch (error) {
    console.log(error);
  }
};

export default fetchData;
