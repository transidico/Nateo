import { useState, useRef } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
    { tipo: 'immagine', label: 'Immagine', icona: '🖼', descrizione: 'Foto con posizione' },
    { tipo: 'mappa', label: 'Mappa', icona: '📍', descrizione: 'Mappa interattiva' },
    { tipo: 'riquadro', label: 'Riquadro', icona: '▣', descrizione: 'Box di testo in evidenza' },
    { tipo: 'link', label: 'Link', icona: '🔗', descrizione: 'Collegamento a risorsa esterna' },
];

const CAMPI = {
    titolo1: [
        { id: 'testo', label: 'Testo del titolo', tipo: 'input' },
        { id: 'posizione', label: 'Posizione', tipo: 'select', opzioni: ['sinistra', 'centro', 'destra'] },
    ],
    titolo2: [
        { id: 'testo', label: 'Testo del titolo', tipo: 'input' },
        { id: 'posizione', label: 'Posizione', tipo: 'select', opzioni: ['sinistra', 'centro', 'destra'] },
    ],
    titolo3: [
        { id: 'testo', label: 'Testo del titolo', tipo: 'input' },
        { id: 'posizione', label: 'Posizione', tipo: 'select', opzioni: ['sinistra', 'centro', 'destra'] },
    ],
    paragrafo: [
        { id: 'testo', label: 'Testo del paragrafo', tipo: 'textarea' },
        { id: 'posizione', label: 'Posizione', tipo: 'select', opzioni: ['sinistra', 'centro', 'destra'] },
    ],
    immagine: [],
    // mappa: [{ id: 'citta', label: 'Nome città', tipo: 'input' }],
    mappa: [{ id: 'query', label: 'Città o URL mappa personalizzata', tipo: 'input' }],
    riquadro: [
        { id: 'testo', label: 'Testo del riquadro', tipo: 'textarea' },
        { id: 'posizione', label: 'Posizione', tipo: 'select', opzioni: ['sinistra', 'centro', 'destra'] },
    ],
    link: [{ id: 'etichetta', label: 'Testo del link', tipo: 'input' },
    { id: 'url', label: 'URL', tipo: 'input' }],
};


// ─── ModalTrip ────────────────────────────────────────────────────────────────
export function ModalTrip({ onClose, onAdd, bloccoIniziale = null }) {
    const [step, setStep] = useState(bloccoIniziale ? 2 : 1);
    const [selezionato, setSelezionato] = useState(bloccoIniziale?.tipo || null);
    const [form, setForm] = useState(bloccoIniziale ? { ...bloccoIniziale } : {});
    const [tabImmagine, setTabImmagine] = useState('url');
    const [fileSelezionato, setFileSelezionato] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    const handleAvanti = () => {
        if (!selezionato) return;
        setForm({});
        setTabImmagine('url');
        setFileSelezionato(null);
        setStep(2);
    };

    const handleIndietro = () => {
        setStep(1);
        setSelezionato(null);
        setForm({});
        setFileSelezionato(null);
    };

    const handleAggiungi = async () => {
        if (selezionato === 'immagine') {
            let urlFinale = form.url || '';

            if (tabImmagine === 'upload' && fileSelezionato) {
                setUploading(true);
                const formData = new FormData();
                formData.append('file', fileSelezionato);
                formData.append('upload_preset', 'Nateo_upload');

                const res = await fetch(`https://api.cloudinary.com/v1_1/dgdagj2bm/image/upload`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                urlFinale = data.secure_url;
                setUploading(false);
            }

            if (!urlFinale) return;
            onAdd({
                tipo: 'immagine',
                url: urlFinale,
                posizione: form.posizione || 'centro',
                dimensione: form.dimensione || 'media',
                didascalia: form.didascalia || '',
                testo: form.testo || '',
            });
            onClose();
            return;
        }

        const campiObbligatori = CAMPI[selezionato].filter(c => c.id !== 'didascalia' && c.tipo !== 'select');
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
                        : bloccoIniziale
                            ? `Modifica: ${BLOCCHI.find(b => b.tipo === selezionato)?.label}`
                            : `Configura: ${BLOCCHI.find(b => b.tipo === selezionato)?.label}`}
                </h2>

                {/* Step 1 */}
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

                {/* Step 2 — immagine */}
                {step === 2 && selezionato === 'immagine' && (
                    <div className="flex flex-col gap-4">
                        <div className="flex rounded-lg overflow-hidden border border-mytheme-primary">
                            <button onClick={() => setTabImmagine('url')}
                                className={`flex-1 py-2 text-sm transition-all duration-200 ${tabImmagine === 'url' ? 'bg-mytheme-primary text-white' : 'text-mytheme-text'}`}>
                                URL
                            </button>
                            <button onClick={() => setTabImmagine('upload')}
                                className={`flex-1 py-2 text-sm transition-all duration-200 ${tabImmagine === 'upload' ? 'bg-mytheme-primary text-white' : 'text-mytheme-text'}`}>
                                Carica file
                            </button>
                        </div>

                        {tabImmagine === 'url' && (
                            <input id="url" type="text" placeholder="URL immagine" value={form.url || ''} onChange={update}
                                className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                        )}

                        {tabImmagine === 'upload' && (
                            <div onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-mytheme-primary rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:bg-mytheme-primary/5 transition-all duration-200">
                                <span className="text-2xl">📁</span>
                                <span className="text-sm text-mytheme-text">
                                    {fileSelezionato ? fileSelezionato.name : 'Clicca per selezionare un file'}
                                </span>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                    onChange={(e) => setFileSelezionato(e.target.files[0])} />
                            </div>
                        )}

                        {uploading && (
                            <div className="w-full bg-mytheme-text/10 rounded-full h-2">
                                <div className="bg-mytheme-primary h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                            </div>
                        )}

                        <select id="posizione" value={form.posizione || 'centro'} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text">
                            <option value="sinistra">Sinistra</option>
                            <option value="centro">Centro</option>
                            <option value="destra">Destra</option>
                        </select>

                        <select id="dimensione" value={form.dimensione || 'media'} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text">
                            <option value="piccola">Piccola</option>
                            <option value="media">Media</option>
                            <option value="grande">Grande</option>
                        </select>

                        <input id="didascalia" type="text" placeholder="Didascalia (opzionale)" value={form.didascalia || ''} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />

                        <textarea id="testo" placeholder="Paragrafo affiancato (opzionale)" value={form.testo || ''} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-24" />
                    </div>
                )}

                {/* Step 2 — altri blocchi */}
                {step === 2 && selezionato !== 'immagine' && (
                    <div className="flex flex-col gap-4">
                        {CAMPI[selezionato].map((campo) => (
                            campo.tipo === 'textarea'
                                ? <textarea key={campo.id} id={campo.id} placeholder={campo.label}
                                    value={form[campo.id] || ''} onChange={update}
                                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-32" />
                                : campo.tipo === 'select'
                                    ? <select key={campo.id} id={campo.id}
                                        value={form[campo.id] || campo.opzioni[0]}
                                        onChange={update}
                                        className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text">
                                        {campo.opzioni.map(o => (
                                            <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
                                        ))}
                                    </select>
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
                        <button onClick={handleIndietro} disabled={uploading}
                            className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm disabled:opacity-40">
                            Indietro
                        </button>
                        <button onClick={handleAggiungi} disabled={uploading}
                            className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 disabled:opacity-40 text-sm">
                            {uploading ? `${uploadProgress}%` : 'Aggiungi'}
                        </button>
                    </>}
                </div>

            </div>
        </div>
    );
}