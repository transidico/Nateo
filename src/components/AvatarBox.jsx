/* Componente AvatarBox descrizione con foto circolare */
function AvatarBox({ immagine, titolo, descrizione, posizione = "left" }) {
    const isRight = posizione === "right";

    return (
        <div className={`flex flex-col items-center md:flex-row md:items-center my-10 ${isRight ? "md:flex-row-reverse" : ""}`}>
            {/* Immagine dell'avatar */}
            <div className={`relative z-10 flex-shrink-0 mb-[-60px] md:mb-0 ${isRight ? "md:-ml-24" : "md:-mr-24"}`}>
                <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full border-4 border-mytheme-bg overflow-hidden shadow-lg">
                    <img src={immagine} alt={titolo} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Box descrittivo */}
            <div className={`bg-mytheme-light dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-14 rounded-2xl shadow-sm flex-grow w-full pt-20 md:pt-14 text-center md:text-left ${isRight ? "md:pr-32 md:pl-12 md:text-right" : "md:pl-32 md:pr-12 md:text-left"}`}>
                <h3 className="text-xl font-bold text-mytheme-dark dark:text-mytheme-light mb-2">{titolo}</h3>
                <p className="text-mytheme-text leading-relaxed whitespace-pre-line">{descrizione}</p>
            </div>
        </div>
    );
}

export default AvatarBox;