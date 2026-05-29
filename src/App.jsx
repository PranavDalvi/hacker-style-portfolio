import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Observer for active nav links
    const navObserverOptions = {
      threshold: 0.5,
      rootMargin: '-80px 0px -50% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, navObserverOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => navObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = document.getElementById('typed-role');
    if (!el) return;

    const roles = [
      'Full-Stack / Backend Software Engineer',
      'Realtime Systems Enthusiast',
      'API & Infrastructure Builder',
      'Open-Source Contributor'
    ];

    let mounted = true;
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typingSpeed = 60;
    const deletingSpeed = 30;
    const pause = 1400;

    const tick = () => {
      if (!mounted) return;
      const current = roles[roleIndex];
      if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, pause);
          return;
        }
        setTimeout(tick, typingSpeed);
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, deletingSpeed);
      }
    };

    const startTimer = setTimeout(tick, 300);

    return () => {
      mounted = false;
      clearTimeout(startTimer);
    };
  }, []);

  useEffect(() => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.bar-fill').forEach(el => {
            const level = el.getAttribute('data-level') || '0';
            el.style.width = `${level}%`;
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });

    obs.observe(skillsSection);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="portfolio">
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <span className="logo">pranav.dalvi<span className="cursor">_</span></span>
            <div className="nav-links">
              <a href="#experience">experience</a>
              <a href="#projects">projects</a>
              <a href="#skills">skills</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero reveal">
        <div className="container">
          <div className="hero-content">
            <h1 className="name">Pranav Dalvi</h1>
            <h2 className="title"><span id="typed-role" aria-live="polite"></span><span id="role-cursor" className="cursor">_</span></h2>
            <p className="summary">
              Software Engineer experienced in building REST APIs, real-time dashboards, and data-driven web applications using Node.js, MongoDB, React, and Next.js.
            </p>
            <div className="hero-links">
              <a href="mailto:pranav.dalvi@zohomail.in" className="btn">Email</a>
              <a href="https://github.com/PranavDalvi" target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href="https://linkedin.com/in/pranav-dalvi-03947a207/" target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="experience" className="container reveal">
          <h2 className="section-title">Experience</h2>
          
          <div className="card reveal stagger-1">
            <div className="card-header">
              <h3>Software Engineer — Excellitude Pvt Ltd</h3>
              <span className="date">April 2024 - Present</span>
            </div>
            <p className="role-desc">Full Stack Engineer responsible for building APIs and real-time analytics features for internal platforms.</p>
            <ul className="details">
              <li><strong>InLuna:</strong> Designed RESTful JSON APIs and built a real-time analytics dashboard using WebSockets.</li>
              <li><strong>Droolin:</strong> Developed backend APIs for capturing guest interaction events and built real-time dashboards with Next.js.</li>
              <li>Deployed and maintained services on AWS EC2 with NGINX.</li>
            </ul>
          </div>

          <div className="card reveal stagger-2">
            <div className="card-header">
              <h3>Backend Developer (Intern) — IIT Bombay</h3>
              <span className="date">Aug 2023 – Jan 2024</span>
            </div>
            <p className="role-desc">Maintained and optimized Python-based OCR and multilingual translation pipelines.</p>
            <ul className="details">
              <li>Improved OCR reliability to 95%+ and refactored logic for 75% better accuracy.</li>
              <li>Developed Python utilities and batch-processing tools using Pandas.</li>
            </ul>
          </div>
        </section>

        <section id="projects" className="container reveal">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="card reveal stagger-1">
              <h3>Dvimaya</h3>
              <p>ML-Powered Malware Detection System. Achieved ~84% classification accuracy across benign and malicious samples.</p>
              <div className="card-footer">
                <span className="badge">Python</span>
                <span className="badge">ML</span>
                <span className="badge">CNN</span>
              </div>
            </div>
            <div className="card reveal stagger-2">
              <h3>InLuna</h3>
              <p>Phishing Detection Platform. Real-time analytics dashboard with WebSockets and Node.js backend.</p>
              <div className="card-footer">
                <span className="badge">Node.js</span>
                <span className="badge">WebSockets</span>
                <span className="badge">MongoDB</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="container reveal">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-group reveal stagger-1">
              <h4>Languages & Frontend</h4>
              <div className="skill-bars">
                <div className="skill">
                  <div className="skill-meta"><span>JavaScript</span><span>90%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="90"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>React.js</span><span>85%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="85"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>Next.js</span><span>75%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="75"></div></div>
                </div>
              </div>
            </div>

            <div className="skill-group reveal stagger-2">
              <h4>Backend & Database</h4>
              <div className="skill-bars">
                <div className="skill">
                  <div className="skill-meta"><span>Node.js</span><span>88%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="88"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>Express.js</span><span>82%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="82"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>MongoDB</span><span>78%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="78"></div></div>
                </div>
              </div>
            </div>

            <div className="skill-group reveal stagger-3">
              <h4>Tools & Cloud</h4>
              <div className="skill-bars">
                <div className="skill">
                  <div className="skill-meta"><span>AWS EC2</span><span>80%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="80"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>Docker</span><span>78%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="78"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>NGINX</span><span>70%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="70"></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container">
        <p>&copy; 2026 Pranav Dalvi. Built with React & Revert Aesthetic.</p>
      </footer>
    </div>
  )
}

export default App
