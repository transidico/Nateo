import AvatarBox from '../components/AvatarBox'
import fotoAnna from '../assets/Anna.jpeg';
import fotoMatteo from '../assets/Matteo.jpeg';
import Titolo from '../components/Text'

function AboutUs() {
    return (
        <div className="container mx-auto flex flex-col items-center gap-1 px-4">
            <Titolo testo="Chi siamo" />
            <AvatarBox
                titolo="Anna Giulia Transidico"
                immagine={fotoAnna}
                descrizione="Software Developer specializzata in firmware per microcontrollori, con una grande passione per lo sviluppo software. 
                        Amo lo sport, le grandi emozioni e, soprattutto, esplorare il mondo.
                        Ho una mente organizzatrice. Adoro la sfida di pianificare viaggi low-cost curati nei minimi dettagli, incastrando voli e itinerari per ottimizzare ogni esperienza.
                        Ho deciso di dare vita a questo progetto per trasformare i racconti dei nostri viaggi in un blog personale. Il mio obiettivo è mettere le mie avventure a disposizione di chiunque cerchi l'ispirazione giusta per partire, dimostrando che con la giusta organizzazione nessuna meta è irraggiungibile."
                posizione='left'
            />
            <AvatarBox
                titolo="Matteo Crosta"
                immagine={fotoMatteo}
                descrizione="Analista chimico ambientale. 
                        Appassionato di viaggi e cultura. 
                        Organizzo l'itinerario in loco, minimalista nei dettagli, amo scoprire le città a piedi e immergermi nella cultura locale. 
                        Ho deciso di dare vita a questo progetto per condividere le mie esperienze di viaggio e ispirare altri a esplorare il mondo, dimostrando che con un po' di spirito d'avventura e curiosità, ogni destinazione può essere scoperta in modo autentico. "
                posizione='right'
            />
        </div>
    )
}

export default AboutUs
