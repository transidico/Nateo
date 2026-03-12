/*Componente Titolo*/
function Titolo({ testo, size = "text-2xl", className = "" }) {
  return (
    <h1 className={`${size} ${className}`}>{testo}</h1>
  );
}

/*Componente Paragrafo*/
function Paragrafo({ testo, size = "text-2xl", className = "" }) {
  return <p className={`${size} ${className}`}>{testo}</p>;
}

export default Titolo;
export { Paragrafo };
