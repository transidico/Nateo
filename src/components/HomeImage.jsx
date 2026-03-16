/*Componente immagine profilo
Gli passo Il titolo, il sottotitolo e il link immagine*/
function HomeImage({ titolo, sottotitolo, immagine }) {
  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {/* Immagine di Sfondo dinamica */}
      <img
        src={immagine}
        alt={titolo}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-mytheme-light">
        <h2 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg shadow-mytheme-text text-center uppercase">
          {titolo}
        </h2>
        <p className="text-lg md:text-4xl font-light shadow-mytheme-text">
          {sottotitolo}
        </p>
      </div>
    </div>
  )
}

export default HomeImage