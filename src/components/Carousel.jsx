import Card from "./Card";

function Carousel({ cards }) {
  return (
    <div className="w-full px-10 py-10">
      <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 -mb-8 py-4">
        {cards.map((card, index) => (
          <div key={index} className="shrink-0 snap-center p-2">
            <Card immagine={card.immagine} titolo={card.titolo} descrizione={card.descrizione} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;