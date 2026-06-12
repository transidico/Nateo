import { useState, useRef } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import countries from 'world-countries';

//=========================================================================================================================
//=========================================================================================================================
// ─── AddCardModal ─────────────────────────────────────────────────────────────
// Modal per aggiungere una nuova card alla home (titolo, immagine, descrizione)
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
                    {/* Aggiunge la card solo se tutti i campi sono compilati */}
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

//=========================================================================================================================
//=========================================================================================================================
// ─── AddGlobeModal ────────────────────────────────────────────────────────────
// Modal per aggiungere una nuova destinazione (continente/paese) nella pagina Destinations
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
                    {/* Aggiunge la destinazione solo se titolo e immagine sono compilati */}
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

//=========================================================================================================================
//=========================================================================================================================
// ─── Costanti ModalTrip ───────────────────────────────────────────────────────
// Lista dei tipi di blocco disponibili per costruire l'articolo del viaggio
const BLOCCHI = [
    { tipo: 'titolo1', label: 'Titolo 1', icona: 'H1', descrizione: 'Titolo principale' },
    { tipo: 'titolo2', label: 'Titolo 2', icona: 'H2', descrizione: 'Titolo secondario' },
    { tipo: 'titolo3', label: 'Titolo 3', icona: 'H3', descrizione: 'Titolo terziario' },
    { tipo: 'paragrafo', label: 'Paragrafo', icona: '¶', descrizione: 'Blocco di testo' },
    { tipo: 'immagine', label: 'Immagine', icona: '🖼', descrizione: 'Foto con posizione' },
    { tipo: 'mappa', label: 'Mappa', icona: '📍', descrizione: 'Mappa interattiva' },
    { tipo: 'riquadro', label: 'Riquadro', icona: '▣', descrizione: 'Box di testo in evidenza' },
    { tipo: 'link', label: 'Link', icona: '🔗', descrizione: 'Collegamento a risorsa esterna' },
    { tipo: 'album', label: 'Album', icona: '🎞️', descrizione: 'Album di immagini' },
];

// Campi da compilare nello step 2 per ogni tipo di blocco.
// Il blocco immagine è gestito separatamente con la sua UI dedicata.
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
    immagine: [], // gestito con UI dedicata nello step 2
    mappa: [{ id: 'query', label: 'Città o URL mappa personalizzata', tipo: 'input' }],
    riquadro: [
        { id: 'testo', label: 'Testo del riquadro', tipo: 'textarea' },
        { id: 'posizione', label: 'Posizione', tipo: 'select', opzioni: ['sinistra', 'centro', 'destra'] },
    ],
    link: [
        { id: 'etichetta', label: 'Testo del link', tipo: 'input' },
        { id: 'url', label: 'URL', tipo: 'input' },
    ],
    album: [
        { id: 'immagini', label: 'Immagini', tipo: 'array' },
    ],
};


