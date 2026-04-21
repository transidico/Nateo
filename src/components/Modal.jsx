// Schermata per aggiungere una nuova card
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


// Schermata per aggiungere una nuova card senza descrizione, usata per le dividere le destinazioni con cardglobe
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

// Lista dei blocchi disponibili per costruire l'articolo del viaggio
const BLOCCHI = [
    { tipo: 'titolo1', label: 'Titolo 1', icona: 'H1', descrizione: 'Titolo principale' },
    { tipo: 'titolo2', label: 'Titolo 2', icona: 'H2', descrizione: 'Titolo secondario' },
    { tipo: 'titolo3', label: 'Titolo 3', icona: 'H3', descrizione: 'Titolo terziario' },
    { tipo: 'paragrafo', label: 'Paragrafo', icona: '¶', descrizione: 'Blocco di testo' },
    { tipo: 'immagine', label: 'Immagine', icona: '🖼', descrizione: 'URL immagine' },
    { tipo: 'mappa', label: 'Mappa', icona: '📍', descrizione: 'Mappa interattiva' },
    { tipo: 'riquadro', label: 'Riquadro', icona: '▣', descrizione: 'Box di testo in evidenza' },
    { tipo: 'link', label: 'Link', icona: '🔗', descrizione: 'Collegamento a una risorsa esterna' },
];

// Modal per scegliere il tipo di blocco da aggiungere all'articolo.
// onClose: chiude il modal | onSelect: passa il tipo scelto al padre
export function ModalTrip({ onClose, onSelect }) {
    const [selezionato, setSelezionato] = useState(null);

    // Conferma la selezione e notifica il padre solo se un blocco è stato scelto
    const handleConferma = () => {
        if (!selezionato) return;
        onSelect(selezionato);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-mytheme-text/50 flex items-center justify-center z-50">
            <div className="bg-mytheme-bg rounded-2xl p-8 w-[500px] flex flex-col gap-6 shadow-xl">

                <h2 className="text-xl font-bold text-mytheme-primary">Aggiungi un blocco</h2>

                {/* Griglia dei blocchi — si evidenzia quello selezionato */}
                <div className="grid grid-cols-3 gap-3">
                    {BLOCCHI.map((blocco) => (
                        <button
                            key={blocco.tipo}
                            onClick={() => setSelezionato(blocco.tipo)}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                ${selezionato === blocco.tipo
                                    ? 'border-mytheme-primary bg-mytheme-primary/10'  // selezionato appare ben visisbile
                                    : 'border-mytheme-text/20 hover:border-mytheme-primary/50'}`}  // non selezionato appare sbiadito/grigio
                        >
                            <span className="text-2xl text-mytheme-primary">{blocco.icona}</span>
                            <span className="text-sm font-bold text-mytheme-text">{blocco.label}</span>
                            <span className="text-xs text-mytheme-text/60 text-center">{blocco.descrizione}</span>
                        </button>
                    ))}
                </div>

                {/* Annulla torna indietro, Avanti è disabilitato finché non si sceglie un blocco */}
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300">
                        Annulla
                    </button>
                    <button
                        onClick={handleConferma}
                        disabled={!selezionato}
                        className="px-4 py-2 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                        Avanti
                    </button>
                </div>

            </div>
        </div>
    );
}