import './App.css'
import Navbar from './components/Navbar'
import HomeImage from './components/HomeImage'
import Carousel from './components/Carousel'
import Titolo, { Paragrafo } from './components/Text'


const cards = [
  {
    immagine: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    titolo: "Titolo 1",
    descrizione: "Parigi, capitale della Francia e nota come Ville Lumière (Città della Luce), è un rinomato centro globale per arte, moda, gastronomia e cultura, situata lungo la Senna. Celebre per monumenti iconici come la Torre Eiffel, il Louvre e Notre-Dame, offre un'atmosfera romantica e quartieri storici come Montmartre."
  },
  {
    immagine: "https://images.unsplash.com/photo-1772289495944-93871457d92f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
    titolo: "Titolo 2",
    descrizione: "Il deserto del Sahara, il più grande deserto caldo del mondo, si estende attraverso l'Africa settentrionale, coprendo circa 9 milioni di km². Caratterizzato da dune di sabbia, oasi e un clima estremamente arido, ospita una varietà di flora e fauna adattate a condizioni estreme. Il Sahara è anche ricco di storia e cultura, con antiche rotte commerciali e siti archeologici."
  },
  {
    immagine: "https://images.unsplash.com/photo-1773011389556-2bf0474cefd9?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titolo: "Titolo 3",
    descrizione: "La norvegia è un paese situato nella penisola scandinava, noto per i suoi paesaggi mozzafiato, tra cui fiordi, montagne e aurore boreali. La capitale Oslo è ricca di cultura e storia, mentre le regioni settentrionali offrono l'opportunità di ammirare le spettacolari luci del nord durante l'inverno."
  }
];

function App() {
  return (
    <>
      <Navbar />
      <HomeImage 
        titolo="Nateo Travel" 
        sottotitolo="Nati per viaggiare" 
        immagine="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Titolo testo="Ciao a tutti" size="text-4xl" className="font-sans font-bold text-center"/>
      <Paragrafo testo="ciao come va" size="text-2xl" className="font-sans text-center"/>
      <Carousel cards={cards} />
    </>
  )
}

export default App
