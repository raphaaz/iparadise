import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Admin() {
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [stock, setStock] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [guardando, setGuardando] = useState(null);
    const [mensaje, setMensaje] = useState('');

    // Verificar sesión al cargar
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) cargarStock();
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) cargarStock();
        });

        return () => subscription.unsubscribe();
    }, []);

    const cargarStock = async () => {
        setCargando(true);
        const { data, error } = await supabase
            .from('stock')
            .select('*')
            .order('producto_id', { ascending: true });
        if (!error) setStock(data);
        setCargando(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError('Email o contraseña incorrectos');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setStock([]);
    };

    const actualizarStock = async (id, nuevoStock) => {
        setGuardando(id);
        const { error } = await supabase
            .from('stock')
            .update({ stock_actual: parseInt(nuevoStock), updated_at: new Date().toISOString() })
            .eq('id', id);
        
        if (!error) {
            setStock(prev => prev.map(item => item.id === id ? { ...item, stock_actual: parseInt(nuevoStock) } : item));
            setMensaje('✅ Guardado');
            setTimeout(() => setMensaje(''), 2000);
        }
        setGuardando(null);
    };

    // PANTALLA DE LOGIN
    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-center mb-6">Panel Admin</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-500">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full bg-black text-white py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // PANTALLA DE ADMIN
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Panel de Stock</h1>
                <div className="flex items-center gap-4">
                    {mensaje && <span className="text-green-600 text-sm font-medium">{mensaje}</span>}
                    <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-black border px-3 py-1.5 rounded-lg transition-colors">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {cargando ? (
                <p className="text-center text-gray-500 py-12">Cargando stock...</p>
            ) : (
                <div className="bg-white rounded-2xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left px-4 py-3 font-bold text-xs uppercase text-gray-500">ID</th>
                                <th className="text-left px-4 py-3 font-bold text-xs uppercase text-gray-500">Color / Modelo</th>
                                <th className="text-left px-4 py-3 font-bold text-xs uppercase text-gray-500">Stock</th>
                                <th className="text-left px-4 py-3 font-bold text-xs uppercase text-gray-500">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {stock.map(item => (
                                <StockRow key={item.id} item={item} onGuardar={actualizarStock} guardando={guardando} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function StockRow({ item, onGuardar, guardando }) {
    const [valor, setValor] = useState(item.stock_actual);

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-400 font-mono text-xs">{item.producto_id}</td>
            <td className="px-4 py-3 font-medium">{item.color_nombre || '—'}</td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    className="w-20 px-2 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
            </td>
            <td className="px-4 py-3">
                <button
                    onClick={() => onGuardar(item.id, valor)}
                    disabled={guardando === item.id || parseInt(valor) === item.stock_actual}
                    className="px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800 disabled:opacity-40 transition-colors"
                >
                    {guardando === item.id ? 'Guardando...' : 'Guardar'}
                </button>
            </td>
        </tr>
    );
}