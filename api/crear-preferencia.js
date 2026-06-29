export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { items, itemsConStock } = req.body;

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            items,
            metadata: {
                items: itemsConStock
            },
            external_reference: `iparadise-${Date.now()}`,
            notification_url: 'https://iparadise.com.ar/api/webhook-mp',
            back_urls: {
                success: 'https://iparadise.com.ar/gracias',
                failure: 'https://iparadise.com.ar/error',
                pending: 'https://iparadise.com.ar/pendiente'
            },
            auto_return: 'approved'
        })
    });

    const data = await response.json();
    res.status(200).json({ init_point: data.init_point });
}