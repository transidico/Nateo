/*Componente Card*/
function Card({ immagine, titolo, descrizione }) {
  return (
    <div className="card bg-mytheme-bg w-full md:w-86 h-[400px] shadow-xl shadow-mytheme-text/20 rounded-2xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Immagine della card*/}
      <figure className="h-72 w-full overflow-hidden">
        <img src={immagine} alt={titolo} className="w-full h-full object-cover" />
      </figure>
      {/* Parte descrittiva */}
      <div className="card-body p-6 flex flex-col flex-grow">
        <h2 className="card-title text-2xl font-bold text-mytheme-primary tracking-wide mb-2 line-clamp-1">{titolo}</h2>  {/*Titolo*/}
        <p className="text-mytheme-text line-clamp-3 overflow-hidden">{descrizione}</p>                             {/* Descrizione con limite di righe (es. 3 righe) */}
        <div className="flex-grow"></div>                                                                         {/* Spazio vuoto flessibile*/}
      </div>
    </div>
  );
}

export default Card;