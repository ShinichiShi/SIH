const axios = require('axios');

const handleShipping = async (req, res) => {
  try {
    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
      email: '',
      password: '',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch Shiprocket token' });
  }
};

module.exports = handleShipping