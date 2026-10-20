import { Link } from 'react-router-dom';

export default function InfoPageLayout({ title, intro, children }) {
  return (
    <article className="info-page">
      <Link to="/informacion" className="info-page__back">← Centro de información</Link>
      <h1>{title}</h1>
      {intro && <p className="info-page__intro">{intro}</p>}
      {children}
    </article>
  );
}