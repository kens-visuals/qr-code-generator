// NOTE: change class names to start with Footer

import './Footer.css';

export default function Footer() {
  return (
    <footer className="Footer-attribution">
      Challenge by{' '}
      <a
        className="Footer-attribution--link"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{' '}
      <a
        className="Footer-attribution--link"
        href="https://github.com/kens-visuals"
        target="_blank"
        rel="noreferrer"
      >
        Kens-Visuals
      </a>
      .
    </footer>
  );
}
