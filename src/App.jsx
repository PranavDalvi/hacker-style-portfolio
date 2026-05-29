import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // nav observer
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
      'Application Security Professional',
      'SAST / DAST / SCA Specialist',
      'Secure Code Reviewer',
      'Bug Bounty Researcher'
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
            <span className="logo">omkar.pawar<span className="cursor">_</span></span>
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
            <h1 className="name">Omkar Pawar</h1>
            <h2 className="title"><span id="typed-role" aria-live="polite"></span><span id="role-cursor" className="cursor">_</span></h2>
            <p className="summary">
              Application Security Professional with 2.7 years of experience in web, API, Android, and network security. Skilled in SAST, DAST, SCA, and secure code reviews, with a proven ability to identify high-impact vulnerabilities. Recognized by the Indian government for responsible disclosure.
            </p>
            <div className="hero-links">
              <a href="mailto:omkarpawar1412@gmail.com" className="btn">Email</a>
              <a href="https://github.com/OmkarPawar14" target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href="https://www.linkedin.com/in/omkar-pawar-6a406b1b4/" target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
              <a href="https://x.com/0xThund3rcl4p" target="_blank" rel="noreferrer" className="btn">X</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="experience" className="container reveal">
          <h2 className="section-title">Experience</h2>

          <div className="card reveal stagger-1">
            <div className="card-header">
              <h3>Associate — PwC India</h3>
              <span className="date">Apr 2025 – present | Mumbai</span>
            </div>
            <p className="role-desc">Led and coordinated Comprehensive Security Review (CSR) projects; performed end-to-end application security testing and SCA.</p>
            <ul className="details">
              <li>Coordinated with senior management and ISD; ensured timely delivery to stakeholders.</li>
              <li>Performed SAST, DAST, API, Mobile, and Network testing following OWASP and SANS methodologies.</li>
              <li>Conducted secure code reviews and software composition analysis to find third-party risks.</li>
              <li>Documented findings with remediation guidance and collaborated with dev teams.</li>
            </ul>
          </div>

          <div className="card reveal stagger-2">
            <div className="card-header">
              <h3>Information Security Analyst — Essential Infosec Pvt Ltd</h3>
              <span className="date">Jul 2023 – Apr 2025</span>
            </div>
            <p className="role-desc">Worked on CERT-IN projects across ESG, stock broker, health and banking sectors; delivered client-ready reports with POCs.</p>
            <ul className="details">
              <li>Applied OWASP Top 10 / SANS 25 standards to strengthen application security.</li>
              <li>Performed SCR & SCA, and worked on UPI and BBPS products.</li>
              <li>Produced detailed impact analysis and remediation steps for clients.</li>
            </ul>
          </div>

          <div className="card reveal stagger-3">
            <div className="card-header">
              <h3>Cyber Security Analyst (Intern) — Audix Technologies India</h3>
              <span className="date">Jan 2023 – Jun 2023</span>
            </div>
            <p className="role-desc">Conducted web and network security testing and delivered remediation reports.</p>
          </div>
        </section>

        <section id="projects" className="container reveal">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            <div className="card reveal stagger-1">
              <h3>AuctionZilla</h3>
              <p>Led the security evaluation for AuctionZilla, an online bidding platform (React.js + Firebase). Identified and helped remediate critical issues.</p>
              <div className="card-footer">
                <span className="badge">Web</span>
                <span className="badge">API</span>
                <span className="badge">Pentest</span>
              </div>
            </div>

            <div className="card reveal stagger-2">
              <h3>Aapi Intelligence Chatbot</h3>
              <p>Secured an AI-based chatbot by identifying input validation and authentication flaws and recommending hardening steps.</p>
              <div className="card-footer">
                <span className="badge">Security</span>
                <span className="badge">AI</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="container reveal">
          <h2 className="section-title">Technical Skills & Tools</h2>
          <div className="skills-container">
            <div className="skill-group reveal stagger-1">
              <h4>Core Skills</h4>
              <div className="skill-bars">
                <div className="skill">
                  <div className="skill-meta"><span>Web Vulnerability Assessment</span><span>90%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="90"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>API Testing</span><span>88%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="88"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>Android App Testing</span><span>80%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="80"></div></div>
                </div>
              </div>
            </div>

            <div className="skill-group reveal stagger-2">
              <h4>Tools & Techniques</h4>
              <div className="skill-bars">
                <div className="skill">
                  <div className="skill-meta"><span>BurpSuite / Nessus</span><span>88%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="88"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>Mobile & Binary Tools</span><span>78%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="78"></div></div>
                </div>
                <div className="skill">
                  <div className="skill-meta"><span>Secure Code Review / SCA</span><span>85%</span></div>
                  <div className="bar"><div className="bar-fill" data-level="85"></div></div>
                </div>
              </div>
            </div>

            <div className="skill-group reveal stagger-3">
              <h4>Other Tools</h4>
              <div className="badges">
                <span className="badge active">Frida</span>
                <span className="badge active">MobSF</span>
                <span className="badge active">Nmap</span>
                <span className="badge active">Wireshark</span>
              </div>
            </div>
          </div>
        </section>

        <section id="certs" className="container reveal">
          <h2 className="section-title">Certificates & Publications</h2>
          <div className="card reveal">
            <ul className="details">
              <li>eMAPT (Mobile Application Penetration Tester)</li>
              <li>eWPTX (Web Application Penetration Tester eXtreme)</li>
              <li>Certified Network Security Practitioner (CNSP)</li>
              <li>ISO/IEC 27001:2022 - Certified Lead Auditor</li>
              <li>Red Teaming LLM Applications</li>
              <li>Offensive Bug Bounty Hunter 2.0</li>
              <li>Publication: Enhancing Cybersecurity: Machine Learning Models for Phishing Website Detection</li>
            </ul>
          </div>
        </section>

        <section id="achievements" className="container reveal">
          <h2 className="section-title">Achievements</h2>
          <div className="card reveal">
            <ul className="details">
              <li>Recognized for responsibly disclosing critical vulnerabilities on an Indian government website (XML-RPC vulnerability, improper error handling / exploitable CVE).</li>
            </ul>
          </div>
        </section>

        <section id="education" className="container reveal">
          <h2 className="section-title">Education</h2>
          <div className="card reveal">
            <h3>Master of Science (Computer Science) — University Of Mumbai</h3>
            <span className="date">2023 – 2025</span>
            <h3>Bachelor of Science (Computer Science) — University Of Mumbai</h3>
            <span className="date">2021 – 2023 | CGPA - 8.40</span>
          </div>
        </section>

        <section id="contact" className="container reveal">
          <h2 className="section-title">Contact & Interests</h2>
          <div className="card reveal">
            <p><strong>Email:</strong> omkarpawar1412@gmail.com</p>
            <p><strong>Phone:</strong> 8291391510</p>
            <p><strong>Interests:</strong> Calligraphy, Reading, Games, Devices</p>
          </div>
        </section>
      </main>

      <footer className="container">
        <p>&copy; 2026 Omkar Pawar. Built with React & Revert Aesthetic.</p>
      </footer>
    </div>
  )
}

export default App
