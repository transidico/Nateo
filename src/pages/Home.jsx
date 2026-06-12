// Importazione per login e database e seo
import { useAuth } from '../context/auth';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
// Importazione dei componenti
import { useState, useEffect } from 'react';
import HomeImage from '../components/HomeImage'
import Carousel from '../components/Carousel'
import Titolo from '../components/Text'
import { EditButton, LogoutButton, AddButton } from '../components/Button';
import AddCardModal, { ModalFlag } from '../components/Modal';
import Flag from '../components/Flag';

//Pagina home
function Home() {
    const { isAdmin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [cards, setCards] = useState([]);
    const [showFlagModal, setShowFlagModal] = useState(false);          // modal aggiunta paese
    const [paesi, setPaesi] = useState([]);                             // lista paesi visitati

    // Riferimento alla collezione "destinazioni" su Firestore
    const cardsCollectionRef = collection(db, "destinazioni");

    // Carica le card da Firebase all'avvio della pagina
    useEffect(() => {
        const getCards = async () => {
            try {
                const data = await getDocs(cardsCollectionRef);
                setCards(data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    card: Array.isArray(doc.data().card) ? doc.data().card : []
                })));
            } catch (error) {
                console.error("Errore nel caricamento delle card:", error);
            }
        };
        getCards();
    }, []);

    // Carica in tempo reale i paesi visitati da Firestore
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "flags"), (snap) => {
            setPaesi(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    // Salva la nuova card su Firebase e aggiorna lo stato locale
    const addCard = async (nuovaCard) => {
        try {
            const docInserito = await addDoc(cardsCollectionRef, { ...nuovaCard, card: [] });
            setCards([{ id: docInserito.id, ...nuovaCard, card: [] }, ...cards]);
        } catch (error) {
            console.error("Errore durante il salvataggio:", error);
        }
    };

    // Elimina la card da Firebase e rimuovila dallo stato locale
    const deleteCard = async (id) => {
        try {
            await deleteDoc(doc(db, "destinazioni", id));
            setCards(cards.filter((card) => card.id !== id));
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error);
        }
    };

    // Aggiunge un paese visitato su Firestore
    const addPaese = async (paese) => {
        try {
            await setDoc(doc(db, "flags", paese.paese), paese);
        } catch (error) {
            console.error("Errore durante il salvataggio del paese:", error);
        }
    };

    // Elimina un paese visitato da Firestore
    const deletePaese = async (id) => {
        try {
            await deleteDoc(doc(db, "flags", id));
        } catch (error) {
            console.error("Errore durante l'eliminazione del paese:", error);
        }
    };

    return (
        <>
            {/* SEO serve a migliorare il posizionamento nei motori di ricerca */}
            <Helmet>
                <title>Nateo Travel | Scopri le destinazioni</title>
                <meta name="description" content="Scopri le destinazioni più belle del mondo con Nateo Travel. Viaggi, avventure e racconti di viaggio." />
                <meta property="og:title" content="Nateo Travel" />
                <meta property="og:description" content="Scopri le destinazioni più belle del mondo con Nateo Travel." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            {/* Immagine principale della pagina home */}
            <HomeImage
                titolo="Nateo Travel"
                sottotitolo="Nati per viaggiare"
                immagine="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1770&auto=format&fit=crop"
            />
            {/* Titolo della pagina */}
            <Titolo testo="Questi sono i paesi che abbiamo visitato" />

            {/* Bottone admin per aggiungere una bandiera */}
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-4 sm:px-10 mt-4">
                    <AddButton onClick={() => setShowFlagModal(true)} size="w-8 h-8" />
                </div>
            )}
            {/* Griglia delle bandiere */}
            <Flag paesi={paesi} isAdmin={isAdmin} onDelete={deletePaese} />
            {/* Modal per aggiungere un paese */}
            {showFlagModal && (
                <ModalFlag
                    onClose={() => setShowFlagModal(false)}
                    onAdd={addPaese}
                    paesiGiaAggiunti={paesi.map(p => p.paese)}
                />
            )}

            {/* Titolo della pagina */}
            <Titolo testo="Scopri le destinazioni più amate" />

            {/* Bottoni admin: aggiungi, modifica, logout */}
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-4 sm:px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-8 h-8" />
                    <EditButton onClick={() => console.log('modifica')} size="w-8 h-8" />
                    <LogoutButton onClick={() => signOut(auth)} size="w-8 h-8" />
                </div>
            )}

            {/* Modal per aggiungere una nuova card */}
            {showModal && <AddCardModal onClose={() => setShowModal(false)} onAdd={addCard} />}
            {/* Carousel delle card */}
            <Carousel cards={cards} deleteCard={deleteCard} />
        </>
    )
}

export default Home;