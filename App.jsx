import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, ArrowRight, CheckCircle2, Navigation, Activity, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------
// 1. NAVBAR
// -----------------------------------------------------
const Navbar = ({ onOpenModal }) => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'liquid-glass', targets: navRef.current },
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(42, 42, 53, 0.6)', borderColor: 'rgba(255,255,255,0.1)' });
          } else {
            gsap.to(navRef.current, { backgroundColor: 'transparent', borderColor: 'transparent' });
          }
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-[2rem] px-6 py-3 w-[90%] max-w-4xl" ref={navRef} style={{ border: '1px solid transparent' }}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-sans font-bold text-lg tracking-tighter text-white hover:text-accent transition-colors focus:outline-none"
        >
          STUDIO LEGALE VILLA
        </button>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-300">
          <a href="#expertise" className="hover:text-accent transition-colors">Competenze</a>
          <a href="#philosophy" className="hover:text-accent transition-colors">Visione</a>
          <a href="#protocol" className="hover:text-accent transition-colors">Metodologia</a>
        </div>
        <button onClick={onOpenModal} className="magnetic-btn bg-accent text-background font-semibold px-5 py-2.5 rounded-full text-sm">
          Prenota Consulenza
        </button>
      </div>
    </nav>
  );
};

// -----------------------------------------------------
// 2. HERO
// -----------------------------------------------------
const Hero = ({ onOpenModal }) => {
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-end pb-24 px-8 md:px-16 overflow-hidden">
      {/* Background Image (Dark Architecture) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560"
          alt="Architettura moderna Studio Legale"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl" ref={textRef}>
        <div className="hero-text text-accent font-mono text-sm uppercase tracking-widest mb-6 block">
          Due generazioni di assistenza legale
        </div>
        <h1 className="hero-text text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.9] text-white">
          <span className="font-sans font-bold">L'assistenza legale su misura porta</span><br />
          <span className="text-drama text-6xl md:text-[6rem] block mt-2">alla soddisfazione delle tue esigenze.</span>
        </h1>

        <div className="hero-text mt-12 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <button onClick={onOpenModal} className="magnetic-btn bg-accent text-background font-semibold px-8 py-4 rounded-full text-lg flex items-center gap-2">
            Inizia il Protocollo <ArrowRight size={20} />
          </button>
          <p className="text-zinc-400 max-w-xs text-sm leading-relaxed">
            Approcci mirati e rigorosi nei rami del Diritto Civile, Penale, Costituzionale e del lavoro.
          </p>
        </div>
      </div>
    </section>
  );
};


// -----------------------------------------------------
// 3. FEATURES (Interactive Cards)
// -----------------------------------------------------

// Card 1: Diagnostic Shuffler (Diritto Civile)
const CivileShuffler = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Contrattualistica d\'Impresa', status: 'Analisi' },
    { id: 2, label: 'Diritto di Famiglia', status: 'Risoluzione' },
    { id: 3, label: 'Diritti Reali e Proprietà', status: 'Tutela' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="liquid-glass rounded-[2rem] p-8 h-[400px] flex flex-col relative overflow-hidden group">
      <h3 className="font-sans font-bold text-2xl text-white mb-2">Diritto Civile</h3>
      <p className="text-sm text-zinc-400 mb-8">Gestione rigorosa del contenzioso e consulenza stragiudiziale.</p>

      <div className="relative flex-1 mt-4">
        {items.map((item, index) => {
          const yOffset = index * 20;
          const scale = 1 - index * 0.05;
          const zIndex = 10 - index;
          const opacity = 1 - index * 0.3;

          return (
            <div
              key={item.id}
              className="absolute left-0 right-0 p-4 rounded-xl bg-surface border border-white/5 flex justify-between items-center transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: `translateY(${yOffset}px) scale(${scale})`,
                zIndex,
                opacity
              }}
            >
              <div className="font-mono text-sm text-white">{item.label}</div>
              <div className="text-[10px] uppercase tracking-wider text-accent border border-accent/30 rounded px-2 py-1 bg-accent/10">
                {item.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Card 2: Telemetry Typewriter (Diritto Penale)
const PenaleTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "> Inizializzazione strategia difensiva...\n> Analisi atti processuali completata.\n> Elementi a discarico in corso di elaborazione...\n> Status: PRONTO PER UDIENZA.";

  useEffect(() => {
    let currentHtml = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentHtml += fullText.charAt(i);
        setText(currentHtml);
        i++;
      } else {
        setTimeout(() => { i = 0; currentHtml = ''; }, 4000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="liquid-glass rounded-[2rem] p-8 h-[400px] flex flex-col relative overflow-hidden">
      <div className="absolute top-6 right-6 flex items-center gap-2 border border-accent/20 px-3 py-1.5 rounded-full bg-accent/5">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-accent">Live Feed</span>
      </div>
      <h3 className="font-sans font-bold text-2xl text-white mb-2">Diritto Penale</h3>
      <p className="text-sm text-zinc-400 mb-6">Massima precisione nell'impostazione difensiva e tutela dei diritti.</p>

      <div className="bg-background/80 flex-1 rounded-xl p-4 font-mono text-xs text-green-400 leading-relaxed whitespace-pre transform border border-white/5">
        {text}
        <span className="w-2 h-3 bg-accent inline-block ml-1 animate-pulse"></span>
      </div>
    </div>
  );
};

// Card 3: Cursor Protocol Scheduler (Diritto Costituzionale)
const CostituzionaleScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const days = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.to(cursorRef.current, { x: 80, y: 30, duration: 1, ease: "power2.inOut" })
        .to('.day-cell-4', { scale: 0.95, backgroundColor: 'rgba(201, 168, 76, 0.2)', borderColor: 'rgba(201, 168, 76, 0.8)', duration: 0.2 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // click
        .to('.day-cell-4', { scale: 1, duration: 0.2 })
        .to(cursorRef.current, { x: 180, y: 120, duration: 1, ease: "power2.inOut" }, "+=0.5")
        .to('.save-btn', { scale: 0.95, backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // click
        .to('.save-btn', { scale: 1, duration: 0.2 })
        .to(cursorRef.current, { x: 0, y: 0, opacity: 0, duration: 0.5 }, "+=0.5")
        .set(cursorRef.current, { x: -20, y: -20, opacity: 1 })
        .set('.day-cell-4', { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.05)' })
        .set('.save-btn', { backgroundColor: 'transparent', color: '#C9A84C' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="liquid-glass rounded-[2rem] p-8 h-[400px] flex flex-col relative overflow-hidden group" ref={containerRef}>
      <h3 className="font-sans font-bold text-2xl text-white mb-2">Diritto Costituzionale</h3>
      <p className="text-sm text-zinc-400 mb-8">Pianificazione accurata dei ricorsi e tutela multilivello.</p>

      <div className="relative border border-white/5 rounded-xl bg-surface/30 p-6 flex flex-col items-center">
        <div className="flex gap-2 w-full justify-between mb-8">
          {days.map((d, i) => (
            <div key={i} className={`day-cell-${i} w-8 h-8 rounded shrink-0 border border-white/5 flex items-center justify-center font-mono text-xs text-zinc-500`}>
              {d}
            </div>
          ))}
        </div>

        <div className="save-btn border border-accent text-accent font-mono text-xs uppercase px-6 py-2 rounded-full w-full text-center transition-colors">
          Programma Ricorso
        </div>

        {/* Animated Mouse Cursor */}
        <div ref={cursorRef} className="absolute top-0 left-0 text-white drop-shadow-lg z-20">
          <MousePointer2 fill="#fff" size={24} />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="expertise" className="py-32 px-8 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4">Competenze Strategiche</h2>
          <p className="text-zinc-400 max-w-lg">Strumenti e domini legali di nostra pertinenza, affrontati con rigore metodologico.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CivileShuffler />
          <PenaleTypewriter />
          <CostituzionaleScheduler />
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------
// 4. PHILOSOPHY
// -----------------------------------------------------
const Philosophy = () => {
  const philRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: philRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }, philRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" className="py-40 bg-zinc-950 relative overflow-hidden" ref={philRef}>
      {/* Texture bg */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2560"
        alt="Texture Marmo"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.03] mix-blend-screen pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-8 md:px-16 relative z-10 text-center flex flex-col items-center">
        <p className="phil-line text-lg md:text-2xl text-zinc-500 font-sans mb-8">
          La maggior parte dell'assistenza legale si concentra su: <span className="line-through opacity-70">approcci ritardatari e standardizzati.</span>
        </p>
        <h2 className="phil-line text-5xl md:text-[5.5rem] leading-[1.1] text-ivory">
          Noi ci concentriamo su:<br />
          <span className="text-drama text-6xl md:text-[7rem] mt-4 block">strategie legali proattive.</span>
        </h2>
      </div>
    </section>
  );
};

