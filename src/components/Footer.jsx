import { FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export function Footer() {
    return (
        <footer className="flex flex-col items-center gap-10 bg-gray-900 text-gray-300 p-10 border-t border-gray-800">

            {/* Navigazione Link */}
            <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
                <a className="hover:text-white transition-colors cursor-pointer uppercase text-xs tracking-widest font-semibold">About us</a>
                <a className="hover:text-white transition-colors cursor-pointer uppercase text-xs tracking-widest font-semibold">Contact</a>
                <a className="hover:text-white transition-colors cursor-pointer uppercase text-xs tracking-widest font-semibold">Tips</a>
            </nav>

            {/* Social Icons*/}
            <nav>
                <div className="flex gap-8">
                    <a href="#" className="text-2xl hover:text-pink-500 transition-colors"><FaInstagram /></a>
                    <a href="#" className="text-2xl hover:text-cyan-400 transition-colors"><SiTiktok /></a>
                </div>
            </nav>

            {/* Copyright */}
            <aside className="text-center">
                <p className="text-sm text-gray-500"> Copyright © {new Date().getFullYear()} - All rights reserved by NATEO™ </p>
            </aside>
        </footer>
    );
}

// function Footer() {
//     return (
//         <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 px-10 py-6">
//             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

//                 {/*Copyright*/}
//                 <aside className="order-3 md:order-1">
//                     <p className="text-xs text-gray-500 tracking-wider"> Copyright © {new Date().getFullYear()} - All rights reserved by NATEO™ </p>
//                 </aside>

//                 {/*Navigazione Link*/}
//                 <nav className="flex gap-8 order-1 md:order-2">
//                     <a className="hover:text-white transition-colors cursor-pointer uppercase text-[10px] tracking-[0.2em] font-bold">About us</a>
//                     <a className="hover:text-white transition-colors cursor-pointer uppercase text-[10px] tracking-[0.2em] font-bold">Contact</a>
//                     <a className="hover:text-white transition-colors cursor-pointer uppercase text-[10px] tracking-[0.2em] font-bold">Tips</a>
//                 </nav>

//                 {/*Icone*/}
//                 <div className="flex gap-6 order-2 md:order-3">
//                     <a href="#" className="text-lg hover:text-pink-500 transition-colors"><FaInstagram /></a>
//                     <a href="#" className="text-lg hover:text-cyan-400 transition-colors"><SiTiktok /></a>
//                 </div>

//             </div>
//         </footer>
//     );
// }

export default Footer;