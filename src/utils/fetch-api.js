import axios from 'axios';

const API_KEY = '28568095-bde867e5bbf77d76bd3de06b6';
export const per_page = 12;
axios.defaults.baseURL = 'https://pixabay.com/';

export const fetchPhotos = (query, page) => {
  return axios
    .get('/api/', {
      params: {
        q: query,
        page,
        per_page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    })
    .then(response => response.data);
};
