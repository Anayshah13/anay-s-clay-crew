import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlobCrowd from '@/components/BlobCrowd';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight, Mail } from 'lucide-react';

const TITLES = ['Developer.', 'Hackathon Winner.', 'Competitive Programmer.', 'UI Animator.'];

const HeroPage: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  // GSAP page load stagger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !leftRef.current) return;

    const elements = leftRef.current.querySelectorAll('[data-animate]');
    gsap.set(elements, { y: 50, opacity: 0 });
    gsap.to(elements, {
      y: 0, opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.4
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center" style={{ background: '#0a0a0a' }}>
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center min-h-screen">
        {/* LEFT SIDE - 42% */}
        <div ref={leftRef} className="w-full md:w-[42%] flex flex-col justify-center py-16 md:py-0 z-20">
          <p data-animate className="text-foreground text-[2.5rem] md:text-[3rem] font-bold leading-tight mb-1">
            Hi, I'm
          </p>
          <h1 data-animate className="text-[3.5rem] md:text-[5.5rem] font-bold leading-[1.05] mb-2" style={{ color: '#DAFC92' }}>
            Anay Shah
          </h1>
          <div data-animate className="h-[3.5rem] md:h-[4rem] flex items-center mb-8">
            <span className="text-foreground text-xl md:text-2xl font-semibold font-mono">
              {displayedText}
              <span className="animate-cursor-blink ml-0.5 inline-block w-[3px] h-[1.2em] bg-primary align-middle" />
            </span>
          </div>

          {/* Buttons */}
          <div data-animate className="flex flex-wrap gap-3 mb-8">
            <button className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: '#DAFC92', color: '#0a0a0a' }}>
              View Projects <ArrowRight size={16} />
            </button>
            <button className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 border transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
              <Mail size={16} /> Contact Me
            </button>
            <button className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ color: 'rgba(255,255,255,0.6)' }}>
              GitHub <ExternalLink size={14} />
            </button>
          </div>

          {/* Social icons */}
          <div data-animate className="flex gap-4">
            {[
              { icon: <Github size={20} />, label: 'GitHub' },
              { icon: <Linkedin size={20} />, label: 'LinkedIn' },
              { icon: <Instagram size={20} />, label: 'Instagram' },
              { icon: <span className="text-sm font-bold">C</span>, label: 'Codolio' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - 58% blob crowd */}
        <div className="w-full md:w-[58%] relative h-[500px] md:h-[700px]">
          <BlobCrowd />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
