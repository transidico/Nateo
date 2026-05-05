import { useAuth } from '../context/auth';
import { db } from '../firebase';
import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Titolo from '../components/Text';
import { CardGlobe } from '../components/Card';
import { AddButton } from '../components/Button';
import AddCardModal, { AddGlobeModal } from '../components/Modal';


function Destinations() {
    const { isAdmin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [destinations, setDestinations] = useState([]);

    const destinationsCollectionRef = collection(db, "destinations");

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
            const id = nuovaDestination.titolo.toLowerCase();
            const docRef = doc(db, "destinations", id);
            await setDoc(docRef, nuovaDestination);
            setDestinations([{ id, ...nuovaDestination }, ...destinations]);
        } catch (error) {
            console.error("Errore durante il salvataggio:", error);
        }
    };

    // Elimina la destinazione da Firebase e rimuovila dallo stato locale
    const deleteDestination = async (id) => {
        try {
            await deleteDoc(doc(db, "destinations", id));
            setDestinations(destinations.filter((d) => d.id !== id));
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error);
        }
    };

    return (
        <>
            {/* SEO serve a migliorare il posizionamento nei motori di ricerca */}
            <Helmet>
                <title>Nateo Travel | Destinazioni</title>
                <meta name="description" content="Esplora tutte le destinazioni di viaggio di Nateo Travel. Scopri Europa, Asia, America e molto altro." />
                <meta property="og:title" content="Nateo Travel | Destinazioni" />
                <meta property="og:description" content="Esplora tutte le destinazioni di viaggio di Nateo Travel" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            {/* Titolo della pagina */}
            <Titolo testo="In quale parte del globo vorresti viaggiare?" align="text-left" />
            {/* Bottoni admin: aggiungi */}
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-10 h-10" />
                </div>
            )}
            {/* Modal per aggiungere una nuova destinazione */}
            {showModal && <AddGlobeModal onClose={() => setShowModal(false)} onAdd={addDestination} />}
            {/* Lista delle destinazioni */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 mt-14 mb-20">
                {destinations.map((d) => (
                    <CardGlobe key={d.id} id={d.id} immagine={d.immagine} titolo={d.titolo} deleteCard={() => deleteDestination(d.id)} />
                ))}
            </div>
        </>
    );
}

export default Destinations;