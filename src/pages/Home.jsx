//Importazione per login
import { useAuth } from '../context/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
//Importazione dei componenti
import HomeImage from '../components/HomeImage'
import Carousel from '../components/Carousel'
import Titolo from '../components/Text'
import { EditButton, LogoutButton, AddButton } from '../components/Button';

const cards = [
    {
        immagine: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        titolo: "Parigi",
        descrizione: "Parigi, capitale della Francia e nota come Ville Lumière (Città della Luce), è un rinomato centro globale per arte, moda, gastronomia e cultura, situata lungo la Senna. Celebre per monumenti iconici come la Torre Eiffel, il Louvre e Notre-Dame, offre un'atmosfera romantica e quartieri storici come Montmartre."
    },
    {
        immagine: "https://images.unsplash.com/photo-1772289495944-93871457d92f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
        titolo: "Deserto del Sahara",
        descrizione: "Il deserto del Sahara, il più grande deserto caldo del mondo, si estende attraverso l'Africa settentrionale, coprendo circa 9 milioni di km². Caratterizzato da dune di sabbia, oasi e un clima estremamente arido, ospita una varietà di flora e fauna adattate a condizioni estreme. Il Sahara è anche ricco di storia e cultura, con antiche rotte commerciali e siti archeologici."
    },
    {
        immagine: "https://images.unsplash.com/photo-1773011389556-2bf0474cefd9?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titolo: "Lofoten",
        descrizione: "La norvegia è un paese situato nella penisola scandinava, noto per i suoi paesaggi mozzafiato, tra cui fiordi, montagne e aurore boreali. La capitale Oslo è ricca di cultura e storia, mentre le regioni settentrionali offrono l'opportunità di ammirare le spettacolari luci del nord durante l'inverno."
    },
    {
        immagine: "https://media.istockphoto.com/id/2197887721/it/foto/monte-fuji-sul-lago-kawaguchiko-con-fogliame-autunnale-al-tramonto-a-fujikawaguchiko-giappone.webp?a=1&b=1&s=612x612&w=0&k=20&c=_jzT76CJ3wHYzDapxWC8lWntK6E9YKmK0I6stfzOqhc=",
        titolo: "Tokyo",
        descrizione: "Tokyo, la vivace capitale del Giappone, è un mix affascinante di tradizione e modernità. Con i suoi grattacieli futuristici, templi storici e quartieri alla moda come Shibuya e Akihabara, Tokyo offre un'esperienza unica. La città è anche famosa per la sua cucina, la cultura pop e le innovazioni tecnologiche."
    },
    {
        immagine: "https://plus.unsplash.com/premium_photo-1691338312403-e9f7f7984eeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        titolo: "Istanbul",
        descrizione: " Istanbul, situata tra Europa e Asia, è una città ricca di storia e cultura. Con monumenti iconici come la Basilica di Santa Sofia, la Moschea Blu e il Gran Bazar, Istanbul offre un mix unico di influenze culturali. La città è anche famosa per la sua cucina deliziosa e la vibrante vita notturna."
    },
    {
        immagine: "https://images.unsplash.com/photo-1534166755186-fa2d8a5b2b03?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1hcmV8ZW58MHx8MHx8fDA%3D",
        titolo: "Sardegna",
        descrizione: "La Sardegna è un'isola situata nell'Arcipelago della Sardigna, nota per i suoi paesaggi mozzafiato, tra cui spiagge di sabbia dorata, grotte e montagne. La capitale Cagliari è una città vivace con una ricca storia e cultura, mentre le zone costiere offrono l'opportunità di ammirare il mare cristallino e le spiagge remote."
    }
];



function Home() {
    const { isAdmin } = useAuth();

    return (
        <>
            <HomeImage
                titolo="Nateo Travel"
                sottotitolo="Nati per viaggiare"
                immagine="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Titolo testo="Scopri le destinazioni più amate" />

            {/* Pulsanti visibili solo all'admin */}
            {isAdmin && (
                <div className="flex justify-end items-center gap-2 px-10 mt-4">
                    <AddButton onClick={() => console.log('aggiungi')} size="w-8 h-8" />
                    <EditButton onClick={() => console.log('modifica')} size="w-8 h-8" />
                    <LogoutButton onClick={() => signOut(auth)} size="w-8 h-8" />
                </div>
            )}

            <Carousel cards={cards} />
        </>
    )
}

export default Home;