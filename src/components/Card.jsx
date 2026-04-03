import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { DeleteButton } from './Button';

/*Componente Card*/
function Card({ id, immagine, titolo, descrizione, deleteCard }) {
  const { isAdmin } = useAuth(); // Prende isAdmin dal context

  return (
    <div className="relative card bg-mytheme-bg w-full md:w-86 h-[400px] shadow-xl shadow-mytheme-text/20 rounded-2xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Bottone elimina visibile solo all'admin */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10">
          <DeleteButton onClick={deleteCard} size="w-8 h-8" />
        </div>
      )}
      {/* Immagine della card*/}
      <figure className="h-72 w-full overflow-hidden">
        <img src={immagine} alt={titolo} className="w-full h-full object-cover" />
      </figure>
      {/* Parte descrittiva */}
      <div className="card-body p-6 flex flex-col flex-grow">
        <h2 className="card-title text-2xl font-bold text-mytheme-primary tracking-wide mb-2 line-clamp-1">
          <Link to={`/trip/${id}`} className="hover:text-mytheme-secondary transition-colors duration-200">{titolo}</Link>
        </h2>
        <p className="text-mytheme-text line-clamp-3 overflow-hidden">{descrizione}</p>
        <div className="flex-grow"></div>
      </div>
    </div>
  );
}

export default Card;


/*Componente Card per suddividere le destinazioni*/
export function CardGlobe({ id, immagine, titolo, deleteCard }) {
  const { isAdmin } = useAuth();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-mytheme-text/20 hover:shadow-2xl transition-all duration-300 aspect-video">
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10">
          <DeleteButton onClick={deleteCard} size="w-8 h-8" />
        </div>
      )}
      <img src={immagine} alt={titolo} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 p-4">
        <Link to={`/trip/${id}`} className="text-4xl font-black text-white uppercase tracking-wide drop-shadow-lg hover:text-mytheme-secondary transition-colors duration-200">
          {titolo}
        </Link>
      </div>
    </div>
  );
}