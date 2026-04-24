import { useState } from 'react';

// ─── AddCardModal ─────────────────────────────────────────────────────────────
function AddCardModal({ onClose, onAdd }) {
    const [form, setForm] = useState({ titolo: '', immagine: '', descrizione: '' });
    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 sm:px-4">
            <div className="bg-mytheme-bg rounded-2xl p-5 sm:p-8 w-full max-w-xs sm:max-w-sm flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-mytheme-primary">Aggiungi una card</h2>
                <input id="titolo" type="text" placeholder="Titolo" value={form.titolo} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <input id="immagine" type="text" placeholder="URL immagine" value={form.immagine} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <textarea id="descrizione" placeholder="Descrizione" value={form.descrizione} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-24" />
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose}
                        className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm">
                        Annulla
                    </button>
                    <button onClick={() => {
                        const { titolo, immagine, descrizione } = form;
                        if (titolo && immagine && descrizione) { onAdd({ titolo, immagine, descrizione }); onClose(); }
                    }} className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 text-sm">
                        Aggiungi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddCardModal;


// ─── AddGlobeModal ────────────────────────────────────────────────────────────
export function AddGlobeModal({ onClose, onAdd }) {
    const [form, setForm] = useState({ titolo: '', immagine: '' });
    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 sm:px-4">
            <div className="bg-mytheme-bg rounded-2xl p-5 sm:p-8 w-full max-w-xs sm:max-w-sm flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-mytheme-primary">Aggiungi una destinazione</h2>
                <input id="titolo" type="text" placeholder="Titolo" value={form.titolo} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <input id="immagine" type="text" placeholder="URL immagine" value={form.immagine} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose}
                        className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm">
                        Annulla
                    </button>
                    <button onClick={() => {
                        const { titolo, immagine } = form;
                        if (titolo && immagine) { onAdd({ titolo, immagine }); onClose(); }
                    }} className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 text-sm">
                        Aggiungi
                    </button>
                </div>
            </div>
        </div>
    );
}


// ─── Costanti ModalTrip ───────────────────────────────────────────────────────
const BLOCCHI = [
    { tipo: 'titolo1', label: 'Titolo 1', icona: 'H1', descrizione: 'Titolo principale' },
    { tipo: 'titolo2', label: 'Titolo 2', icona: 'H2', descrizione: 'Titolo secondario' },
    { tipo: 'titolo3', label: 'Titolo 3', icona: 'H3', descrizione: 'Titolo terziario' },
    { tipo: 'paragrafo', label: 'Paragrafo', icona: '¶', descrizione: 'Blocco di testo' },
    { tipo: 'immagine', label: 'Immagine', icona: '🖼', descrizione: 'URL immagine' },
    { tipo: 'mappa', label: 'Mappa', icona: '📍', descrizione: 'Mappa interattiva' },
    { tipo: 'riquadro', label: 'Riquadro', icona: '▣', descrizione: 'Box di testo in evidenza' },
    { tipo: 'link', label: 'Link', icona: '🔗', descrizione: 'Collegamento a risorsa esterna' },
];

const CAMPI = {
    titolo1: [{ id: 'testo', label: 'Testo del titolo', tipo: 'input' }],
    titolo2: [{ id: 'testo', label: 'Testo del titolo', tipo: 'input' }],
    titolo3: [{ id: 'testo', label: 'Testo del titolo', tipo: 'input' }],
    paragrafo: [{ id: 'testo', label: 'Testo del paragrafo', tipo: 'textarea' }],
    immagine: [{ id: 'url', label: 'URL immagine', tipo: 'input' },
    { id: 'didascalia', label: 'Didascalia (opzionale)', tipo: 'input' }],
    mappa: [{ id: 'citta', label: 'Nome città', tipo: 'input' }],
    riquadro: [{ id: 'testo', label: 'Testo del riquadro', tipo: 'textarea' }],
    link: [{ id: 'etichetta', label: 'Testo del link', tipo: 'input' },
    { id: 'url', label: 'URL', tipo: 'input' }],
};


// ─── ModalTrip ────────────────────────────────────────────────────────────────
export function ModalTrip({ onClose, onAdd }) {
    const [step, setStep] = useState(1);
    const [selezionato, setSelezionato] = useState(null);
    const [form, setForm] = useState({});

    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    const handleAvanti = () => {
        if (!selezionato) return;
        setForm({});
        setStep(2);
    };

    const handleIndietro = () => {
        setStep(1);
        setSelezionato(null);
        setForm({});
    };

    const handleAggiungi = () => {
        const campiObbligatori = CAMPI[selezionato].filter(c => c.id !== 'didascalia');
        const tuttiCompilati = campiObbligatori.every(c => form[c.id]?.trim());
        if (!tuttiCompilati) return;
        onAdd({ tipo: selezionato, ...form });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-mytheme-text/50 flex items-center justify-center z-50 px-6 sm:px-4">
            <div className="bg-mytheme-bg rounded-2xl p-5 sm:p-8 w-full max-w-sm sm:max-w-lg flex flex-col gap-6 shadow-xl max-h-[90vh] overflow-y-auto">

                <h2 className="text-xl font-bold text-mytheme-primary">
                    {step === 1
                        ? 'Aggiungi un blocco'
                        : `Configura: ${BLOCCHI.find(b => b.tipo === selezionato)?.label}`}
                </h2>

                {/* Step 1 — griglia 2 colonne su mobile, 3 su sm+ */}
                {step === 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {BLOCCHI.map((blocco) => (
                            <button
                                key={blocco.tipo}
                                onClick={() => setSelezionato(blocco.tipo)}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                    ${selezionato === blocco.tipo
                                        ? 'border-mytheme-primary bg-mytheme-primary/10'
                                        : 'border-mytheme-text/20 hover:border-mytheme-primary/50'}`}
                            >
                                <span className="text-2xl">{blocco.icona}</span>
                                <span className="text-sm font-bold text-mytheme-text">{blocco.label}</span>
                                <span className="text-xs text-mytheme-text/60 text-center hidden sm:block">{blocco.descrizione}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2 — campi compilazione */}
                {step === 2 && (
                    <div className="flex flex-col gap-4">
                        {CAMPI[selezionato].map((campo) => (
                            campo.tipo === 'textarea'
                                ? <textarea key={campo.id} id={campo.id} placeholder={campo.label}
                                    value={form[campo.id] || ''} onChange={update}
                                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-32" />
                                : <input key={campo.id} id={campo.id} type="text" placeholder={campo.label}
                                    value={form[campo.id] || ''} onChange={update}
                                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                        ))}
                    </div>
                )}

                {/* Bottoni */}
                <div className="flex gap-2 justify-end">
                    {step === 1 && <>
                        <button onClick={onClose}
                            className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm">
                            Annulla
                        </button>
                        <button onClick={handleAvanti} disabled={!selezionato}
                            className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm">
                            Avanti
                        </button>
                    </>}
                    {step === 2 && <>
                        <button onClick={handleIndietro}
                            className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm">
                            Indietro
                        </button>
                        <button onClick={handleAggiungi}
                            className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 text-sm">
                            Aggiungi
                        </button>
                    </>}
                </div>

            </div>
        </div>
    );
}