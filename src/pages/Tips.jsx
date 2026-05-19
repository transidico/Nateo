import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from 'react-helmet-async';
import { AddButton, DeleteButton, EditButton } from '../components/Button';
import PostIt from '../components/PostIt';
import { ModalTips } from '../components/Modal';

function Tips() {
    const { isAdmin } = useAuth();
    const [tips, setTips] = useState([]);                      // lista dei tips caricati da Firestore
    const [showModal, setShowModal] = useState(false);         // controlla la visibilità del modal di aggiunta
    const [editMode, setEditMode] = useState(false);           // attiva/disattiva modalità di editing
    const [tipInEditing, setTipInEditing] = useState(null);    // tip selezionato per la modifica, null se nessuno

    // Carica in tempo reale i tips da Firestore
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tips"), (snap) => {
            setTips(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsub(); // cleanup del listener alla smontatura del componente
    }, []);

    // Aggiunge un nuovo tip su Firestore con ID basato su categoria + numero progressivo
    const handleAdd = async (tip) => {
        // Conta quanti tip esistono già con la stessa categoria
        const esistenti = tips.filter(t =>
            t.id.startsWith(tip.categoria.toLowerCase().replace(/\s/g, '_'))
        );
        // Crea ID tipo "acquisti_1", "acquisti_2" ecc.
        const baseId = tip.categoria.toLowerCase().replace(/\s/g, '_');
        const numero = esistenti.length + 1;
        const docId = `${baseId}_${numero}`;
        await setDoc(doc(db, "tips", docId), tip);
    };

    // Aggiorna un tip esistente su Firestore preservando il suo ID
    const handleUpdate = async (tip) => {
        if (!tipInEditing) return;
        await setDoc(doc(db, "tips", tipInEditing.id), tip);
        setTipInEditing(null); // chiude il modal di modifica
    };

    // Elimina un tip da Firestore tramite il suo ID
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "tips", id));
    };

    return (
        <>
            {/* SEO serve a migliorare il posizionamento nei motori di ricerca */}
            <Helmet>
                <title>Tips | Nateo Travel</title>
                <meta name="description" content="Consigli e suggerimenti di viaggio da Nateo Travel." />
            </Helmet>

            {/* Contenitore con padding orizzontale comune a bottone e griglia */}
            <div className="px-4 sm:px-10">

                {/* Bottoni admin: edit e add — visibili solo all'admin */}
                {isAdmin && (
                    <div className="flex justify-end items-center gap-2 mt-4">
                        {/* EditButton toglla la modalità modifica — cambia icona da matita a salva */}
                        <EditButton onClick={() => setEditMode(!editMode)} size="w-10 h-10" />
                        {/* AddButton apre il modal per aggiungere un nuovo tip */}
                        <AddButton onClick={() => setShowModal(true)} size="w-10 h-10" />
                    </div>
                )}

                {/* Griglia postit — 1 colonna mobile, fino a 4 su desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-6 sm:py-10 pt-3">
                    {tips.length === 0 ? (
                        <p className="text-mytheme-text/50">Nessun consiglio aggiunto.</p>
                    ) : (
                        tips.map(tip => (
                            // pt-3 dà spazio alla graffetta che sporge sopra il postit
                            // in editMode il click apre il modal di modifica precompilato
                            <div key={tip.id}
                                className={`relative pt-3 mx-1 ${editMode ? 'cursor-pointer hover:animate-wiggle' : ''}`}
                                onClick={editMode ? () => setTipInEditing(tip) : undefined}>

                                {/* Componente PostIt con tutti i dati del tip */}
                                <PostIt
                                    titolo={tip.titolo}
                                    testo={tip.testo}
                                    categoria={tip.categoria}
                                    colore={tip.colore}
                                    coloreCategoria={tip.coloreCategoria}
                                    coloreTesto={tip.coloreTesto}
                                    coloreCategoriaTesto={tip.coloreCategoriaTesto}
                                    link={tip.link}
                                />

                                {/* Bottone delete posizionato in alto a destra — visibile solo all'admin */}
                                {isAdmin && editMode && (
                                    <div className="absolute -top-3 -right-3 z-10"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(tip.id); }}>
                                        <DeleteButton size="w-7 h-7" />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal per aggiungere un nuovo tip */}
            {showModal && (
                <ModalTips onClose={() => setShowModal(false)} onAdd={handleAdd} />
            )}

            {/* Modal per modificare un tip esistente — precompilato con i dati del tip selezionato */}
            {tipInEditing && (
                <ModalTips
                    onClose={() => setTipInEditing(null)}
                    onAdd={handleUpdate}
                    tipIniziale={tipInEditing}
                />
            )}
        </>
    );
}

export default Tips;