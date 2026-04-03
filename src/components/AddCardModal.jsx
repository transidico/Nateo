// SChermata per aggiungere una nuova card
import { useState } from 'react';

function AddCardModal({ onClose, onAdd }) {
    const [form, setForm] = useState({ titolo: '', immagine: '', descrizione: '' });
    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-mytheme-bg rounded-2xl p-8 w-96 flex flex-col gap-4 shadow-xl">
                <h2 className="text-xl font-bold text-mytheme-primary">Aggiungi una card</h2>
                <input id="titolo" type="text" placeholder="Titolo" value={form.titolo} onChange={update} className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <input id="immagine" type="text" placeholder="URL immagine" value={form.immagine} onChange={update} className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <textarea id="descrizione" placeholder="Descrizione" value={form.descrizione} onChange={update} className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-24" />
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300">Annulla</button>
                    <button onClick={() => {
                        const { titolo, immagine, descrizione } = form;
                        if (titolo && immagine && descrizione) { onAdd({ titolo, immagine, descrizione }); onClose(); }
                    }} className="px-4 py-2 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300">Aggiungi</button>
                </div>
            </div>
        </div>
    );
}

export default AddCardModal;


// SChermata per aggiungere una nuova card senza descrizione, usata per le dividere le destinazioni con cardglobe
export function AddGlobeModal({ onClose, onAdd }) {
    const [form, setForm] = useState({ titolo: '', immagine: '' });
    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-mytheme-bg rounded-2xl p-8 w-96 flex flex-col gap-4 shadow-xl">
                <h2 className="text-xl font-bold text-mytheme-primary">Aggiungi una destinazione</h2>
                <input id="titolo" type="text" placeholder="Titolo" value={form.titolo} onChange={update} className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <input id="immagine" type="text" placeholder="URL immagine" value={form.immagine} onChange={update} className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300">Annulla</button>
                    <button onClick={() => {
                        const { titolo, immagine } = form;
                        if (titolo && immagine) { onAdd({ titolo, immagine }); onClose(); }
                    }} className="px-4 py-2 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300">Aggiungi</button>
                </div>
            </div>
        </div>
    );
}
