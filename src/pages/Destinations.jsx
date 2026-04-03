import { useAuth } from '../context/auth';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Titolo from '../components/Text';
import { CardGlobe } from '../components/Card';
import { AddButton } from '../components/Button';
import AddCardModal, { AddGlobeModal } from '../components/AddCardModal';

function Destinations() {
    const { isAdmin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [destinations, setDestinations] = useState([]);

    const destinationsCollectionRef = collection(db, "destinazioni_globo");

    // Carica le destinazioni da Firebase all'avvio della pagina
    useEffect(() => {
        const getDestinations = async () => {
            try {
                const data = await getDocs(destinationsCollectionRef);
                setDestinations(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Errore nel caricamento delle destinazioni:", error);
            }
        };
        getDestinations();
    }, []);

    // Salva la nuova destinazione su Firebase e aggiorna lo stato locale
    const addDestination = async (nuovaDestination) => {
        try {
            const docInserito = await addDoc(destinationsCollectionRef, nuovaDestination);
            setDestinations([{ id: docInserito.id, ...nuovaDestination }, ...destinations]);
        } catch (error) {
            console.error("Errore durante il salvataggio:", error);
        }
    };

    // Elimina la destinazione da Firebase e rimuovila dallo stato locale
    const deleteDestination = async (id) => {
        try {
            await deleteDoc(doc(db, "destinazioni_globo", id));
            setDestinations(destinations.filter((d) => d.id !== id));
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error);
        }
    };

    return (
        <>
            <Titolo testo="In quale parte del globo vorresti viaggiare?" align="text-left" />

            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-8 h-8" />
                </div>
            )}

            {showModal && <AddGlobeModal onClose={() => setShowModal(false)} onAdd={addDestination} />}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 mt-14 mb-20">
                {destinations.map((d) => (
                    <CardGlobe key={d.id} id={d.id} immagine={d.immagine} titolo={d.titolo} deleteCard={() => deleteDestination(d.id)} />
                ))}
            </div>
        </>
    );
}

export default Destinations;