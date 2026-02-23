import React, { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';
import { Monitor, Brain, Briefcase, Lightbulb, Shield, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

// --- GLOBAL STYLES & FONTS ---
// Add this to your main CSS file (e.g., index.css) or inject it:
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');
  body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #000; color: #fff; margin: 0; overflow: hidden; }
`;

// --- UI COMPONENTS ---

const VideoBackground: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log('Autoplay prevented:', e));
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari Native HLS Fallback
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log('Autoplay prevented:', e));
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay loop muted playsInline
    />
  );
};

const LiquidCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div 
    className={`relative overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.12)] shadow-none flex flex-col justify-end ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
      backdropFilter: 'blur(24px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
    }}
  >
    <div 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)'
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

const Logo = () => (
  <svg width="129" height="40" viewBox="0 0 129 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.1"/>
    <circle cx="20" cy="20" r="10" fill="white"/>
    <path d="M20 20L30 30" stroke="black" strokeWidth="2"/>
    <text x="50" y="26" fill="white" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>OPTI</text>
  </svg>
);

const Header: React.FC<{ left?: React.ReactNode, center?: React.ReactNode, right?: React.ReactNode }> = ({ left, center, right }) => (
  <div className="absolute top-0 left-0 w-full flex justify-between items-center px-[5.2%] pt-[4%] z-20">
    <div className="flex-1 flex justify-start items-center">{left}</div>
    <div className="flex-1 flex justify-center items-center text-[clamp(12px,1.05vw,20px)] opacity-80">{center}</div>
    <div className="flex-1 flex justify-end items-center text-[clamp(12px,1.05vw,20px)] opacity-80">{right}</div>
  </div>
);

const Footer: React.FC<{ left?: React.ReactNode, center?: React.ReactNode, right?: React.ReactNode }> = ({ left, center, right }) => (
  <div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-[5.2%] pb-[4%] z-20 pointer-events-none">
    <div className="flex-1 flex justify-start items-center text-[clamp(12px,1.05vw,20px)] opacity-60">{left}</div>
    <div className="flex-1 flex justify-center items-center text-[clamp(12px,1.05vw,20px)] opacity-60">{center}</div>
    <div className="flex-1 flex justify-end items-center text-[clamp(12px,1.05vw,20px)] opacity-60">{right}</div>
  </div>
);

// --- SLIDES ---

const CoverSlide = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <VideoBackground src="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
    <Header left={<Logo />} right="Pitch Deck" />
    <div className="relative z-10 flex flex-col items-center justify-center text-center transform -translate-y-[3%]">
      <h1 className="font-bold text-[clamp(32px,5vw,96px)] tracking-[-0.02em] leading-[1.05]">AI-Powered Data Analytics</h1>
      <h2 className="text-[clamp(20px,2.5vw,48px)] opacity-90 mt-[1.5%]">Unlocking Business Potential</h2>
      <p className="text-[clamp(14px,1.25vw,24px)] opacity-75 mt-[2%]">By John Doe</p>
    </div>
    <Footer center="2024" />
  </div>
);

