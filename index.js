const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/leetcode', async (req, res) => {
    console.log("Incoming request body:", req.body); 

    try {
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        if (data.errors) {
             console.error("LeetCode API Errors:", data.errors);
             return res.status(400).json(data);
        }

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching from LeetCode:", err);
        res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
