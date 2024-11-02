const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { address } = req.body; 
    const token = process.env.TELEGRAM_TOKEN; 
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const message = `Пользователь по адресу: ${address}`;
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        });

        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
};
