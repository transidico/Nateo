// Componente box di login per accedere con email e password
// function LoginBox() {
//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="flex flex-col gap-8 p-8 rounded-2xl shadow-lg bg-mytheme-light dark:bg-mytheme-bg border-1 border-mytheme-primary w-80">
//                 <h1 className="text-2xl font-bold text-mytheme-primary text-center">Login</h1>
//                 <input type="email" placeholder="Email" className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
//                 <input type="password" placeholder="Password" className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
//                 <button className="py-2 rounded-full bg-mytheme-primary text-mytheme-text font-medium hover:bg-mytheme-secondary transition-all duration-300">Login</button>
//             </div>
//         </div>
//     )
// }

import { useState } from 'react';
import { auth } from '../firebase';                         // Istanza di Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Funzione di login Firebase
import { useNavigate } from 'react-router-dom';             // Hook per navigare tra le pagine
import { IoEye, IoEyeOff } from 'react-icons/io5';          // Icone occhio per mostrare/nascondere password

// Componente box di login per accedere con email e password
function LoginBox() {
    const [email, setEmail] = useState('');                     // Stato per l'email
    const [password, setPassword] = useState('');               // Stato per la password
    const [errore, setErrore] = useState('');                   // Stato per il messaggio di errore
    const [showPassword, setShowPassword] = useState(false);    // Stato per mostrare/nascondere la password
    const navigate = useNavigate();

    // Funzione di login: tenta l'accesso con email e password su Firebase
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');                                      // Se il login va a buon fine, reindirizza alla home
        } catch (err) {
            setErrore('Email o password errati!');              // Mostra errore se il login fallisce
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-8 p-8 rounded-2xl shadow-lg bg-mytheme-light dark:bg-mytheme-bg border-1 border-mytheme-primary w-80">
                <h1 className="text-2xl font-bold text-mytheme-primary text-center">Login</h1>

                {/* Campo email */}
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />

                {/* Campo password con bottone mostra/nascondi */}
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-mytheme-primary focus:outline-none bg-mytheme-bg text-mytheme-text" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mytheme-text">
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                </div>

                {/* Messaggio di errore (visibile solo se presente) */}
                {errore && <p className="text-red-500 text-sm text-center">{errore}</p>}

                {/* Bottone di login */}
                <button onClick={handleLogin} className="py-2 rounded-full bg-mytheme-primary text-mytheme-light font-medium hover:bg-mytheme-secondary transition-all duration-300">Login</button>
            </div>
        </div>
    )
}

export default LoginBox;