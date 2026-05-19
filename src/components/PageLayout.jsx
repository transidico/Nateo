// Serve per l'impaginazione di ogni pagina con leyout simile (es. padding, margini, ecc.)
function PageLayout({ children, className = '', noPadding = false }) {
    return (
        <div className={`px-4 sm:px-10 ${noPadding ? '' : 'py-6 sm:py-10'} ${className}`}>
            {children}
        </div>
    );
}

export default PageLayout;