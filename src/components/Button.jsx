import { Link } from 'react-router-dom';
// Componente bottone rotondo con colore predefinito ma è impostabile il colore, il colore hover, il colore del bordo, il colore della sfumatura
function RoundButton({ testo, to, color = "bg-mytheme-secondary/70", hoverColor = "hover:bg-mytheme-primary", borderColor = "border-mytheme-primary/20", glowColor = "hover:shadow-[0_0_15px_5px_rgba(168,85,247,0.5)]", colorText = "text-mytheme-light" }) {
    return (
        <Link to={to} className={`px-6 py-2 mt-6 rounded-full border-2 ${color} ${hoverColor} ${borderColor} ${glowColor} ${colorText} font-medium transition-all duration-500`}>
            {testo}
        </Link>
    )
}

export default RoundButton
