// Importazione per login e database
import { useAuth } from '../context/auth';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
// Importazione dei componenti
import { useState, useEffect } from 'react';
import HomeImage from '../components/HomeImage'
import Carousel from '../components/Carousel'
import Titolo from '../components/Text'
import AddCardModal from '../components/AddCardModal';
import { EditButton, LogoutButton, AddButton } from '../components/Button';

//Pagina home
function Home() {
    const { isAdmin } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [cards, setCards] = useState([]);

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

    return (
        <>
            <HomeImage
                titolo="Nateo Travel"
                sottotitolo="Nati per viaggiare"
                immagine="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1770&auto=format&fit=crop"
            />
            <Titolo testo="Scopri le destinazioni più amate" />

            {/* Bottoni admin: aggiungi, modifica, logout */}
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-8 h-8" />
                    <EditButton onClick={() => console.log('modifica')} size="w-8 h-8" />
                    <LogoutButton onClick={() => signOut(auth)} size="w-8 h-8" />
                </div>
            )}

            {/* Modal per aggiungere una nuova card */}
            {showModal && <AddCardModal onClose={() => setShowModal(false)} onAdd={addCard} />}

            <Carousel cards={cards} deleteCard={deleteCard} />
        </>
    )
}

export default Home;