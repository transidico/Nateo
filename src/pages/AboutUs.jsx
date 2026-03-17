import AvatarBox from '../components/AvatarBox'
import fotoAnna from '../assets/Anna.jpeg';
import fotoMatteo from '../assets/Matteo.jpeg';
import Titolo from '../components/Text'

function AboutUs() {
    return (
        <div className="container mx-auto flex flex-col items-center gap-1">
            <Titolo testo="Chi siamo" size="text-4xl" className="font-bold text-mytheme-primary text-center my-0 pt-10" />
            <AvatarBox
                titolo="Anna"
                immagine={fotoAnna}
                descrizione="Appassionata di viaggi e fotografia. \nOrganizzo tour personalizzati per Nateo Travel da oltre 5 anni."
                posizione='left'
            />
            <AvatarBox
                titolo="Matteo"
                immagine={fotoMatteo}
                descrizione="Appassionato di avventura e cultura. \nOrganizzo escursioni e visite guidate per Nateo Travel da oltre 5 anni."
                posizione='right'
            />
        </div>
    )
}

export default AboutUs
