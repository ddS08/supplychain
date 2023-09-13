
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>PharmaChain DApp</title>
        <meta name="description" content="Pharmaceutical Supply Chain DApp" />
      </Head>

      <header>
        <nav>
          <div className="logo">
            <Link href="/">PharmaChain</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Welcome to PharmaChain DApp</h1>
          <p>Revolutionizing Pharmaceutical Supply Chains</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        header {
          width: 100%;
          background-color: #333;
          color: #fff;
          padding: 1rem 0;
        }

        nav {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
        }

        .nav-links li a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links li a:hover {
          color: #f2a900;
        }

        main {
          text-align: center;
          flex-grow: 1;
        }

        .hero {
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center;
          padding: 4rem 0;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .cta-button {
          background-color: #f2a900;
          color: #fff;
          padding: 0.5rem 1rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background-color: #e29600;
        }
      `}</style>
    </div>
  );
}
