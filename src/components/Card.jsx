/*Componente Card*/
function Card({ immagine, titolo, descrizione}) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
    {/* Immagine della card*/}
    <figure className="rounded-t-xl overflow-hidden">
      <img src={immagine} alt="Image"/>
    </figure>
    {/* Parte descrittiva */}
    <div className="card-body p-4">
      <h1 className="card-title text-2xl font-bold text-primary tracking-wide">{titolo}</h1>  {/*Titolo*/}
      <p>{descrizione}</p>                                                                    {/*Descrizione*/}
    </div>
  </div>
  );
}

export default Card;