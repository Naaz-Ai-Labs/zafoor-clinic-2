import ServiceImage from "./ServiceImage.jsx";

export default function TreatmentModal({ treatment, onClose }) {
  return (
    <div className={`tmodal${treatment ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tmodal-card glass-panel">
        <span className="tmodal-close" onClick={onClose}>
          ✕
        </span>
        <ServiceImage
          src={treatment?.image}
          alt={treatment?.enTitle}
          className="tmodal-img"
          wrapperClassName="tmodal-media"
        />
        <div className="tmodal-body">
          <p className="eyebrow">Treatment</p>
          <h3>{treatment?.enTitle}</h3>
          <p className="tmodal-brief">{treatment?.brief}</p>
          <div className="tmodal-actions">
            <a href="#contact" className="btn btn-solid" onClick={onClose}>
              Book Consultation
            </a>
            <a href="https://wa.me/918940399403" target="_blank" rel="noopener noreferrer" className="btn">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
