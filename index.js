app.post('/leetcode', async (req, res) => {
    console.log("Incoming request body:", req.body);  // Debug input from frontend

    try {
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        console.log("Leetcode response:", data);  // Debug response from LeetCode

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching from LeetCode:", err);  // Debug error
        res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
    }
});
