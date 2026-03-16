import { FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export function Footer() {
    return (
        <footer className="flex flex-col items-center gap-10 bg-mytheme-bg text-mytheme-text p-10 border-t border-gray-800">

            {/* Navigazione Link */}
            <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
                <a className="hover:text-mytheme-secondary transition-colors cursor-pointer uppercase text-xs tracking-widest font-semibold">About us</a>
                <a className="hover:text-mytheme-secondary transition-colors cursor-pointer uppercase text-xs tracking-widest font-semibold">Contact</a>
                <a className="hover:text-mytheme-secondary transition-colors cursor-pointer uppercase text-xs tracking-widest font-semibold">Tips</a>
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

export default Footer;