// ─── ModalTrip ────────────────────────────────────────────────────────────────
// Modal a due step per aggiungere o modificare un blocco dell'articolo.
// Step 1: scelta del tipo di blocco (saltato se bloccoIniziale è fornito)
// Step 2: compilazione dei campi specifici per il blocco scelto
// onClose: chiude il modal | onAdd: salva il blocco | bloccoIniziale: dati precompilati per la modifica
export function ModalTrip({ onClose, onAdd, bloccoIniziale = null }) {
    // Se bloccoIniziale è fornito si parte direttamente dallo step 2 con i dati precompilati
    const [step, setStep] = useState(bloccoIniziale ? 2 : 1);
    const [selezionato, setSelezionato] = useState(bloccoIniziale?.tipo || null);
    const [form, setForm] = useState(bloccoIniziale ? { ...bloccoIniziale } : {});
    const [tabImmagine, setTabImmagine] = useState('url');       // tab attiva: 'url' o 'upload'
    const [fileSelezionato, setFileSelezionato] = useState(null); // file selezionato per l'upload
    const [uploading, setUploading] = useState(false);           // stato di caricamento su Cloudinary
    const [uploadProgress, setUploadProgress] = useState(0);     // percentuale di avanzamento upload
    const fileInputRef = useRef(null);                           // ref per l'input file nascosto

    // Aggiorna il form al cambio di un campo
    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    // Passa allo step 2 resettando il form
    const handleAvanti = () => {
        if (!selezionato) return;
        setForm({});
        setTabImmagine('url');
        setFileSelezionato(null);
        setStep(2);
    };

    // Torna allo step 1 resettando tutto
    const handleIndietro = () => {
        setStep(1);
        setSelezionato(null);
        setForm({});
        setFileSelezionato(null);
    };

    // Salva il blocco — gestisce separatamente il blocco immagine per l'upload su Cloudinary
    const handleAggiungi = async () => {
        if (selezionato === 'immagine') {
            let urlFinale = form.url || '';

            // Se l'utente ha selezionato un file, lo carica su Cloudinary e ottiene l'URL
            if (tabImmagine === 'upload' && fileSelezionato) {
                setUploading(true);
                const formData = new FormData();
                formData.append('file', fileSelezionato);
                formData.append('upload_preset', 'Nateo_upload'); // preset unsigned su Cloudinary

                const res = await fetch(`https://api.cloudinary.com/v1_1/dgdagj2bm/image/upload`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                urlFinale = data.secure_url.replace('/upload/', '/upload/w_1920,h_1080,c_limit,q_auto,f_auto/'); // URL pubblico dell'immagine caricata
                setUploading(false);
            }

            if (!urlFinale) return; // blocca se non c'è nessun URL
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

        if (selezionato === 'album') {
            const immagini = (form.immagini || []).filter(img => img.url);
            if (immagini.length === 0) return;
            onAdd({ tipo: 'album', immagini });
            onClose();
            return;
        }

        // Per tutti gli altri blocchi: verifica che i campi obbligatori siano compilati
        const campiObbligatori = CAMPI[selezionato].filter(c => c.id !== 'didascalia' && c.tipo !== 'select');
        const tuttiCompilati = campiObbligatori.every(c => form[c.id]?.trim());
        if (!tuttiCompilati) return;
        onAdd({ tipo: selezionato, ...form });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-mytheme-text/50 flex items-center justify-center z-50 px-6 sm:px-4">
            <div className="bg-mytheme-bg rounded-2xl p-5 sm:p-8 w-full max-w-sm sm:max-w-lg flex flex-col gap-6 shadow-xl max-h-[90vh] overflow-y-auto">

                {/* Titolo dinamico: cambia in base allo step e alla modalità aggiunta/modifica */}
                <h2 className="text-xl font-bold text-mytheme-primary">
                    {step === 1
                        ? 'Aggiungi un blocco'
                        : bloccoIniziale
                            ? `Modifica: ${BLOCCHI.find(b => b.tipo === selezionato)?.label}`
                            : `Configura: ${BLOCCHI.find(b => b.tipo === selezionato)?.label}`}
                </h2>

                {/* Step 1 — griglia di scelta del tipo di blocco (2 colonne mobile, 3 desktop) */}
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

                {/* Step 2 — UI dedicata per il blocco immagine */}
                {step === 2 && selezionato === 'immagine' && (
                    <div className="flex flex-col gap-4">
                        {/* Tab per scegliere tra URL e upload file */}
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

                        {/* Input URL immagine */}
                        {tabImmagine === 'url' && (
                            <input id="url" type="text" placeholder="URL immagine" value={form.url || ''} onChange={update}
                                className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                        )}

                        {/* Area di upload file — click apre il file picker nascosto */}
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

                        {/* Barra di avanzamento upload su Cloudinary */}
                        {uploading && (
                            <div className="w-full bg-mytheme-text/10 rounded-full h-2">
                                <div className="bg-mytheme-primary h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                            </div>
                        )}

                        {/* Posizione dell'immagine nella pagina */}
                        <select id="posizione" value={form.posizione || 'centro'} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text">
                            <option value="sinistra">Sinistra</option>
                            <option value="centro">Centro</option>
                            <option value="destra">Destra</option>
                        </select>

                        {/* Dimensione dell'immagine */}
                        <select id="dimensione" value={form.dimensione || 'media'} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text">
                            <option value="piccola">Piccola</option>
                            <option value="media">Media</option>
                            <option value="grande">Grande</option>
                        </select>

                        {/* Didascalia opzionale sotto l'immagine */}
                        <input id="didascalia" type="text" placeholder="Didascalia (opzionale)" value={form.didascalia || ''} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />

                        {/* Paragrafo opzionale affiancato all'immagine (solo se posizione è sinistra o destra) */}
                        <textarea id="testo" placeholder="Paragrafo affiancato (opzionale)" value={form.testo || ''} onChange={update}
                            className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-24" />
                    </div>
                )}

                {/* Step 2 — campi generici per tutti gli altri tipi di blocco */}
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
                {/* Step 2 — album */}
                {step === 2 && selezionato === 'album' && (
                    <AlbumEditor form={form} setForm={setForm} uploading={uploading}
                        setUploading={setUploading} uploadProgress={uploadProgress}
                        setUploadProgress={setUploadProgress} />
                )}

                {/* Bottoni navigazione — cambiano in base allo step e allo stato di upload */}
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
                        {/* Indietro disabilitato durante l'upload per evitare interruzioni */}
                        <button onClick={handleIndietro} disabled={uploading}
                            className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm disabled:opacity-40">
                            Indietro
                        </button>
                        {/* Mostra la percentuale di upload al posto del testo "Aggiungi" */}
                        <button onClick={handleAggiungi} disabled={uploading}
                            className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 disabled:opacity-40 text-sm">
                            {uploading ? `${uploadProgress}%` : bloccoIniziale ? 'Salva' : 'Aggiungi'}
                        </button>
                    </>}
                </div>

            </div>
        </div>
    );
}

function AlbumEditor({ form, setForm, setUploading, setUploadProgress }) {
    const immagini = form.immagini || [{ url: '', didascalia: '' }];
    const fileRefs = useRef([]);

    const aggiornaImmagine = (i, campo, valore) => {
        const nuove = [...immagini];
        nuove[i] = { ...nuove[i], [campo]: valore };
        setForm(f => ({ ...f, immagini: nuove }));
    };

    const aggiungi = () => {
        if (immagini.length >= 10) return;
        setForm(f => ({ ...f, immagini: [...immagini, { url: '', didascalia: '' }] }));
    };

    const rimuovi = (i) => {
        const nuove = immagini.filter((_, idx) => idx !== i);
        setForm(f => ({ ...f, immagini: nuove }));
    };

    const uploadFile = async (i, file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Nateo_upload');
        const res = await fetch(`https://api.cloudinary.com/v1_1/dgdagj2bm/image/upload`, {
            method: 'POST', body: formData,
        });
        const data = await res.json();
        aggiornaImmagine(i, 'url', data.secure_url);
        setUploading(false);
        setUploadProgress(0);
    };

    return (
        <div className="flex flex-col gap-4">
            {immagini.map((img, i) => (
                <div key={i} className="flex flex-col gap-2 border border-mytheme-primary/30 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-mytheme-primary">Foto {i + 1}</span>
                        {immagini.length > 1 && (
                            <button onClick={() => rimuovi(i)}
                                className="text-xs text-red-400 hover:text-red-600">Rimuovi</button>
                        )}
                    </div>

                    {/* Anteprima se URL presente */}
                    {img.url && (
                        <img src={img.url} alt="" className="w-full h-24 object-cover rounded-lg" />
                    )}

                    {/* Input URL */}
                    <input type="text" placeholder="URL immagine"
                        value={img.url} onChange={e => aggiornaImmagine(i, 'url', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text text-sm" />

                    {/* Upload file */}
                    <div onClick={() => fileRefs.current[i]?.click()}
                        className="border border-dashed border-mytheme-primary/50 rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-mytheme-primary/5 text-sm text-mytheme-text/60">
                        <span>📁</span> Carica da file
                        <input type="file" accept="image/*" className="hidden"
                            ref={el => fileRefs.current[i] = el}
                            onChange={e => e.target.files[0] && uploadFile(i, e.target.files[0])} />
                    </div>

                    {/* Didascalia */}
                    <input type="text" placeholder="Didascalia (opzionale)"
                        value={img.didascalia || ''} onChange={e => aggiornaImmagine(i, 'didascalia', e.target.value)}
                        className="px-3 py-2 rounded-lg border border-mytheme-primary/40 focus:outline-none bg-mytheme-bg text-mytheme-text text-sm" />
                </div>
            ))}

            {/* Bottone aggiungi foto */}
            {immagini.length < 10 && (
                <button onClick={aggiungi}
                    className="text-sm text-mytheme-primary border border-mytheme-primary rounded-full px-4 py-2 hover:bg-mytheme-primary hover:text-white transition-all duration-300">
                    + Aggiungi foto
                </button>
            )}
        </div>
    );
}

//=========================================================================================================================
//=========================================================================================================================
// ─── ModalTips ────────────────────────────────────────────────────────────────
// Modal per aggiungere o modificare un tip con titolo, categoria, testo, link opzionale e colore

// Palette di colori disponibili per i postit — l'admin sceglie cliccando sui quadratini colorati
const COLORI_TIPS = [
    { colore: '#FFF9C4', coloreCategoria: '#FAC775', coloreTesto: '#412402', coloreCategoriaTesto: '#854F0B', nome: 'Giallo' },
    { colore: '#C8E6C9', coloreCategoria: '#97C459', coloreTesto: '#173404', coloreCategoriaTesto: '#3B6D11', nome: 'Verde' },
    { colore: '#BBDEFB', coloreCategoria: '#85B7EB', coloreTesto: '#042C53', coloreCategoriaTesto: '#185FA5', nome: 'Blu' },
    { colore: '#F8BBD9', coloreCategoria: '#ED93B1', coloreTesto: '#4B1528', coloreCategoriaTesto: '#993556', nome: 'Rosa' },
    { colore: '#FFE0B2', coloreCategoria: '#FFAB40', coloreTesto: '#4A1B0C', coloreCategoriaTesto: '#993C1D', nome: 'Arancione' },
    { colore: '#E1BEE7', coloreCategoria: '#AFA9EC', coloreTesto: '#26215C', coloreCategoriaTesto: '#534AB7', nome: 'Viola' },
];

// onClose: chiude il modal | onAdd: salva il tip su Firestore | tipIniziale: dati precompilati per la modifica
export function ModalTips({ onClose, onAdd, tipIniziale = null }) {
    // Se tipIniziale è fornito si parte con i campi precompilati con i dati esistenti
    const [form, setForm] = useState(tipIniziale ? {
        titolo: tipIniziale.titolo || '',
        testo: tipIniziale.testo || '',
        categoria: tipIniziale.categoria || '',
        link: tipIniziale.link || '',
        coloreIndex: COLORI_TIPS.findIndex(c => c.colore === tipIniziale.colore) ?? 0,
    } : { titolo: '', testo: '', categoria: '', link: '', coloreIndex: 0 });

    // Aggiorna il form al cambio di un campo
    const update = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    // Valida i campi obbligatori, aggiunge i colori e chiama onAdd
    const handleAggiungi = () => {
        const { titolo, testo, categoria } = form;
        if (!titolo || !testo || !categoria) return; // blocca se campi obbligatori mancanti
        const colori = COLORI_TIPS[form.coloreIndex]; // prende i colori del postit selezionato
        onAdd({ titolo, testo, categoria, link: form.link || '', ...colori });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 sm:px-4">
            <div className="bg-mytheme-bg rounded-2xl p-5 sm:p-8 w-full max-w-xs sm:max-w-sm flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">

                {/* Titolo dinamico: cambia in base alla modalità aggiunta/modifica */}
                <h2 className="text-xl font-bold text-mytheme-primary">
                    {tipIniziale ? 'Modifica tip' : 'Aggiungi un tip'}
                </h2>

                {/* Campo titolo — obbligatorio */}
                <input id="titolo" type="text" placeholder="Titolo" value={form.titolo} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />

                {/* Campo categoria — obbligatorio, usato anche come base per l'ID Firestore */}
                <input id="categoria" type="text" placeholder="Categoria" value={form.categoria} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />

                {/* Campo testo del consiglio — obbligatorio */}
                <textarea id="testo" placeholder="Testo del consiglio" value={form.testo} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text h-24" />

                {/* Campo link — opzionale, appare come "🔗 Apri link" nel postit */}
                <input id="link" type="text" placeholder="Link (opzionale)" value={form.link} onChange={update}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />

                {/* Scelta colore postit — quadratini cliccabili, quello selezionato ha bordo primario */}
                <div className="flex gap-2 flex-wrap">
                    {COLORI_TIPS.map((c, i) => (
                        <button key={i} onClick={() => setForm({ ...form, coloreIndex: i })}
                            style={{ background: c.colore }}
                            className={`w-8 h-8 rounded border-2 transition-all ${form.coloreIndex === i ? 'border-mytheme-primary scale-110' : 'border-transparent'}`}
                            title={c.nome} />
                    ))}
                </div>

                {/* Bottoni annulla e aggiungi/salva */}
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose}
                        className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm">
                        Annulla
                    </button>
                    <button onClick={handleAggiungi}
                        className="px-4 py-3 rounded-full bg-mytheme-primary text-white hover:bg-mytheme-secondary transition-all duration-300 text-sm">
                        {tipIniziale ? 'Salva' : 'Aggiungi'}
                    </button>
                </div>
            </div>
        </div>
    );
}

//=========================================================================================================================
//=========================================================================================================================
// ─── ModalFlag ────────────────────────────────────────────────────────────────
// Genera l'emoji della bandiera dal codice ISO a 2 lettere (es. "IT" → 🇮🇹)
const emojiFromCode = (code) =>
    code.toUpperCase().split('').map(c =>
        String.fromCodePoint(c.charCodeAt(0) + 127397)
    ).join('');

// Lista completa dei paesi con nome in italiano e emoji bandiera, ordinata alfabeticamente
const PAESI = countries
    .map(c => ({
        nome: c.translations?.ita?.common || c.name.common,
        code: c.cca2.toLowerCase(),
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome));

// Modal per aggiungere un paese visitato — mostra lista filtrabile con ricerca
// onClose: chiude il modal | onAdd: salva il paese su Firestore | paesiGiaAggiunti: evita duplicati
export function ModalFlag({ onClose, onAdd, paesiGiaAggiunti = [] }) {
    const [ricerca, setRicerca] = useState('');

    // Filtra i paesi in base alla ricerca e rimuove quelli già aggiunti
    const paesiFiltrati = PAESI.filter(p =>
        p.nome.toLowerCase().includes(ricerca.toLowerCase()) &&
        !paesiGiaAggiunti.includes(p.nome)
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 sm:px-4">
            <div className="bg-mytheme-bg rounded-2xl p-5 sm:p-8 w-full max-w-xs sm:max-w-sm flex flex-col gap-4 shadow-xl max-h-[90vh]">
                <h2 className="text-xl font-bold text-mytheme-primary">Aggiungi paese visitato</h2>

                {/* Campo di ricerca paese */}
                <input
                    type="text"
                    placeholder="Cerca paese..."
                    value={ricerca}
                    onChange={e => setRicerca(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text"
                />

                {/* Lista paesi filtrati e scorrevole */}
                <div className="overflow-y-auto flex flex-col gap-1 max-h-64">
                    {paesiFiltrati.length === 0 ? (
                        <p className="text-mytheme-text/50 text-sm text-center py-4">Nessun paese trovato</p>
                    ) : (
                        paesiFiltrati.map(paese => (
                            // Click sul paese lo aggiunge e chiude il modal
                            <button
                                key={paese.nome}
                                onClick={() => { onAdd({ paese: paese.nome, code: paese.code }); onClose(); }}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-mytheme-primary/10 transition-all text-left">
                                <img src={`https://flagcdn.com/w40/${paese.code}.png`} alt={paese.nome} className="w-8 h-5 object-cover rounded-sm" />
                                <span className="text-mytheme-text text-sm">{paese.nome}</span>
                            </button>
                        ))
                    )}
                </div>

                {/* Bottone annulla */}
                <button onClick={onClose}
                    className="px-4 py-3 rounded-full border border-mytheme-primary text-mytheme-text hover:bg-mytheme-primary hover:text-white transition-all duration-300 text-sm">
                    Annulla
                </button>
            </div>
        </div>
    );
}