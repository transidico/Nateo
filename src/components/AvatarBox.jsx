
function AvatarBox({ immagine, titolo, descrizione, posizione = "left" }) {
    const isRight = posizione === "right";

    return (
        <div className={`flex items-center my-10 ${isRight ? "flex-row-reverse" : ""}`}>
            {/* Immagine dell'avatar */}
            <div className={`relative z-10 flex-shrink-0 ${isRight ? "-ml-[120px]" : "-mr-[120px]"}`}>
                <div className="w-[240px] h-[240px] rounded-full border-4 border-mytheme-bg overflow-hidden shadow-lg">
                    <img src={immagine} alt={titolo} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Box descrittivo */}
            <div className={`bg-mytheme-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pr-8 py-14 rounded-2xl shadow-sm min-w-[300px] ${isRight ? "pr-36 pl-8" : "pl-36 pr-8"}`}>
                <h3 className="text-xl font-bold text-mytheme-dark dark:text-mytheme-light mb-2">{titolo}</h3>
                <p className="text-mytheme-text leading-relaxed whitespace-pre-line">{descrizione}</p>
            </div>
        </div>
    );
}

export default AvatarBox;