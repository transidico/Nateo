import { useState } from 'react';
import { useAuth } from '../context/auth';
import { useParams } from 'react-router-dom';
import { AddButton } from '../components/Button';
import { ModalTrip } from '../components/Modal';

function Trip() {
    const { isAdmin } = useAuth();
    const { id } = useParams(); // es. "giappone"

    const [showModal, setShowModal] = useState(false);
    const [tipoSelezionato, setTipoSelezionato] = useState(null);

    const handleSelect = (tipo) => {
        setTipoSelezionato(tipo);
        // Qui apriremo il secondo modal specifico per il tipo scelto
        console.log("Tipo selezionato:", tipo);
    };

    return (
        <>
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <AddButton onClick={() => setShowModal(true)} size="w-10 h-10" />
                </div>
            )}
            {showModal && <ModalTrip onClose={() => setShowModal(false)} onSelect={handleSelect} />}
            <div className="px-10 py-10">
                <h1 className="text-4xl font-black text-mytheme-primary uppercase">Creazione pagina {id}</h1>
            </div>
        </>
    );
}

export default Trip;