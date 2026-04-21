import { useEffect, useRef, useState } from "react";

export function Audio() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration || 0);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("loadedmetadata", onMeta); };
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause(); else ref.current.play();
    setPlaying(!playing);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="bg-secondary border border-border rounded-2xl p-6">
      <audio ref={ref} src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" preload="metadata" />
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="w-14 h-14 rounded-full bg-mint-gradient text-primary-foreground text-xl flex items-center justify-center shadow-glow shrink-0">
          {playing ? "⏸" : "▶"}
        </button>
        <div className="flex-1">
          <div className="font-bold mb-1">موسيقى تجريبية</div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
            <span>{fmt(time)}</span>
            <div className="flex-1 h-2 bg-card rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
              if (!ref.current || !dur) return;
              const r = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - r.left) / r.width;
              ref.current.currentTime = pct * dur;
            }}>
              <div className="h-full bg-mint-gradient" style={{ width: `${(time / (dur || 1)) * 100}%` }} />
            </div>
            <span>{fmt(dur)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
