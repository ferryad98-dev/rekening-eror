export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code_bank, account_number } = req.body;

  if (!code_bank || !account_number) {
    return res.status(400).json({ status: 'false', account_holder: 'Invalid', account_number: 'Invalid' });
  }

  const API_KEY = 'mt8i7dZxOUBtlMsMRyZ9lmsVE9jQCW4oJOIXj3YTxq4F8BzpsAbNJ8LAEZLg';

  const formData = new FormData();
  formData.append('api_key', API_KEY);
  formData.append('code_bank', code_bank);
  formData.append('account_number', account_number);

  try {
    const response = await fetch('https://cekbank.my.id/api/bank_check', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'false', account_holder: 'Error', account_number: 'Invalid' });
  }
}