// -----------------------------------------------------
// 5. PROTOCOL (Sticking Slider)
// -----------------------------------------------------
const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=100',
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card, {
            scale: 0.95 - (cards.length - i) * 0.02,
            opacity: 0.5 + (i * 0.1),
            filter: 'blur(10px)',
            ease: 'none',
          }),
          scrub: true,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Inquadramento', desc: 'Analisi preliminare dei fatti e studio della documentazione rilevante per calibrare un approccio su misura.', icon: <Activity size={32} className="text-accent" /> },
    { num: '02', title: 'Assetto Strategico', desc: 'Definizione della roadmap procedurale. Valutazione opzioni stragiudiziali o impianto difensivo contenzioso.', icon: <Navigation size={32} className="text-accent" /> },
    { num: '03', title: 'Esecuzione', desc: 'Implementazione vigorosa della strategia. Aggiornamenti costanti in telemetria con il cliente.', icon: <CheckCircle2 size={32} className="text-accent" /> }
  ];

  return (
    <section id="protocol" className="py-24 relative" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-8 relative h-full">
        {steps.map((step, i) => (
          <div key={i} className="protocol-card min-h-[50vh] liquid-glass rounded-[3rem] p-12 mb-16 flex flex-col md:flex-row items-start md:items-center gap-12 static">
            <div className="shrink-0 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-surface/30">
              {step.icon}
            </div>
            <div>
              <div className="font-mono text-accent text-sm mb-4">FASE {step.num}</div>
              <h3 className="text-4xl font-sans font-bold text-white mb-4">{step.title}</h3>
              <p className="text-zinc-400 text-lg max-w-md">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// -----------------------------------------------------
// 6. PRICING / CTA & FOOTER
// -----------------------------------------------------
const FooterCTA = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#0A0A0F] pt-32 pb-12 px-8 md:px-16 mt-24 rounded-t-[4rem] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* CTA Banner */}
        <div className="liquid-glass rounded-[2rem] p-12 mb-24 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Pronto per iniziare?</h2>
          <p className="text-zinc-400 max-w-lg mb-8">Prenota una consultazione iniziale. Esamineremo i dettagli del tuo caso e stabiliremo il protocollo di azione ottimale.</p>
          <button onClick={onOpenModal} className="magnetic-btn bg-accent text-background font-semibold px-10 py-4 rounded-full text-lg">
            Consultazione Strategica
          </button>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/5 pt-12">
          <div className="col-span-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-sans font-bold text-xl text-white mb-4 hover:text-accent transition-colors text-left focus:outline-none block"
            >
              STUDIO LEGALE VILLA
            </button>
            <p className="text-zinc-500 max-w-sm mb-6">Due generazioni di assistenza legale d'eccellenza, operando con rigore, discrezione ed estrema precisione .</p>

            <div className="flex items-center gap-3 border border-white/5 w-fit px-4 py-2 rounded-full bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">System Operational</span>
            </div>
          </div>

          <div>
            <div className="font-bold text-white mb-6">Contatti</div>
            <ul className="text-zinc-400 space-y-3 text-sm">
              <li className="hover:text-accent cursor-pointer transition-colors">Treviglio, Via Alcide De Gasperi 6 (BG)</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Tel: +39 0363 123456</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Email: info@studiolegalevilla.it</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-6">Navigazione</div>
            <ul className="text-zinc-400 space-y-3 text-sm">
              <li><a href="#expertise" className="hover:text-accent transition-colors">Competenze</a></li>
              <li><a href="#philosophy" className="hover:text-accent transition-colors">Visione</a></li>
              <li><a href="#protocol" className="hover:text-accent transition-colors">Protocollo</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex justify-between items-center text-xs text-zinc-600 font-mono">
          <div>&copy; 2026 Studio Legale Villa. Tutti i diritti riservati.</div>
          <div>P.IVA 01234567890</div>
        </div>
      </div>
    </footer>
  );
};

// -----------------------------------------------------
// BOOKING MODAL COMPONENT
// -----------------------------------------------------
const BookingModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    // Chiudi il modal con il tasto ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Al momento simuliamo l'invio perché non c'è ancora un form collegato ad un backend/Formspree.
    // L'azione di default è intercettata e dopo 1.5 secondi diamo il feedback di successo
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setTimeout(() => setStatus('idle'), 500); // Reset del form in backround dopo la chiusura
      }, 3000); // Il modal si chiude da solo dopo 3 secondi dal successo
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Sfondo sfocato */}
      <div
        className="absolute inset-0 bg-[#0D0D12]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Finestra Modal */}
      <div className="liquid-glass border border-white/10 rounded-[2rem] w-full max-w-lg p-8 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">

        {/* Tasto chiusura */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-accent" />
            </div>
            <h3 className="text-3xl font-sans font-bold mb-2 text-white">Ricezione Confermata</h3>
            <p className="text-zinc-400">La sala di controllo ha elaborato la tua richiesta. Il nostro apparato ti contatterà al più presto.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-sans font-bold mb-2 flex items-center gap-3 text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse block"></span>
              Pianificazione Strategica
            </h3>
            <p className="text-zinc-400 text-sm mb-8 relative pr-8">
              Inserisci i vettori delle tue coordinate per avviare il protocollo. Il canale è protetto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col items-start text-left">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Identità Primaria</label>
                  <input required type="text" className="w-full bg-[#0A0A0F]/60 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-zinc-600 text-white" placeholder="Nome" />
                </div>
                <div className="space-y-1.5 flex flex-col items-start text-left">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Designazione Familiare</label>
                  <input required type="text" className="w-full bg-[#0A0A0F]/60 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-zinc-600 text-white" placeholder="Cognome" />
                </div>
              </div>

              <div className="space-y-1.5 flex flex-col items-start text-left">
                <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Nodo di Comunicazione</label>
                <input required type="email" className="w-full bg-[#0A0A0F]/60 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-zinc-600 text-white" placeholder="email@dominio.com" />
              </div>

              <div className="space-y-1.5 flex flex-col items-start text-left w-full">
                <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Classificazione Caso</label>
                <div className="relative w-full">
                  <select required className="w-full bg-[#0A0A0F]/60 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors text-zinc-300 appearance-none">
                    <option value="" disabled selected>Seleziona un settore di intervento</option>
                    <option value="civile">Diritto Civile & Contrattualistica</option>
                    <option value="penale">Diritto Penale & Protezione</option>
                    <option value="costituzionale">Diritto Costituzionale / Lavoro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 flex flex-col items-start text-left">
                <label className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Brief di Telemetria (Opzionale)</label>
                <textarea rows="3" className="w-full bg-[#0A0A0F]/60 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-zinc-600 text-zinc-300" placeholder="Fornisci una sintesi delle motivazioni della richiesta..."></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full magnetic-btn bg-accent text-background font-semibold px-6 py-4 rounded-xl text-sm mt-4 disabled:opacity-70 flex justify-center items-center transition-all group"
              >
                {status === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="flex items-center gap-2">
                    Avvia Autorizzazione <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>

            {/* Footer Form */}
            <div className="mt-6 flex justify-center items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase tracking-widest border-t border-white/5 pt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse"></span>
              Connessione SSL Blindata
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Blocca lo scroll del body quando il modale è aperto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <div className="bg-background min-h-screen text-ivory">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Features />
      <Philosophy />
      <Protocol />
      <FooterCTA onOpenModal={() => setIsModalOpen(true)} />

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
