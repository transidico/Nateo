import { Link } from 'react-router-dom';
import { IoPencil, IoLogOut, IoTrash, IoAdd } from 'react-icons/io5';

// Componente bottone rotondo con colore predefinito ma è impostabile il colore, il colore hover, il colore del bordo, il colore della sfumatura
export default function RoundButton({ testo, to, onClick, color = "bg-mytheme-secondary/70", hoverColor = "hover:bg-mytheme-primary", borderColor = "border-mytheme-primary/20", glowColor = "hover:shadow-[0_0_15px_5px_rgba(168,85,247,0.5)]", colorText = "text-mytheme-light" }) {
    if (onClick) {
        return (
            <button onClick={onClick} className={`px-6 py-2 mt-6 rounded-full border-2 ${color} ${hoverColor} ${borderColor} ${glowColor} ${colorText} font-medium transition-all duration-500`}>
                {testo}
            </button>
        )
    }
    return (
        <Link to={to} className={`px-6 py-2 mt-6 rounded-full border-2 ${color} ${hoverColor} ${borderColor} ${glowColor} ${colorText} font-medium transition-all duration-500`}>
            {testo}
        </Link>
    )
}

// Bottone circolare con icona edit
export function EditButton({ onClick, size = "w-10 h-10" }) {
    return (
        <button onClick={onClick} className={`${size} rounded-full bg-mytheme-secondary/70 border-2 border-mytheme-primary/20 flex items-center justify-center text-mytheme-light hover:bg-mytheme-primary hover:shadow-[0_0_15px_5px_rgba(168,85,247,0.5)] transition-all duration-500`}>
            <IoPencil className="text-sm" />
        </button>
    )
}

// Bottone circolare con icona logout
export function LogoutButton({ onClick, size = "w-10 h-10" }) {
    return (
        <button onClick={onClick} className={`${size} rounded-full bg-red-500 border-2 border-red-700 flex items-center justify-center text-white hover:bg-red-700 hover:shadow-[0_0_15px_5px_rgba(239,68,68,0.5)] transition-all duration-500`}>
            <IoLogOut className="text-sm" />
        </button>
    )
}

// Bottone circolare con icona delete
export function DeleteButton({ onClick, size = "w-10 h-10" }) {
    return (
        <button onClick={onClick} className={`${size} rounded-full bg-mytheme-light/45 border-2 border-mytheme-light/30 flex items-center justify-center text-mytheme-light hover:bg-mytheme-light/70 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.5)] transition-all duration-500`}>
            <IoTrash className="text-sm" />
        </button>
    )
}

// Bottone circolare con icona Add
export function AddButton({ onClick, size = "w-10 h-10" }) {
    return (
        <button onClick={onClick} className={`${size} rounded-full bg-mytheme-secondary/70 border-2 border-mytheme-primary/20 flex items-center justify-center text-mytheme-light hover:bg-mytheme-primary hover:shadow-[0_0_15px_5px_rgba(168,85,247,0.5)] transition-all duration-500`}>
            <IoAdd className="text-sm" />
        </button>
    )
}