const IntroSlide = () => (
  <div className="relative w-full h-full">
    <VideoBackground src="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" />
    <Header left={<Logo />} center="Pitch Deck" right="Page 001" />
    <div className="relative z-10 px-[5.2%] pt-[14%] w-full h-full flex flex-col">
      <h1 className="font-bold text-[clamp(28px,4vw,64px)] tracking-[-0.02em] leading-[1.05] whitespace-pre-line">
        {"The Rise of AI\nin Data Analytics"}
      </h1>
      <div className="flex mt-[3.5%] gap-[4%] items-start">
        <div className="flex-[0_0_22%] flex flex-col">
          <p className="text-[clamp(13px,1.05vw,20px)] opacity-90 leading-[1.5]">The AI analytics market is experiencing unprecedented growth, rapidly expanding from $150B to new heights.</p>
          <div className="mt-[2%] flex items-end gap-[2%]">
            <span className="font-bold text-[clamp(28px,4vw,64px)] leading-none">$300B</span>
            <span className="text-[clamp(13px,1.05vw,20px)] text-white/80 pb-[2%]">2027</span>
          </div>
        </div>
        <div className="flex-[0_0_38%]">
          <p className="text-[clamp(13px,1.05vw,20px)] opacity-90 leading-[1.5]">
            Businesses across the globe are rapidly adopting AI-driven analysis to transform raw data into actionable insights. By leveraging advanced machine learning algorithms, organizations can now predict market trends, understand consumer behavior with granular precision, and optimize their operational pipelines in real-time, resulting in unprecedented efficiency and strategic advantage.
          </p>
        </div>
        <div className="flex-[0_0_20%] flex flex-col">
          <span className="font-bold text-[clamp(28px,4vw,64px)] leading-none">25–40%</span>
          <p className="text-[clamp(13px,1.05vw,20px)] opacity-90 leading-[1.5] mt-[2%]">Increase in operational efficiency.</p>
          <div className="mt-[4%] w-full h-[60px]">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D2FF55" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#D2FF55" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 40 L0 30 Q 25 10 50 20 T 100 5 L 100 40 Z" fill="url(#grad)" />
              <path d="M0 30 Q 25 10 50 20 T 100 5" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="0" cy="30" r="4" fill="#B750B2" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="5" r="4" fill="#B750B2" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <Footer right="The Rise of AI" />
  </div>
);

const AnalyticsSlide = () => (
  <div className="relative w-full h-full flex flex-col">
    <VideoBackground src="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" />
    <Header left={<Logo />} center="Pitch Deck" right="Page 002" />
    
    <div className="relative z-10 w-full pt-[12%] flex flex-col items-center justify-center">
      <p className="text-[clamp(14px,1.25vw,24px)] opacity-90 mb-[0.5%]">Transforming Data into Intelligence with</p>
      <h1 className="font-bold text-[clamp(28px,4vw,64px)] tracking-[-0.02em] leading-[1.05]">AI-Powered Analytics</h1>
    </div>

    <div className="relative z-10 px-[5.2%] mt-[4%] flex flex-col gap-[clamp(10px,1.5vw,27px)] flex-1 pb-[6%]">
      {/* Top Row: 3 cards */}
      <div className="flex-1 grid grid-cols-3 gap-[clamp(10px,1.5vw,27px)]">
        <LiquidCard className="p-[clamp(20px,2.5vw,48px)]">
          <Monitor className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] mb-[8%] text-white" strokeWidth={1.5} />
          <h3 className="font-bold text-[clamp(18px,1.8vw,36px)] leading-[1.2] mb-[2%]">Advanced Capabilities</h3>
          <p className="text-[clamp(12px,1.05vw,20px)] text-white/80">Real-time processing, predictive analytics, and machine learning.</p>
        </LiquidCard>
        <LiquidCard className="p-[clamp(20px,2.5vw,48px)]">
          <Brain className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] mb-[8%] text-white" strokeWidth={1.5} />
          <h3 className="font-bold text-[clamp(18px,1.8vw,36px)] leading-[1.2] mb-[2%]">Smarter Decision-Making</h3>
          <p className="text-[clamp(12px,1.05vw,20px)] text-white/80">Helping businesses unlock insights and optimize efficiency.</p>
        </LiquidCard>
        <LiquidCard className="p-[clamp(20px,2.5vw,48px)]">
          <Briefcase className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] mb-[8%] text-white" strokeWidth={1.5} />
          <h3 className="font-bold text-[clamp(18px,1.8vw,36px)] leading-[1.2] mb-[2%]">Industry Leader</h3>
          <p className="text-[clamp(12px,1.05vw,20px)] text-white/80">Driving AI-driven data analytics innovation.</p>
        </LiquidCard>
      </div>
      {/* Bottom Row: 2 cards */}
      <div className="flex-1 grid grid-cols-2 gap-[clamp(10px,1.5vw,25px)]">
        <LiquidCard className="p-[clamp(20px,2.5vw,48px)]">
          <Lightbulb className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] mb-[5%] text-white" strokeWidth={1.5} />
          <h3 className="font-bold text-[clamp(18px,1.8vw,36px)] leading-[1.2] mb-[2%]">Future-Ready Solutions</h3>
          <p className="text-[clamp(12px,1.05vw,20px)] text-white/80">Empowering organizations to stay competitive in a data-driven world.</p>
        </LiquidCard>
        <LiquidCard className="p-[clamp(20px,2.5vw,48px)]">
          <Shield className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] mb-[5%] text-white" strokeWidth={1.5} />
          <h3 className="font-bold text-[clamp(18px,1.8vw,36px)] leading-[1.2] mb-[2%]">Scalable & Secure</h3>
          <p className="text-[clamp(12px,1.05vw,20px)] text-white/80">Ensuring seamless AI integration with robust data protection.</p>
        </LiquidCard>
      </div>
    </div>
  </div>
);

const QuoteSlide = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <VideoBackground src="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" />
    <div className="relative z-10 max-w-[70%] flex flex-col items-center text-center gap-[12px]">
      <span className="text-[clamp(14px,1.2vw,20px)] opacity-90 uppercase tracking-widest font-medium">Andrew Ng</span>
      <h2 className="font-bold text-[clamp(28px,4vw,64px)] tracking-[-0.02em] leading-[1.15]">
        “Artificial Intelligence is the new electricity.”
      </h2>
    </div>
  </div>
);

