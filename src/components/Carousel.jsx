import { useRef } from "react";
import Card from "./Card";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function Carousel({ cards, deleteCard }) {
  const scrollRef = useRef(null);

  // Funzione per scrollare il carosello a sinistra o a destra di una quantità fissa (es. 320px)
  const scroll = (direction) => {
    scrollRef.current.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
  };

  // Pulsante freccia, posizionato assolutamente sopra il carosello, visibile solo su desktop
  const ArrowBtn = ({ direction }) => (
    <button onClick={() => scroll(direction)} className={`hidden md:flex absolute ${direction === "left" ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-mytheme-text/20 backdrop-blur-sm border border-mytheme-primary/30 items-center justify-center text-mytheme-text hover:bg-mytheme-text/40 transition-all`}>
      {direction === "left" ? <IoChevronBack className="text-xl" /> : <IoChevronForward className="text-xl" />}
    </button>
  );

  //Carosello
  return (
    <div className="relative w-full px-10 py-10">
      {/* Pulsanti di scorrimento */}
      <ArrowBtn direction="left" />
      <ArrowBtn direction="right" />
      {/* Contenitore di scorrimento nascosto */}
      <div ref={scrollRef} className="flex flex-col md:flex-row overflow-x-auto gap-4 md:gap-8 md:snap-x md:snap-mandatory md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none] py-4 md:pb-8 md:-mb-8">
        {cards.map((card, index) => (
          <div key={card.id || index} className="shrink-0 snap-center p-2">
            {/* Card */}
            <Card id={card.id} immagine={card.immagine} titolo={card.titolo} descrizione={card.descrizione} deleteCard={() => deleteCard(card.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;