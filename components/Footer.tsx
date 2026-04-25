import Link from 'next/link';
import { getCalApi } from "@calcom/embed-react";

async function openCalPopup() {
  const cal = await getCalApi();
  cal("modal", {
    calLink: "relentiv/30min",
  });
}

export function Footer() {
  return (
    <footer className="relative w-full text-white bg-black">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.pixabay.com/photo/2015/05/16/12/03/escalator-769790_1280.jpg"
          alt="Elevator Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient overlays to ensure text readability & blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-32"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-20 md:pt-32 lg:pt-48 pb-0 flex flex-col">
        {/* Glassmorphic Container Wrapper */}
        <div className="bg-[#1C1A18]/80 backdrop-blur-2xl rounded-t-[2.5rem] md:rounded-t-[4rem] px-5 py-10 md:p-16 lg:p-20 overflow-hidden relative">
           
          <div className="flex flex-col lg:flex-row justify-between gap-12 md:gap-16 mb-20 lg:mb-56 relative z-20">
            {/* Left side: Mission & Badges */}
            <div className="lg:max-w-[400px] flex flex-col">
              <h2 className="text-3xl lg:text-[2.5rem] leading-[1.1] font-medium tracking-tight text-white/95 mb-6">
                Engineering the<br />
                Future of Tech.<br />
              </h2>
              
              <div className="mt-8">
                <button
                  onClick={openCalPopup}
                  className="px-8 py-3 rounded-full border-2 border-dotted border-white/40 text-white/90 font-mono tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black hover:border-solid hover:border-white transition-all duration-300 ease-in-out"
                >
                  Start Project
                </button>
              </div>
              
              <div className="mt-8 text-[11px] font-medium tracking-wide text-zinc-500">
                © {new Date().getFullYear()} Relentiv. All rights reserved.
              </div>
            </div>

            {/* Right side: Navigational Links Matrix */}
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 flex-1 lg:max-w-[800px]" aria-label="Footer Navigation">
              <div>
                <h3 className="text-white/60 text-sm font-medium mb-5">Company</h3>
                <ul className="space-y-3.5 text-sm font-medium">
                  <li><Link href="/about" className="text-white hover:text-white/70 transition-colors">About</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white/60 text-sm font-medium mb-5">Legal</h3>
                <ul className="space-y-3.5 text-sm font-medium">
                  <li><Link href="/terms-of-service" className="text-white hover:text-white/70 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy-policy" className="text-white hover:text-white/70 transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white/60 text-sm font-medium mb-5">Connect</h3>
                <ul className="space-y-3.5 text-sm font-medium">
                  <li><Link href="https://www.linkedin.com/company/relentiv/" target="_blank" className="text-white hover:text-white/70 transition-colors">LinkedIn</Link></li>
                  <li><Link href="https://www.instagram.com/relentivlabs/" target="_blank" className="text-white hover:text-white/70 transition-colors">Instagram</Link></li>
                  <li><Link href="https://x.com/relentiv_global" target="_blank" className="text-white hover:text-white/70 transition-colors">X/Twitter</Link></li>
                </ul>
              </div>

              <address className="not-italic">
                <h3 className="text-white/60 text-sm font-medium mb-5">Contact & Location</h3>
                <ul className="space-y-3.5 text-sm font-medium">
                  <li><a href="mailto:contact@relentiv.com" className="text-white hover:text-white/70 transition-colors">contact@relentiv.com</a></li>
                  <li className="text-white/70 mt-2">Bengaluru, India</li>
                </ul>
              </address>
            </nav>
          </div>

          {/* Huge cut-off logo text at the bottom */}
          <div className="absolute left-0 right-0 bottom-0 pointer-events-none flex justify-center translate-y-[33%] z-0 select-none">
             {/* Use width mapping and negative tracking for tight spacing */}
             <h1 className="text-[15vw] md:text-[20vw] font-bold leading-[0.75] tracking-tighter text-white uppercase opacity-95 text-center whitespace-nowrap">
                RELENTIV
             </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}
