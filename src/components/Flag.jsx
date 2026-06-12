// Componente che mostra la griglia delle bandiere dei paesi visitati
function Flag({ paesi, isAdmin, onDelete }) {
    return (
        <div className="px-4 sm:px-10 py-6">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
                {paesi.map((paese) => (
                    <div key={paese.id} className="relative flex flex-col items-center gap-2 group">
                        {/* Bandiera grande, senza bordi smussati e con ombra */}
                        <img
                            src={`https://flagcdn.com/w80/${paese.code}.png`}
                            alt={paese.paese}
                            className="w-12 h-8 sm:w-16 sm:h-10 object-cover shadow-[2px_3px_8px_color-mix(in_srgb,var(--color-mytheme-text)_30%,transparent)]"
                        />
                        {/* Nome del paese */}
                        <p className="text-xs text-mytheme-text text-center">{paese.paese}</p>
                        {/* Bottone delete visibile solo all'admin al hover */}
                        {isAdmin && (
                            <button
                                onClick={() => onDelete(paese.id)}
                                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-mytheme-secondary text-white text-xs hidden group-hover:flex items-center justify-center">
                                ✕
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Flag;