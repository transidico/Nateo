import { useRef, useState, useCallback } from "react";

// Componente Album — striscia pellicola 35mm su desktop, stories su mobile
function Album({ immagini }) {
    const [corrente, setCorrente] = useState(0);           // indice foto corrente nelle stories
    const [storiesMode, setStoriesMode] = useState(false); // modalità stories attiva
    const [progressi, setProgressi] = useState(0);         // percentuale avanzamento barra stories
    const [pausa, setPausa] = useState(false);             // pausa avanzamento automatico stories
    const [imgIngrandita, setImgIngrandita] = useState(null); // foto aperta nel lightbox
    const [indiceIngrandito, setIndiceIngrandito] = useState(null); // indice foto aperta nel lightbox
    const scrollRef = useRef(null);
    const timerRef = useRef(null);

    // ── Scroll orizzontale carosello desktop ──
    const scroll = (direction) => {
        scrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    };

    // ── Frecce carosello desktop ──
    const ArrowBtn = ({ direction }) => (
        <button onClick={() => scroll(direction)}
            className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all`}>
            {direction === 'left' ? '‹' : '›'}
        </button>
    );

    // ── Apre il lightbox sulla foto cliccata ──
    const apriLightbox = (img, indice) => {
        setImgIngrandita(img);
        setIndiceIngrandito(indice);
    };

    // ── Chiude il lightbox ──
    const chiudiLightbox = () => {
        setImgIngrandita(null);
        setIndiceIngrandito(null);
    };

    // ── Naviga nel lightbox alla foto precedente ──
    const lightboxPrev = (e) => {
        e.stopPropagation();
        if (indiceIngrandito > 0) {
            const nuovoIndice = indiceIngrandito - 1;
            setIndiceIngrandito(nuovoIndice);
            setImgIngrandita(immagini[nuovoIndice]);
        }
    };

    // ── Naviga nel lightbox alla foto successiva ──
    const lightboxNext = (e) => {
        e.stopPropagation();
        if (indiceIngrandito < immagini.length - 1) {
            const nuovoIndice = indiceIngrandito + 1;
            setIndiceIngrandito(nuovoIndice);
            setImgIngrandita(immagini[nuovoIndice]);
        }
    };

    // ── Avvia le stories con avanzamento automatico ogni 4 secondi ──
    const avviaStories = () => {
        setCorrente(0);
        setStoriesMode(true);
        setProgressi(0);
        setPausa(false);
        timerRef.current = setInterval(() => {
            setProgressi(p => {
                if (p >= 100) {
                    setCorrente(c => {
                        if (c + 1 >= immagini.length) {
                            setStoriesMode(false);
                            clearInterval(timerRef.current);
                            return 0;
                        }
                        return c + 1;
                    });
                    return 0;
                }
                // Se in pausa non avanza
                return p;
            });
        }, 80);

        // Timer separato per l'avanzamento reale
        const avanza = () => {
            if (!pausa) setProgressi(p => p + 2);
        };
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setProgressi(p => {
                if (p >= 100) {
                    setCorrente(c => {
                        if (c + 1 >= immagini.length) {
                            setStoriesMode(false);
                            clearInterval(timerRef.current);
                            return 0;
                        }
                        return c + 1;
                    });
                    return 0;
                }
                return p + 2;
            });
        }, 80);
    };

    // ── Chiude le stories ──
    const chiudiStories = () => {
        setStoriesMode(false);
        setCorrente(0);
        setPausa(false);
        clearInterval(timerRef.current);
    };

    // ── Pausa/riprendi stories al tocco centrale ──
    const togglePausa = (e) => {
        e.stopPropagation();
        if (pausa) {
            // Riprendi
            setPausa(false);
            timerRef.current = setInterval(() => {
                setProgressi(p => {
                    if (p >= 100) {
                        setCorrente(c => {
                            if (c + 1 >= immagini.length) {
                                setStoriesMode(false);
                                clearInterval(timerRef.current);
                                return 0;
                            }
                            return c + 1;
                        });
                        return 0;
                    }
                    return p + 2;
                });
            }, 80);
        } else {
            // Metti in pausa
            setPausa(true);
            clearInterval(timerRef.current);
        }
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

                {/* Fori superiori — pattern ripetuto */}
                <div className="flex gap-3 px-4 mb-3 overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="w-4 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                    ))}
                </div>

                {/* Striscia foto scorrevole — click apre lightbox */}
                <div ref={scrollRef}
                    className="flex gap-2 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {immagini.map((img, i) => (
                        <div key={i} className="shrink-0 border-4 border-mytheme-bg/10 cursor-pointer"
                            onClick={() => apriLightbox(img, i)}>
                            <img src={img.url} alt={img.didascalia || `Foto ${i + 1}`}
                                className="h-80 w-64 object-cover hover:opacity-90 transition-opacity duration-200" />
                            {img.didascalia && (
                                <p className="text-white/50 text-xs text-center py-1">{img.didascalia}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Fori inferiori — pattern ripetuto */}
                <div className="flex gap-3 px-4 mt-3 overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="w-4 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                    ))}
                </div>
            </div>

            {/* ── MOBILE: anteprima pellicola + stories fullscreen ── */}
            <div className="block sm:hidden">
                {!storiesMode ? (
                    // Anteprima con fori e prima foto — click avvia stories
                    <div
                        className="relative w-full rounded-2xl overflow-hidden cursor-pointer bg-mytheme-dark"
                        style={{ boxShadow: '0 8px 32px color-mix(in srgb, var(--color-mytheme-text) 30%, transparent)' }}
                        onClick={avviaStories}>
                        {/* Fori superiori mobile */}
                        <div className="flex gap-2 px-3 py-2">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="w-3 h-2 rounded-sm shrink-0"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                            ))}
                        </div>
                        <img src={immagini[0].url} alt="album" className="w-full h-56 object-cover" />
                        {/* Fori inferiori mobile */}
                        <div className="flex gap-2 px-3 py-2">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="w-3 h-2 rounded-sm shrink-0"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-mytheme-text) 35%, transparent)' }} />
                            ))}
                        </div>
                        {/* Overlay con pulsante play e contatore */}
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-2">
                            <span className="text-white text-4xl">▶</span>
                            <span className="text-white text-sm font-mono">{String(immagini.length).padStart(2, '0')} foto</span>
                        </div>
                    </div>
                ) : (
                    // Modalità stories fullscreen
                    <div className="fixed inset-0 bg-black z-50 flex flex-col">

                        {/* Barre di progressione — una per ogni foto */}
                        <div className="flex gap-1 px-3 pt-10 pb-2">
                            {immagini.map((_, i) => (
                                <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-mytheme-secondary rounded-full transition-none"
                                        style={{ width: i < corrente ? '100%' : i === corrente ? `${progressi}%` : '0%' }} />
                                </div>
                            ))}
                        </div>

                        {/* Foto corrente */}
                        <div className="flex-1 relative">
                            <img src={immagini[corrente].url} alt={immagini[corrente].didascalia || ''}
                                className="w-full h-full object-contain" />
                            {immagini[corrente].didascalia && (
                                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm px-4 drop-shadow">
                                    {immagini[corrente].didascalia}
                                </p>
                            )}

                            {/* Tap sinistra → foto precedente */}
                            <div className="absolute left-0 top-0 w-1/3 h-full"
                                onClick={() => {
                                    if (corrente > 0) {
                                        setCorrente(c => c - 1);
                                        setProgressi(0);
                                    }
                                }} />

                            {/* Tap centro → pausa/riprendi */}
                            <div className="absolute left-1/3 top-0 w-1/3 h-full flex items-center justify-center"
                                onClick={togglePausa}>
                                {pausa && (
                                    <span className="text-white/60 text-4xl">⏸</span>
                                )}
                            </div>

                            {/* Tap destra → foto successiva */}
                            <div className="absolute right-0 top-0 w-1/3 h-full"
                                onClick={() => {
                                    if (corrente + 1 < immagini.length) {
                                        setCorrente(c => c + 1);
                                        setProgressi(0);
                                    } else {
                                        chiudiStories();
                                    }
                                }} />
                        </div>

                        {/* Numero foto stile pellicola */}
                        <p className="text-mytheme-secondary text-xs font-mono text-center pb-2">
                            {String(corrente + 1).padStart(2, '0')} / {String(immagini.length).padStart(2, '0')}
                        </p>

                        {/* Bottone chiudi */}
                        <button onClick={chiudiStories}
                            className="absolute top-10 right-4 text-white text-2xl z-10">✕</button>
                    </div>
                )}
            </div>

            {/* ── LIGHTBOX: immagine ingrandita con navigazione frecce ── */}
            {imgIngrandita && (
                <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center"
                    onClick={chiudiLightbox}>

                    {/* Freccia sinistra */}
                    {indiceIngrandito > 0 && (
                        <button onClick={lightboxPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all text-xl">
                            ‹
                        </button>
                    )}

                    {/* Foto ingrandita */}
                    <img src={imgIngrandita.url} alt={imgIngrandita.didascalia || ''}
                        className="max-w-[80vw] max-h-[85vh] object-contain rounded-xl" />

                    {/* Didascalia */}
                    {imgIngrandita.didascalia && (
                        <p className="text-white/70 text-sm mt-3 font-mono">{imgIngrandita.didascalia}</p>
                    )}

                    {/* Contatore foto */}
                    <p className="text-white/30 text-xs font-mono mt-1">
                        {String(indiceIngrandito + 1).padStart(2, '0')} / {String(immagini.length).padStart(2, '0')}
                    </p>

                    {/* Freccia destra */}
                    {indiceIngrandito < immagini.length - 1 && (
                        <button onClick={lightboxNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all text-xl">
                            ›
                        </button>
                    )}

                    {/* Bottone chiudi */}
                    <button onClick={chiudiLightbox}
                        className="absolute top-6 right-6 text-white text-2xl">✕</button>
                </div>
            )}
        </>
    );
}

export default Album;