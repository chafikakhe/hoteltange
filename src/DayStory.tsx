import { useLayoutEffect, useRef, useState } from 'react';
import { Sun } from 'lucide-react';
import { hotel } from './config';

const toMinutes = (time: string) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
const formatTime = (minutes: number) => `${Math.floor(minutes / 60).toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`;
const times = hotel.moments.map(m => toMinutes(m.time));
const slots = [10, 10, 6, 10];

export function DayStory({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLElement>(null);
  const clock = useRef<HTMLDivElement>(null);
  const tracks = useRef<(HTMLSpanElement | null)[]>([]);
  const photos = useRef<(HTMLDivElement | null)[]>([]);
  const progressLine = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(0);
  const currentIndex = useRef(0);

  useLayoutEffect(() => {
    const root = section.current;
    if (!root) return;
    let frame = 0;
    const paint = (progress: number) => {
      const segment = Math.min(times.length - 2, Math.floor(progress * (times.length - 1)));
      const local = progress * (times.length - 1) - segment;
      const minute = times[segment] + (times[segment + 1] - times[segment]) * local;
      const whole = Math.floor(minute + .00001);
      const nowDigits = formatTime(whole).replace(':', '').split('').map(Number);
      if (clock.current) clock.current.setAttribute('aria-label', `Heure : ${formatTime(whole)}`);
      tracks.current.forEach((track, i) => {
        if (track) track.style.transform = `translateY(${-(nowDigits[i] * 100 / (slots[i] + 1))}%)`;
      });
      let index = 0;
      times.forEach((t, i) => { if (whole >= t) index = i; });
      if (currentIndex.current !== index) { currentIndex.current = index; setActive(index); }
      // Each next photograph is revealed upwards during the final third of its interval.
      // Both mask and translation are set directly from scroll, so stopping freezes the reveal.
      photos.current.forEach((photo, i) => {
        if (!photo) return;
        const reveal = i === 0 ? 1 : Math.max(0, Math.min(1, (progress * (times.length - 1) - (i - 1) - .65) / .35));
        photo.style.clipPath = `inset(${(1 - reveal) * 100}% 0 0 0)`;
        const image = photo.firstElementChild as HTMLImageElement | null;
        if (image) image.style.transform = `translateY(${(1 - reveal) * 12}%) scale(1.12)`;
      });
      if (progressLine.current) progressLine.current.style.transform = `scaleX(${progress})`;
    };
    const update = () => {
      frame = 0;
      if (reduced) {
        const p = selected / (times.length - 1);
        paint(p);
        return;
      }
      const travel = root.offsetHeight - window.innerHeight;
      const top = root.getBoundingClientRect().top;
      paint(Math.max(0, Math.min(1, -top / Math.max(1, travel))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [reduced, selected]);

  const goToMoment = (index: number) => {
    if (reduced) { setSelected(index); return; }
    const root = section.current;
    if (!root) return;
    const start = root.getBoundingClientRect().top + window.scrollY;
    const travel = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + travel * index / (times.length - 1) + .5, behavior: 'smooth' });
  };
  const moment = hotel.moments[active];
  return <section id="experiences" ref={section} className={`day-scroll ${reduced ? 'day-reduced' : ''}`} aria-label="Une journée ici">
    <div className="day-section section-pad day-stage">
      <div className="day-top"><p className="eyebrow">03 / UNE JOURNÉE ICI</p><span className="micro">LE SEUL PROGRAMME : LE VÔTRE.</span></div>
      <h2>Du premier rayon<br/><em>aux dernières étoiles.</em></h2>
      <div className="day-grid">
        <div className="day-copy">
          <div className="clock rolling-clock" ref={clock} role="img" aria-label="Heure : 07:30">
            {slots.map((base, i) => <span key={i} className="clock-place" aria-hidden="true">{i === 2 && <span className="clock-colon">:</span>}<span className="clock-window"><span className="clock-track" ref={el => { tracks.current[i] = el; }}>{Array.from({length:base + 1}, (_, n) => <span key={n}>{n % base}</span>)}</span></span></span>)}
          </div>
          <div className="moment-copy"><p className="eyebrow">{moment.tag}</p><h3>{moment.title}</h3><p>{moment.text}</p></div>
          <div className="day-timeline" aria-label="Les moments de la journée"><div className="day-track"><span ref={progressLine}/></div>{hotel.moments.map((m,i) => <button key={m.time} onClick={() => goToMoment(i)} className={active === i ? 'active' : ''} aria-label={`${m.time} ${m.title}`} aria-pressed={active === i}><span/><small>{m.time}</small></button>)}</div>
        </div>
        <div className="day-image day-wipe-images">{hotel.moments.map((m,i) => <div className="day-photo-layer" key={m.time} ref={el => { photos.current[i] = el; }} style={{zIndex:i,clipPath:i === 0 ? 'inset(0)' : 'inset(100% 0 0 0)'}}><img src={m.image} loading="lazy" alt={m.alt} style={{objectPosition:m.position}}/></div>)}<span className="day-counter">0{active + 1} <span>/ 04</span></span><span className="photo-label">UNE JOURNÉE IMAGINÉE · VISUELS D’AMBIANCE</span></div>
      </div>
      <p className="day-foot"><Sun size={14}/>{reduced ? 'Choisissez votre moment.' : 'Votre geste fait avancer les minutes.'}</p>
    </div>
  </section>;
}
