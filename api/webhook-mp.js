export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { type, data } = req.body;

    // Solo nos interesa cuando se aprueba un pago
    if (type !== 'payment') return res.status(200).end();

    try {
        // Consultamos los detalles del pago a la API de MP
        const pagoRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
            headers: {
                'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        });
        const pago = await pagoRes.json();

        if (pago.status !== 'approved') return res.status(200).end();

        // Armamos el resumen de los items
        const items = pago.additional_info?.items || [];
        const resumenItems = items.length > 0
            ? items.map(i => `• ${i.title} x${i.quantity} — $${i.unit_price}`).join('\n')
            : 'Sin detalle de productos';

        const total = pago.transaction_amount;
        const nombre = pago.payer?.first_name || 'Cliente';
        const email = pago.payer?.email || 'Sin email';
        const pagoId = pago.id;

        const mensaje = `🛍️ *NUEVA VENTA - iParadise*

👤 *Cliente:* ${nombre}
📧 *Email:* ${email}

🛒 *Productos:*
${resumenItems}

💰 *Total pagado:* $${total}
🆔 *ID de pago:* ${pagoId}

📦 Coordiná el envío con el cliente.`;

        // Mandamos el WhatsApp via API de WhatsApp Business (usando CallMeBot, gratis)
        const numero = '5493454193823';
        const urlWA = `https://api.callmebot.com/whatsapp.php?phone=${numero}&text=${encodeURIComponent(mensaje)}&apikey=${process.env.CALLMEBOT_API_KEY}`;
        await fetch(urlWA);

    } catch (err) {
        console.error('Error en webhook:', err);
    }

    res.status(200).end();
}