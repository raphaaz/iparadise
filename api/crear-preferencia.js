export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { items } = req.body;

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            items,
            shipments: {
                mode: "me2"
            },
            back_urls: {
                success: 'https://iparadise.vercel.app/gracias',
                failure: 'https://iparadise.vercel.app/error',
                pending: 'https://iparadise.vercel.app/pendiente'
            },
            auto_return: 'approved'
        })
    });

    const data = await response.json();
    res.status(200).json({ init_point: data.init_point });
}