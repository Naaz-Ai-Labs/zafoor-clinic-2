import { useRef } from "react";

export default function FAQItem({ faq, open, onToggle }) {
  const answerRef = useRef(null);

  return (
    <div className={`faq-item glass-panel${open ? " open" : ""}`}>
      <button className="faq-q" onClick={onToggle}>
        {faq.q} <span className="faq-icon">+</span>
      </button>
      <div
        className="faq-a"
        ref={answerRef}
        style={{ maxHeight: open ? `${answerRef.current?.scrollHeight ?? 0}px` : "0" }}
      >
        <p>{faq.a}</p>
      </div>
    </div>
  );
}
