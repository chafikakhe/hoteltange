import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { hotel } from './config';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** A paused video, sought directly from scroll position. No timed playback or scrub easing. */
export function ScrollFilm({ reduced, onArrival }: { reduced: boolean; onArrival: (arrived: boolean) => void }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [distance, setDistance] = useState(2800);

  useLayoutEffect(() => { ScrollTrigger.refresh(); }, [distance, reduced, failed]);

  useLayoutEffect(() => {
    const root = section.current;
    const media = video.current;
    if (!root || !media) return;
    let raf = 0;
    let target = 0;
    let previousArrival: boolean | null = null;
    let start = 0;
    let travel = 2800;
    let disposed = false;
    const seek = () => {
      if (disposed || reduced || failed || !Number.isFinite(media.duration) || media.seeking) return;
      if (Math.abs(media.currentTime - target) > 1 / 48) media.currentTime = target;
    };
    const update = () => {
      raf = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / travel));
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      if (counter.current) counter.current.textContent = `${Math.round(progress * 100).toString().padStart(2, '0')}%`;
      // Keep the entrance centered early, and the welcoming hostess visible on portrait screens.
      media.style.objectPosition = window.innerWidth <= 760 ? `${50 + progress * 22}% 50%` : '50% 50%';
      if (Number.isFinite(media.duration)) {
        target = progress * Math.max(0, media.duration - 1 / 24);
        seek();
      }
      const arrived = reduced || failed
        ? window.scrollY >= start + root.offsetHeight - 2
        : progress >= .999;
      if (arrived !== previousArrival) { previousArrival = arrived; onArrival(arrived); }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    const measure = () => {
      start = root.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(2400, window.innerHeight * hotel.film.scrollScreens);
      setDistance(travel);
      schedule();
    };
    const loaded = () => { setReady(true); schedule(); };
    if (!reduced) media.pause();
    media.addEventListener('loadedmetadata', loaded);
    media.addEventListener('loadeddata', loaded);
    media.addEventListener('seeked', seek);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    if (media.readyState >= 1) loaded();
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      media.removeEventListener('loadedmetadata', loaded);
      media.removeEventListener('loadeddata', loaded);
      media.removeEventListener('seeked', seek);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
    };
  }, [reduced, failed, onArrival]);

  return <section id="film" ref={section} className={`scroll-film ${reduced || failed ? 'film-static' : ''}`}
    style={{ height: reduced || failed ? '100svh' : `calc(100svh + ${distance}px)` }} aria-label="Arrivée à la maison, film au défilement">
    <div className="film-stage">
      <video ref={video} src={hotel.film.src} poster={hotel.film.poster} muted playsInline preload="auto"
        controls={reduced} disablePictureInPicture onError={() => setFailed(true)}
        aria-label="Une avancée à travers les jardins du palais jusqu’à l’hôtesse qui vous accueille à la porte" />
      <div className="film-shade" />
      <div className="film-top"><a href="#film" className="brand" aria-label={`${hotel.name}, début du film`}><span className="brand-icon">☼</span><span>{hotel.name}<small>MAISON D’HOSPITALITÉ · MAROC</small></span></a>
        <a href="#accueil" className="film-skip">Aller à la maison <ArrowUpRight size={15}/></a></div>
      <div className="film-bottom">
        <div className="film-instruction"><ArrowDown size={18}/><span>{failed ? 'Le film est indisponible. La maison vous attend.' : reduced ? 'Découvrez le film à votre rythme.' : ready ? 'Faites défiler. Le voyage suit votre geste.' : 'Le film se prépare…'}<small>{reduced ? 'Lecture manuelle · mouvements réduits' : 'Vous vous arrêtez, le film aussi.'}</small></span></div>
        {!reduced && !failed && <span ref={counter} className="film-count" aria-hidden="true">00%</span>}
      </div>
      {!reduced && !failed && <div className="film-progress" aria-hidden="true"><span ref={bar}/></div>}
    </div>
  </section>;
}

/** Audio starts at the end of the film; browser autoplay refusal always has a visible fallback. */
export function JazzPlayer({ arrived, hidden }: { arrived: boolean; hidden: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const arrivedRef = useRef(arrived);
  const desired = useRef(true);
  const unlocked = useRef(false);
  const fade = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState(false);
  arrivedRef.current = arrived;

  const stop = () => { cancelAnimationFrame(fade.current); audio.current?.pause(); setPlaying(false); };
  const begin = () => {
    const media = audio.current;
    if (!media || !desired.current || document.hidden) return;
    cancelAnimationFrame(fade.current);
    media.volume = 0;
    const attempt = media.play();
    attempt.then(() => {
      if (!arrivedRef.current || !desired.current || document.hidden) { media.pause(); return; }
      unlocked.current = true; setArmed(true); setBlocked(false); setPlaying(true);
      const started = performance.now();
      const step = (now: number) => {
        const amount = Math.min(1, (now - started) / 1600);
        media.volume = hotel.music.volume * amount;
        if (amount < 1) fade.current = requestAnimationFrame(step);
      };
      fade.current = requestAnimationFrame(step);
    }).catch(e => { if (e.name !== 'AbortError') { setBlocked(true); setPlaying(false); } });
  };
  useEffect(() => {
    if (arrived) begin(); else stop();
    return () => cancelAnimationFrame(fade.current);
  }, [arrived]);
  useEffect(() => {
    const visibility = () => { if (document.hidden) stop(); else if (arrivedRef.current && desired.current && unlocked.current) begin(); };
    document.addEventListener('visibilitychange', visibility);
    return () => { document.removeEventListener('visibilitychange', visibility); cancelAnimationFrame(fade.current); audio.current?.pause(); };
  }, []);
  const toggle = () => {
    const media = audio.current;
    if (!media) return;
    if (playing || (armed && !arrived)) {
      desired.current = false; setArmed(false); setBlocked(false); stop(); return;
    }
    desired.current = true; setError(false);
    if (arrived) { begin(); return; }
    // Explicit click primes playback permission, silently, before the arrival point.
    media.volume = 0;
    media.play().then(() => {
      unlocked.current = true; setArmed(true); setBlocked(false);
      if (!arrivedRef.current) { media.pause(); media.currentTime = 0; }
      else begin();
    }).catch(() => { setBlocked(true); });
  };
  const label = error ? 'Jazz indisponible · réessayer' : playing ? 'Jazz · couper le son' : armed ? 'Jazz prêt à l’arrivée' : arrived || blocked ? 'Activer le jazz' : 'Jazz à l’arrivée';
  return <>
    <audio ref={audio} src={hotel.music.src} preload="none" loop onError={() => {setError(true);setPlaying(false);}}/>
    <button className={`jazz-control ${playing ? 'is-playing' : ''} ${arrived ? 'has-dock' : ''}`} hidden={hidden} onClick={toggle} aria-pressed={playing || armed} aria-label={label} title={hotel.music.title}>
      {playing || armed ? <Volume2 size={15}/> : <VolumeX size={15}/>}<span>{label}</span>
      {playing && <span className="sound-bars" aria-hidden="true"><i/><i/><i/></span>}
    </button>
  </>;
}
