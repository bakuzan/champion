import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import './404.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="NotFound">
      <h1 className="NotFound__Title">Not Found</h1>
      <p className="NotFound__Text">You've taken a wrong turn somewhere...</p>

      <figure className="NotFound__Figure">
        <blockquote>
          <p className="NotFound__Text">
            I knew I should've taken that left turn at Albuquerque.
          </p>
        </blockquote>
        <figcaption>
          — Bugs Bunny, <cite>Looney Tunes</cite>
        </figcaption>
      </figure>

      <div className="ButtonGroup">
        <button
          type="button"
          className="PrimaryButton"
          onClick={() => navigate('/')}
        >
          Return to the landing page
        </button>
      </div>
    </main>
  );
}
