import Card from "./Card";

/* Componente Carousel */
function Carousel({ cards }) {
  return (
    <div className="carousel w-full overflow-hidden flex">

      {cards.map((card, i) => (
        <div key={i} id={`slide${i}`} className="carousel-item relative w-full flex-shrink-0 flex justify-center items-center">
          
          <Card
            immagine={card.immagine}
            titolo={card.titolo}
            descrizione={card.descrizione}
          />

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href={`#slide${i - 1}`} className="btn btn-circle">❮</a>
            <a href={`#slide${i + 1}`} className="btn btn-circle">❯</a>
          </div>

        </div>
      ))}

    </div>
  );
}

export default Carousel;

