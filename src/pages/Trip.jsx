import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useParams } from 'react-router-dom';
import { collection, setDoc, doc, deleteDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { AddButton, EditButton, DeleteButton } from '../components/Button';
import { ModalTrip } from '../components/Modal';
import { Helmet } from 'react-helmet-async';

function Trip() {
    const { isAdmin } = useAuth();
    const { id, continente } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [bloccoInEditing, setBloccoInEditing] = useState(null);
    const [articolo, setArticolo] = useState([]);

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

    const handleAdd = async (blocco) => {
        if (!continente || !id) return;
        const numeriUsati = articolo
            .filter(b => b.tipo === blocco.tipo)
            .map(b => parseInt(b.id.split('_')[1]));
        let numero = 1;
        while (numeriUsati.includes(numero)) numero++;
        const docId = `${blocco.tipo}_${numero}`;
        const docRef = doc(db, "destinations", continente, "trip", id, "articolo", docId);
        await setDoc(docRef, { ...blocco, ordine: articolo.length });
    };

    const handleUpdate = async (dati) => {
        if (!continente || !id || !bloccoInEditing) return;
        const docRef = doc(db, "destinations", continente, "trip", id, "articolo", bloccoInEditing.id);
        await setDoc(docRef, dati, { merge: true });
        setBloccoInEditing(null);
    };

    const handleDelete = async (docId) => {
        if (!continente || !id) return;
        const { deleteDoc } = await import('firebase/firestore');
        const docRef = doc(db, "destinations", continente, "trip", id, "articolo", docId);
        await deleteDoc(docRef);
    };

    // SEO
    const titoloPagina = articolo.find(b => b.tipo === 'titolo1')?.testo || 'Viaggio';
    const descrizionePagina = articolo.find(b => b.tipo === 'paragrafo')?.testo?.slice(0, 155) || '';
    const immaginePagina = articolo.find(b => b.tipo === 'immagine')?.url || '';

    return (
        <>
            <Helmet>
                <title>{titoloPagina} | Nateo Travel</title>
                <meta name="description" content={descrizionePagina} />
                <meta property="og:title" content={`${titoloPagina} | Nateo Travel`} />
                <meta property="og:description" content={descrizionePagina} />
                <meta property="og:image" content={immaginePagina} />
                <meta property="og:type" content="article" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <EditButton
                        onClick={() => setEditMode(!editMode)}
                        size="w-10 h-10"
                    />
                    <AddButton onClick={() => setShowModal(true)} size="w-10 h-10" />
                </div>
            )}

            {/* Modal aggiunta nuovo blocco */}
            {showModal && (
                <ModalTrip onClose={() => setShowModal(false)} onAdd={handleAdd} />
            )}

            {/* Modal modifica blocco esistente */}
            {bloccoInEditing && (
                <ModalTrip
                    onClose={() => setBloccoInEditing(null)}
                    onAdd={handleUpdate}
                    bloccoIniziale={bloccoInEditing}
                />
            )}

            <div className="px-10 py-10 flex flex-col gap-6">
                {articolo.length === 0 ? (
                    <p className="text-mytheme-text/50">Nessun blocco aggiunto. Clicca + per iniziare.</p>
                ) : (
                    articolo.map((blocco, index) => (
                        <BloccoRenderer
                            key={index}
                            blocco={blocco}
                            editMode={editMode}
                            onEdit={() => setBloccoInEditing(blocco)}
                            onDelete={() => handleDelete(blocco.id)}
                        />
                    ))
                )}
            </div>
        </>
    );
}

function BloccoRenderer({ blocco, editMode, onEdit, onDelete }) {
    const wrapperClass = editMode
        ? 'relative border-2 border-dotted border-mytheme-primary/40 rounded-xl p-2 hover:border-mytheme-primary cursor-pointer transition-all duration-200 hover:animate-wiggle'
        : '';

    const wrap = (content) => editMode
        ? <div className={wrapperClass} onClick={onEdit}>
            <div className="absolute -top-3 -right-3 z-10" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <DeleteButton size="w-7 h-7" />
            </div>
            {content}
        </div>
        : content;

    switch (blocco.tipo) {
        case 'titolo1': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return wrap(<h1 className={`text-4xl font-black text-mytheme-text ${align}`}>{blocco.testo}</h1>);
        }
        case 'titolo2': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return wrap(<h2 className={`text-3xl font-bold text-mytheme-text ${align}`}>{blocco.testo}</h2>);
        }
        case 'titolo3': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return wrap(<h3 className={`text-2xl font-semibold text-mytheme-text ${align}`}>{blocco.testo}</h3>);
        }
        case 'paragrafo': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return wrap(<p className={`text-mytheme-text leading-relaxed ${align}`}>{blocco.testo}</p>);
        }
        case 'immagine': {
            const posizione = blocco.posizione || 'centro';
            const dimensione = blocco.dimensione || 'media';
            const larghezzaImg = dimensione === 'piccola' ? 'sm:w-1/4' : dimensione === 'grande' ? 'sm:w-2/3' : 'sm:w-1/2';
            const allineamento = posizione === 'sinistra' ? 'items-start' : posizione === 'destra' ? 'items-end' : 'items-center';

            if (blocco.testo && posizione !== 'centro') {
                return wrap(
                    <figure className={`flex gap-4 sm:gap-6 sm:items-start ${posizione === 'destra' ? 'flex-col-reverse sm:flex-row-reverse' : 'flex-col sm:flex-row'}`}>
                        <div className={`flex flex-col gap-1 shrink-0 w-full ${larghezzaImg}`}>
                            <img src={blocco.url} alt={blocco.didascalia || ''} className="w-full rounded-2xl object-cover" />
                            {blocco.didascalia && <figcaption className="text-sm text-mytheme-text/60 text-center">{blocco.didascalia}</figcaption>}
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <p className="text-mytheme-text leading-relaxed">{blocco.testo}</p>
                        </div>
                    </figure>
                );
            }
            return wrap(
                <figure className={`flex flex-col gap-2 ${allineamento}`}>
                    <img src={blocco.url} alt={blocco.didascalia || ''} className={`w-full ${larghezzaImg} rounded-2xl object-cover`} />
                    {blocco.didascalia && <figcaption className="text-sm text-mytheme-text/60 text-center">{blocco.didascalia}</figcaption>}
                    {blocco.testo && <p className="text-mytheme-text leading-relaxed w-full">{blocco.testo}</p>}
                </figure>
            );
        }
        case 'mappa': {
            const isUrl = blocco.query?.startsWith('http');
            const src = isUrl
                ? blocco.query.replace('/edit', '/embed')
                : `https://maps.google.com/maps?q=${encodeURIComponent(blocco.query)}&output=embed`;
            return wrap(
                <div className="w-full h-96 rounded-2xl overflow-hidden">
                    <iframe title="mappa" src={src} className="w-full h-full border-0" allowFullScreen />
                </div>
            );
        }
        case 'riquadro': {
            const align = blocco.posizione === 'centro' ? 'text-center' : blocco.posizione === 'destra' ? 'text-right' : 'text-left';
            return wrap(
                <div className="bg-mytheme-primary/10 border-l-4 border-mytheme-primary rounded-xl p-6">
                    <p className={`text-mytheme-text ${align}`}>{blocco.testo}</p>
                </div>
            );
        }
        case 'link':
            return wrap(
                <a href={blocco.url} target="_blank" rel="noopener noreferrer" className="text-mytheme-primary hover:text-mytheme-secondary underline transition-colors duration-200">
                    {blocco.etichetta}
                </a>
            );
        default:
            return null;
    }
}

export default Trip;