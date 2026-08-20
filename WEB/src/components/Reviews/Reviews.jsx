import { useState } from "react";
import { reviewsSection } from "../../data/content.js";
import useInView from "../../hooks/useInView.js";
import "./Reviews.css";

const INITIAL_COUNT = 3;

export default function Reviews() {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView();

  const visibleItems = expanded ? reviewsSection.items : reviewsSection.items.slice(0, INITIAL_COUNT);
  const hasMore = reviewsSection.items.length > INITIAL_COUNT;

  return (
    <section ref={ref} className={`section section-alt reveal${inView ? " in-view" : ""}`} id="testimonials">
      <div className="container">
        <p className="eyebrow">{reviewsSection.eyebrow}</p>
        <h2>{reviewsSection.heading}</h2>
        <div className="divider"></div>
      </div>
      <div className="container reviews-body">
        <div className="review-grid">
          {visibleItems.map((review, i) => {
            const isInitial = i < INITIAL_COUNT;
            return (
            <div
              className={
                isInitial
                  ? `review-card glass-panel stagger-item${inView ? " in-view" : ""}`
                  : "review-card glass-panel review-card-enter"
              }
              key={review.name}
              style={
                isInitial
                  ? { transitionDelay: inView ? `${i * 90}ms` : "0ms" }
                  : { animationDelay: `${(i - INITIAL_COUNT) * 90}ms` }
              }
            >
              <div className="stars">{"★".repeat(review.stars)}</div>
              <div className="quote-wrap">
                <p className="quote">{review.quote}</p>
              </div>
              <div className="review-foot">
                <div className="review-avatar">{review.avatar}</div>
                <div className="review-who">
                  <div className="name">{review.name}</div>
                  <div className="loc">{review.loc}</div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        {hasMore && (
          <div className="center reviews-more">
            <button className="btn btn-solid" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Show Fewer Reviews" : "Load More Reviews"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
