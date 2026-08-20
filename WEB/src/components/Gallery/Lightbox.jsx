import { useEffect } from "react";

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, index, items.length, onClose, onNavigate]);

  return (
    <div className={`lightbox${open ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <span className="lightbox-close" onClick={onClose}>
        ✕
      </span>
      <span
        className="lightbox-nav lightbox-prev"
        onClick={() => onNavigate((index - 1 + items.length) % items.length)}
      >
        ‹
      </span>
      <img src={item?.src} alt={item?.alt ?? ""} />
      <span
        className="lightbox-nav lightbox-next"
        onClick={() => onNavigate((index + 1) % items.length)}
      >
        ›
      </span>
      <div className="lightbox-cap">{item?.lightboxCap ?? ""}</div>
    </div>
  );
}