const OutroSlide = () => (
  <div className="relative w-full h-full flex items-center">
    <VideoBackground src="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" />
    <Header left={<Logo />} center="Pitch Deck" right="Page 020" />
    <div className="relative z-10 px-[5.2%] w-full">
      <h1 className="font-bold text-[clamp(28px,4vw,64px)] tracking-[-0.02em] leading-[1.05] whitespace-pre-line">
        {"Contact Information &\nFinal Call to Action"}
      </h1>
      <p className="text-[clamp(13px,1.05vw,20px)] opacity-90 max-w-[38%] mt-[3%] leading-[1.5]">
        Ready to transform your data into actionable intelligence? Get in touch with our team of AI specialists today and begin your journey towards a smarter, data-driven future.
      </p>
      
      <div className="flex flex-col gap-[clamp(12px,1.2vw,19px)] mt-[3%]">
        <div className="flex items-center gap-[16px]">
          <svg className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          <span className="text-[clamp(13px,1.05vw,20px)]">http://Instagram.com/grapho</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <svg className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          <span className="text-[clamp(13px,1.05vw,20px)]">http://Facebook.com/grapho</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <Phone className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" strokeWidth={1.5} />
          <span className="text-[clamp(13px,1.05vw,20px)]">+1 (415) 987-6543</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <Mail className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" strokeWidth={1.5} />
          <span className="text-[clamp(13px,1.05vw,20px)]">contact@optimalai.com</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <MapPin className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" strokeWidth={1.5} />
          <span className="text-[clamp(13px,1.05vw,20px)]">Headquarters: San Francisco, CA, USA</span>
        </div>
      </div>
    </div>
  </div>
);

// --- PRESENTATION FRAMEWORK ---

const Presentation: React.FC<{ slides: React.ReactElement[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = useCallback(() => setCurrentSlide(c => Math.min(c + 1, slides.length - 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide(c => Math.max(c - 1, 0)), []);
  
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); nextSlide(); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); prevSlide(); }
      if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); }
      if (e.key === 'Escape' && isFullscreen) { document.exitFullscreen(); }
    };
    
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen]);

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setControlsVisible(false), 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black text-white"
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
    >
      {/* Slides rendered with absolute positioning and transition */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isPast = index < currentSlide;
        const scale = isActive ? 'scale-100' : isPast ? 'scale-95' : 'scale-105';
        const opacity = isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
        
        return (
          <div 
            key={index} 
            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out origin-center ${opacity} ${scale}`}
          >
            {slide}
          </div>
        );
      })}

      {/* Auto-hiding Controls Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-50 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Top-right hint */}
        <div className="absolute top-[4%] right-[5.2%] text-[11px] text-white/40 tracking-wide">
          ← → Navigate · F Fullscreen
        </div>

        {/* Bottom Nav Bar */}
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 flex items-center justify-between px-6 py-3 rounded-full border border-white/12 bg-white/5 backdrop-blur-[24px] saturate-[1.4] pointer-events-auto min-w-[300px]">
          
          <div className="text-[13px] tabular-nums text-white/50 min-w-[40px]">
            {currentSlide + 1} / {slides.length}
          </div>

          <div className="flex gap-2 items-center mx-6">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-[6px] rounded-full transition-all duration-300 ${i === currentSlide ? 'w-[24px] bg-white/90' : 'w-[6px] bg-white/30'}`} 
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-white/50">
            <button onClick={prevSlide} className="p-1.5 rounded-full hover:bg-white/10 hover:text-white/90 transition-colors" disabled={currentSlide === 0}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextSlide} className="p-1.5 rounded-full hover:bg-white/10 hover:text-white/90 transition-colors" disabled={currentSlide === slides.length - 1}>
              <ChevronRight size={18} />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button onClick={toggleFullscreen} className="p-1.5 rounded-full hover:bg-white/10 hover:text-white/90 transition-colors">
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP ENTRY POINT ---

const App = () => {
  useEffect(() => {
    // Inject custom Google Font on mount
    const style = document.createElement('style');
    style.innerHTML = fontStyle;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); }
  }, []);

  const slides = [
    <CoverSlide key="cover" />,
    <IntroSlide key="intro" />,
    <AnalyticsSlide key="analytics" />,
    <QuoteSlide key="quote" />,
    <OutroSlide key="outro" />
  ];

  return <Presentation slides={slides} />;
};

export default App;
