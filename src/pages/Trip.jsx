import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useParams } from 'react-router-dom';
import { collection, setDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { AddButton } from '../components/Button';
import { ModalTrip } from '../components/Modal';

function Trip() {
    const { isAdmin } = useAuth();
    const { id, continente } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [articolo, setArticolo] = useState([]); // lista dei blocchi dell'articolo

    // Carica in tempo reale i blocchi da Firestore ordinati per ordine
    useEffect(() => {
        if (!continente || !id) return;
        const ref = query(
            collection(db, "destinations", continente, "trip", id, "articolo"),
            orderBy("ordine")
        );
        const unsub = onSnapshot(ref, (snap) => {
            setArticolo(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, [continente, id]);

    // Salva il blocco su Firestore con ID progressivo per tipo
    const handleAdd = async (blocco) => {
        if (!continente || !id) return;

        // Trova tutti i numeri già usati per quel tipo
        const numeriUsati = articolo
            .filter(b => b.tipo === blocco.tipo)
            .map(b => parseInt(b.id.split('_')[1])); // estrae il numero da "titolo1_2" → 2

        // Trova il primo numero disponibile partendo da 1
        let numero = 1;
        while (numeriUsati.includes(numero)) numero++;

        const docId = `${blocco.tipo}_${numero}`;
        const docRef = doc(db, "destinations", continente, "trip", id, "articolo", docId);
        await setDoc(docRef, { ...blocco, ordine: articolo.length });
    };

    return (
        <>
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-10 h-10" />
                </div>
            )}

            {showModal && <ModalTrip onClose={() => setShowModal(false)} onAdd={handleAdd} />}

            {/* Visualizzazione dei blocchi dell'articolo */}
            <div className="px-10 py-10 flex flex-col gap-6">
                {articolo.length === 0 ? (
                    <p className="text-mytheme-text/50">Nessun blocco aggiunto. Clicca + per iniziare.</p>
                ) : (
                    articolo.map((blocco, index) => (
                        <BloccoRenderer key={index} blocco={blocco} />
                    ))
                )}
            </div>
        </>
    );
}

// Renderizza il blocco in base al tipo
function BloccoRenderer({ blocco }) {
    switch (blocco.tipo) {
        //=TITOLO 1===========================================================================
        case 'titolo1': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return <h1 className={`text-4xl font-black text-mytheme-text ${align}`}>{blocco.testo}</h1>;
        }
        //=TITOLO 2===========================================================================
        case 'titolo2':
            const align2 = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return <h2 className={`text-3xl font-bold text-mytheme-text ${align2}`}>{blocco.testo}</h2>;
        //=TITOLO 3===========================================================================
        case 'titolo3':
            const align3 = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return <h3 className={`text-2xl font-semibold text-mytheme-text ${align3}`}>{blocco.testo}</h3>;
        //=PARAGRAFO===========================================================================
        case 'paragrafo':
            const alignParagrafo = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return <p className={`text-mytheme-text leading-relaxed ${alignParagrafo}`}>{blocco.testo}</p>;
        //=IMMAGINE===========================================================================
        case 'immagine': {
            const posizione = blocco.posizione || 'centro';
            const dimensione = blocco.dimensione || 'media';

            const larghezzaImg = dimensione === 'piccola' ? 'sm:w-1/4' : dimensione === 'grande' ? 'sm:w-2/3' : 'sm:w-1/2';
            const allineamento = posizione === 'sinistra' ? 'items-start' : posizione === 'destra' ? 'items-end' : 'items-center';

            if (blocco.testo && posizione !== 'centro') {
                return (
                    <figure className={`flex gap-4 sm:gap-6 sm:items-start ${posizione === 'destra' ? 'flex-col-reverse sm:flex-row-reverse' : 'flex-col sm:flex-row'}`}>
                        <div className={`flex flex-col gap-1 shrink-0 w-full ${larghezzaImg}`}>
                            <img
                                src={blocco.url}
                                alt={blocco.didascalia || ''}
                                className="w-full rounded-2xl object-cover"
                            />
                            {blocco.didascalia && (
                                <figcaption className="text-sm text-mytheme-text/60 text-center">{blocco.didascalia}</figcaption>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <p className="text-mytheme-text leading-relaxed">{blocco.testo}</p>
                        </div>
                    </figure>
                );
            }
            return (
                <figure className={`flex flex-col gap-2 ${allineamento}`}>
                    <img
                        src={blocco.url}
                        alt={blocco.didascalia || ''}
                        className={`w-full ${larghezzaImg} rounded-2xl object-cover`}
                    />
                    {blocco.didascalia && (
                        <figcaption className="text-sm text-mytheme-text/60 text-center">{blocco.didascalia}</figcaption>
                    )}
                    {blocco.testo && (
                        <p className="text-mytheme-text leading-relaxed w-full">{blocco.testo}</p>
                    )}
                </figure>
            );
        }
        //=MAPPA===========================================================================
        //Inserisci una città oppure un URL di una mappa personalizzata
        case 'mappa': {
            const isUrl = blocco.query?.startsWith('http');
            const src = isUrl
                ? blocco.query.replace('/edit', '/embed')
                : `https://maps.google.com/maps?q=${encodeURIComponent(blocco.query)}&output=embed`;

            return (
                <div className="w-full h-96 rounded-2xl overflow-hidden">
                    <iframe
                        title="mappa"
                        src={src}
                        className="w-full h-full border-0"
                        allowFullScreen
                    />
                </div>
            );
        }
        //=TESTO RIQUADRATO===========================================================================
        case 'riquadro': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return (
                <div className="bg-mytheme-primary/10 border-l-4 border-mytheme-primary rounded-xl p-6">
                    <p className={`text-mytheme-text ${align}`}>{blocco.testo}</p>
                </div>
            );
        }
        //=LINK===========================================================================
        case 'link':
            return (
                <a href={blocco.url} target="_blank" rel="noopener noreferrer" className="text-mytheme-primary hover:text-mytheme-secondary underline transition-colors duration-200">
                    {blocco.etichetta}
                </a>
            );
        //=NESSUN DEFAULT===========================================================================
        default:
            return null;
    }
}

export default Trip;