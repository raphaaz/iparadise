export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { type, data } = req.body;

        if (type !== 'payment') return res.status(200).end();

        // Obtener detalles del pago
        const pagoRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
            headers: {
                'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        });

        const pago = await pagoRes.json();

        if (pago.status !== 'approved') return res.status(200).end();

        // Leer los items guardados en metadata
        const items = pago.metadata?.items;
        if (!items || !Array.isArray(items)) return res.status(200).end();

        // Actualizar stock en Supabase por cada item
        for (const item of items) {
            const colorParam = item.color_nombre
                ? `color_nombre=eq.${encodeURIComponent(item.color_nombre)}`
                : `color_nombre=is.null`;

            await fetch(`${process.env.SUPABASE_URL}/rest/v1/stock?producto_id=eq.${item.producto_id}&${colorParam}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': process.env.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    stock_actual: item.stock_nuevo,
                    updated_at: new Date().toISOString()
                })
            });
        }

        res.status(200).end();
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).end();
    }
}