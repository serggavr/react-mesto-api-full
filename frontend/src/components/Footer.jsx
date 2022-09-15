import React from 'react';

export default function Footer() {

  const date = new Date().getFullYear()

  return (
    <footer className="footer section">
      <p className="footer__copyright">© {date} Mesto-React Russia</p>
    </footer>
  );
}