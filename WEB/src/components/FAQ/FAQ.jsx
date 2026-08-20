import { useState } from "react";
import { faqSection } from "../../data/content.js";
import FAQItem from "./FAQItem.jsx";
import useInView from "../../hooks/useInView.js";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={`section section-alt reveal${inView ? " in-view" : ""}`} id="faqs">
      <div className="container center">
        <p className="eyebrow">{faqSection.eyebrow}</p>
        <h2>{faqSection.heading}</h2>
        <div className="divider"></div>
      </div>
      <div className="container faq-body">
        <div className="faq-list">
          {faqSection.items.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
