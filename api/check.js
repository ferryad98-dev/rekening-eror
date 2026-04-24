export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code_bank, account_number } = req.body;

  if (!code_bank || !account_number) {
    return res.status(400).json({ status: 'false', account_holder: 'Invalid', account_number: 'Invalid' });
  }

  const API_KEY = 'mt8i7dZxOUBtlMsMRyZ9lmsVE9jQCW4oJOIXj3YTxq4F8BzpsAbNJ8LAEZLg';

  try {
    const formData = new URLSearchParams();
    formData.append('api_key', API_KEY);
    formData.append('code_bank', code_bank);
    formData.append('account_number', account_number);

    const apiResponse = await fetch('https://cekbank.my.id/api/bank_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      body: formData,
    });

    const data = await apiResponse.json();
    
    // Untuk debugging di Vercel Logs
    console.log('API Response:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: "false",
      account_holder: "Error Server",
      account_number: "Invalid"
    });
  }
}
