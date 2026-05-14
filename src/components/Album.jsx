import { useRef, useState } from "react";

// Componente Album — striscia pellicola 35mm su desktop, stories su mobile
function Album({ immagini }) {
    const [corrente, setCorrente] = useState(0);
    const [storiesMode, setStoriesMode] = useState(false);
    const [progressi, setProgressi] = useState(0);
    const scrollRef = useRef(null);
    const timerRef = useRef(null);
    const [imgIngrandita, setImgIngrandita] = useState(null);

    // Scroll orizzontale carosello desktop
    const scroll = (direction) => {
        scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    };

    // Frecce di navigazione
    const ArrowBtn = ({ direction }) => (
        <button onClick={() => scroll(direction)}
            className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all`}>
            {direction === 'left' ? '‹' : '›'}
        </button>
    );

    // Avanza automaticamente ogni 4 secondi in modalità stories
    const avviaStories = () => {
        setCorrente(0);
        setStoriesMode(true);
        setProgressi(0);
        timerRef.current = setInterval(() => {
            setProgressi(p => {
                if (p >= 100) {
                    setCorrente(c => {
                        if (c + 1 >= immagini.length) { setStoriesMode(false); clearInterval(timerRef.current); return 0; }
                        return c + 1;
                    });
                    return 0;
                }
                return p + 2;
            });
        }, 80);
    };

    const chiudiStories = () => {
        setStoriesMode(false);
        setCorrente(0);
        clearInterval(timerRef.current);
    };

    if (immagini.length === 0) return null;

    return (
        <>
            {/* ── DESKTOP: striscia pellicola 35mm ── */}
            <div
                className="hidden sm:block w-full overflow-hidden bg-mytheme-dark rounded-2xl py-4 relative"
                style={{ boxShadow: '0 8px 32px color-mix(in srgb, var(--color-mytheme-text) 30%, transparent)' }}>

                <ArrowBtn direction="left" />
                <ArrowBtn direction="right" />

                {/* Fori superiori */}
                <div className="flex gap-3 px-4 mb-3 overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="w-4 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                    ))}
                </div>

                {/* Striscia foto scorrevole */}
                <div ref={scrollRef}
                    className="flex gap-2 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {immagini.map((img, i) => (
                        <div key={i} className="shrink-0 border-4 border-mytheme-bg/10 cursor-pointer"
                            onClick={() => setImgIngrandita(img)}>
                            <img src={img.url} alt={img.didascalia || `Foto ${i + 1}`}
                                className="h-80 w-64 object-cover hover:opacity-90 transition-opacity duration-200" />
                            {img.didascalia && (
                                <p className="text-white/50 text-xs text-center py-1">{img.didascalia}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Fori inferiori */}
                <div className="flex gap-3 px-4 mt-3 overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="w-4 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                    ))}
                </div>
            </div>

            {/* ── MOBILE: stile stories ── */}
            <div className="block sm:hidden">
                {!storiesMode ? (
                    <div
                        className="relative w-full rounded-2xl overflow-hidden cursor-pointer bg-mytheme-dark"
                        style={{ boxShadow: '0 8px 32px color-mix(in srgb, var(--color-mytheme-text) 30%, transparent)' }}
                        onClick={avviaStories}>
                        {/* Fori pellicola mobile */}
                        <div className="flex gap-2 px-3 py-2">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="w-3 h-2 rounded-sm shrink-0"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                            ))}
                        </div>
                        <img src={immagini[0].url} alt="album" className="w-full h-56 object-cover" />
                        <div className="flex gap-2 px-3 py-2">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="w-3 h-2 rounded-sm shrink-0"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-2">
                            <span className="text-white text-4xl">▶</span>
                            <span className="text-white text-sm font-mono">{String(immagini.length).padStart(2, '0')} foto</span>
                        </div>
                    </div>
                ) : (
                    <div className="fixed inset-0 bg-black z-50 flex flex-col">
                        {/* Barre di progressione */}
                        <div className="flex gap-1 px-3 pt-10 pb-2">
                            {immagini.map((_, i) => (
                                <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-mytheme-secondary rounded-full"
                                        style={{ width: i < corrente ? '100%' : i === corrente ? `${progressi}%` : '0%' }} />
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 relative">
                            <img src={immagini[corrente].url} alt={immagini[corrente].didascalia || ''}
                                className="w-full h-full object-contain" />
                            {immagini[corrente].didascalia && (
                                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm px-4 drop-shadow">
                                    {immagini[corrente].didascalia}
                                </p>
                            )}
                            <div className="absolute left-0 top-0 w-1/3 h-full"
                                onClick={() => { if (corrente > 0) { setCorrente(c => c - 1); setProgressi(0); } }} />
                            <div className="absolute right-0 top-0 w-1/3 h-full"
                                onClick={() => {
                                    if (corrente + 1 < immagini.length) { setCorrente(c => c + 1); setProgressi(0); }
                                    else chiudiStories();
                                }} />
                        </div>

                        {/* Numero foto stile pellicola */}
                        <p className="text-mytheme-secondary text-xs font-mono text-center pb-2">
                            {String(corrente + 1).padStart(2, '0')} / {String(immagini.length).padStart(2, '0')}
                        </p>

                        <button onClick={chiudiStories}
                            className="absolute top-10 right-4 text-white text-2xl z-10">✕</button>
                    </div>
                )}
            </div>

            {/* Lightbox — immagine ingrandita al click */}
            {imgIngrandita && (
                <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center"
                    onClick={() => setImgIngrandita(null)}>
                    <img src={imgIngrandita.url} alt={imgIngrandita.didascalia || ''}
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl" />
                    {imgIngrandita.didascalia && (
                        <p className="text-white/70 text-sm mt-3 font-mono">{imgIngrandita.didascalia}</p>
                    )}
                    <button className="absolute top-6 right-6 text-white text-2xl">✕</button>
                </div>
            )}
        </>
    );
}

export default Album;