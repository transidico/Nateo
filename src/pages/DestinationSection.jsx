// Pagina con i viaggi di una destinazione specifica (es. asia), con possibilità di aggiungere/eliminare (solo admin)
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/auth';
import { AddButton } from '../components/Button';
import AddCardModal from '../components/Modal';
import Card from '../components/Card';
import PageLayout from '../components/PageLayout';

function DestinationSection() {
    const { id: continente } = useParams(); // Prende il continente dall'URL (es. "asia")
    const { isAdmin } = useAuth();
    const [destinations, setDestinations] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Carica in tempo reale i viaggi dalla sub-collection trip del continente
    useEffect(() => {
        if (!continente) return;
        const ref = collection(db, "destinations", continente, "trip");
        const unsub = onSnapshot(ref, (snap) => {
            setDestinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub(); // Cleanup del listener alla smontatura del componente
    }, [continente]);

    // Aggiunge un nuovo viaggio usando il titolo come ID del documento
    const addDestination = async (nuova) => {
        if (!continente) return;
        const id = nuova.titolo.toLowerCase();
        const docRef = doc(db, "destinations", continente, "trip", id);
        await setDoc(docRef, nuova);
    };

    // Elimina un viaggio dalla sub-collection trip
    const deleteDestination = async (id) => {
        if (!continente) return;
        await deleteDoc(doc(db, "destinations", continente, "trip", id));
    };

    return (
        <>
            {/* Bottone per aggiungere una nuova destinazione, visibile solo all'admin */}
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-4 sm:px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-10 h-10" />
                </div>
            )}

            {/* Griglia delle card: mostra messaggio se vuota, altrimenti le card dei viaggi */}
            <PageLayout className="flex flex-wrap gap-4 sm:gap-6">
                {destinations.length === 0 ? (
                    <p className="text-mytheme-text">Non è stata ancora aggiunta alcuna destinazione in {continente}.</p>
                ) : (
                    destinations.map((card) => (
                        <Card key={card.id} id={card.id} immagine={card.immagine} titolo={card.titolo} descrizione={card.descrizione} deleteCard={() => deleteDestination(card.id)} continente={continente} />
                    ))
                )}
            </PageLayout>

            {/* Modal per aggiungere un nuovo viaggio */}
            {showModal && (
                <AddCardModal onClose={() => setShowModal(false)} onAdd={addDestination} />
            )}
        </>
    );
}

export default DestinationSection;