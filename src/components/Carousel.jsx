
// export default Carousel;

// import { useState } from "react";
// import Card from "./Card";

// function Carousel({ cards }) {
//   const [current, setCurrent] = useState(0);
//   const total = cards.length;

//   const prev = () => setCurrent((current - 1 + total) % total);
//   const next = () => setCurrent((current + 1) % total);

//   // Prende 3 card a partire da current (con wrap)
//   const visible = [0, 1, 2].map(offset => cards[(current + offset) % total]);

//   return (
//     <div className="relative w-full flex justify-center items-center gap-4 py-8 px-16">

//       <button onClick={prev} className="btn btn-circle absolute left-2">❮</button>

//       {visible.map((card, i) => (
//         <Card
//           key={i}
//           immagine={card.immagine}
//           titolo={card.titolo}
//           descrizione={card.descrizione}
//         />
//       ))}

//       <button onClick={next} className="btn btn-circle absolute right-2">❯</button>

//     </div>
//   );
// }

// export default Carousel;

import Card from "./Card";

function Carousel({ cards }) {
  return (
    <div className="w-full px-10 py-10">
      <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 -mb-8 py-4">
        {cards.map((card, index) => (
          <div key={index} className="flex-shrink-0 snap-center p-2">
            <Card immagine={card.immagine} titolo={card.titolo} descrizione={card.descrizione} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;