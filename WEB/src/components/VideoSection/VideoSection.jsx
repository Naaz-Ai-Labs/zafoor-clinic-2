import { useRef, useState } from "react";
import useInView from "../../hooks/useInView.js";
import "./VideoSection.css";

function VideoCard({ item, delay, inView }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    const video = videoRef.current;
    if (video) {
      video.setAttribute("controls", "");
      video.play().catch(() => {});
    }
  };

  return (
    <div
      className={`video-card glass-panel stagger-item${inView ? " in-view" : ""}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      <div className="video-wrap" onClick={!playing ? handlePlay : undefined}>
        <video ref={videoRef} preload="none" playsInline>
          <source src={item.src} type="video/mp4" />
        </video>
        <div
          className={`video-cover${playing ? " hidden" : ""}`}
          style={{ backgroundImage: `url('${item.cover}')` }}
        >
          <div className="play-btn">&#9658;</div>
          <span className="cover-label">{item.label}</span>
        </div>
      </div>
    </div>
  );
}

export default function VideoSection({ id, data }) {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={`section reveal${inView ? " in-view" : ""}`} id={id}>
      <div className="container center">
        <p className="eyebrow">{data.eyebrow}</p>
        <h2>{data.heading}</h2>
        <div className="divider"></div>
      </div>
      <div className="container video-section-body">
        <div className="video-grid">
          {data.items.map((item, i) => (
            <VideoCard key={item.src} item={item} inView={inView} delay={(i % 8) * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
