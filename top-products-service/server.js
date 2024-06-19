const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const API_URL = 'http://20.244.56.144';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NzgxODU0LCJpYXQiOjE3MTg3ODE1NTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImZmOWM1MWMxLTY5NDYtNGU3Yy04ODI5LTMwNDZhMjVlM2ZhMCIsInN1YiI6IjIxMDMwMzEyNDExNUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJhZmZvcmRtZWQiLCJjbGllbnRJRCI6ImZmOWM1MWMxLTY5NDYtNGU3Yy04ODI5LTMwNDZhMjVlM2ZhMCIsImNsaWVudFNlY3JldCI6IkpHbGVFUXVnckFReXBRaWEiLCJvd25lck5hbWUiOiJTdXNtaXQgS3Vsa2FybmkiLCJvd25lckVtYWlsIjoiMjEwMzAzMTI0MTE1QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsInJvbGxObyI6IjIxMDMwMzEyNDExNSJ9.HNEozwiHjkqqiG76QwHnEKaJLSWYt6eOH65Sih4aJDc'; 
async function fetchProducts(company, category, top, minPrice, maxPrice) {
    try {
        const response = await axios.get(`${API_URL}/test/companies/${company}/categories/${category}/products`, {
            params: {
                top,
                minPrice,
                maxPrice
            },
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
}

app.get('/test/companies/:companyname/categories/:categoryname/products', async (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top, minPrice, maxPrice } = req.query;

    try {
        const products = await fetchProducts(companyname, categoryname, top, minPrice, maxPrice);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});