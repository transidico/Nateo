/*Componente Titolo*/
function Titolo({ testo, align = "text-center" }) {
  return (
    <h1 className={`text-2xl md:text-4xl font-bold text-mytheme-primary pt-10 mb-4 px-14 ${align}`}>{testo}</h1>
  );
}

/*Componente Paragrafo*/
function Paragrafo({ testo, size = "text-2xl", className = "" }) {
  return <p className={`${size} ${className}`}>{testo}</p>;
}

export default Titolo;
export { Paragrafo };
