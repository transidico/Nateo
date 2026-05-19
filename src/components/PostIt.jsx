function PostIt({ titolo, testo, categoria, colore, coloreCategoria, coloreTesto, coloreCategoriaTesto, link }) {
    return (
        <div className="relative flex flex-col gap-2 rounded-sm p-6 pt-6 shadow-[3px_4px_10px_color-mix(in_srgb,var(--color-mytheme-text)_30%,transparent)]"
            style={{ background: colore }}>

            {/* Graffetta */}
            <div className="absolute -top-1.5 left-4 w-4 h-7 border-[3px] border-b-0 rounded-t-md"
                style={{ borderColor: '#888' }} />

            {/* Badge categoria */}
            <span className="text-xs font-medium px-2 py-0.5 rounded w-fit"
                style={{ color: coloreCategoriaTesto, background: coloreCategoria }}>
                {categoria}
            </span>

            {/* Titolo */}
            <p className="text-sm font-medium m-0" style={{ color: coloreTesto }}>
                {titolo}
            </p>

            {/* Testo */}
            <p className="text-xs leading-relaxed opacity-85 break-words m-0" style={{ color: coloreTesto }}>
                {testo}
            </p>

            {/* Link opzionale */}
            {link && (
                <a href={link} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-medium break-words mt-1"
                    style={{ color: coloreCategoriaTesto }}>
                    🔗 Apri link
                </a>
            )}
        </div>
    );
}

export default PostIt;