import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import content from './content.json';
import instagramIcon from "./assets/instagram.svg";
import behanceIcon from "./assets/behance.svg";
import pinterestIcon from "./assets/pinterest.svg";
import linkedinIcon from "./assets/linkedin.svg";
import mailIcon from "./assets/mail.svg";
import whatsappIcon from "./assets/whatsapp.svg";
import avatarImage from './assets/avatar.jpg';
import portfolioCover from './assets/portfolio-cover.jpg';
import './styles.css';


const icons = {
  instagram: <img src={instagramIcon} alt="Instagram" />,
  behance: <img src={behanceIcon} alt="Behance" />,
  pinterest: <img src={pinterestIcon} alt="Pinterest" />,
  linkedin: <img src={linkedinIcon} alt="LinkedIn" />,
  mail: <img src={mailIcon} alt="Email" />,
  whatsapp: <img src={whatsappIcon} alt="WhatsApp" />,
};
function Icon({name}) { return <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">{icons[name]}</svg> }
function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), {threshold: 0.13, rootMargin: '0px 0px -8% 0px'});
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
function GlowCard({children, className='', href, revealDelay=0}) {
  const ref = useRef(null);
  const move = e => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const shared = {ref, className:`cell glow-card reveal ${className}`, onPointerMove:move, style:{transitionDelay:`${revealDelay}ms`}};
  return href ? <a {...shared} href={href} target="_blank" rel="noreferrer">{children}</a> : <div {...shared}>{children}</div>;
}
function App() {
  useReveal();
  useEffect(() => {
    const onPointerMove = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onPointerMove, {passive:true});
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);
  return <>
    <div className="crt-scene" aria-hidden="true"><div className="crt-flat"/><div className="crt-bloom"/><div className="crt-floor"><div className="plane"/></div><div className="cursor-bloom"/></div>
    <div className="page">
      <header className="reveal">
        <div className="avatar-frame"><img src={avatarImage} alt="Abed Al-Hamid" /></div>
        <h1>{content.profile.name}</h1>
        <div className="role">{content.profile.role}</div>
        <p className="bio">{content.profile.bio}</p>
        <nav className="socials" aria-label="Social links">
          {content.links.map(link => <a key={link.name} href={link.url} aria-label={link.name} target="_blank" rel="noreferrer"><Icon name={link.icon}/></a>)}
        </nav>
      </header>
      <main className="bento">
        <GlowCard className="featured wide" href={content.portfolio.url} revealDelay={80}>
          <img className="cover" src={portfolioCover} alt="Portfolio 2026 cover" />
          <div className="caption"><div><h2>{content.portfolio.title}</h2><p>{content.portfolio.description}</p></div><div className="tag">VIEW PROJECT ↗</div></div>
        </GlowCard>
        <GlowCard className="intro tall" revealDelay={130}><div><div className="tag">// ABOUT</div><h2 className="section-heading">ABOUT ME</h2></div><p className="big">{content.profile.bio}</p><div className="tag">{content.profile.since}</div></GlowCard>
        {content.links.slice(0,1).map(link => <GlowCard key={link.name} className="accent wide" href={link.url} revealDelay={180}><Icon name={link.icon}/><div><h2>{link.name}</h2><p>@its.abedfx — {link.description}</p></div><div className="tag">{link.label} ↗</div></GlowCard>)}
        {content.links.slice(1,3).map((link,i) => <GlowCard key={link.name} href={link.url} revealDelay={220+i*60}><Icon name={link.icon}/><div><h2>{link.name}</h2><p>{link.description}</p></div><div className="tag">{link.label} ↗</div></GlowCard>)}
        {content.links.slice(3).map(link => <GlowCard key={link.name} href={link.url} revealDelay={320}><Icon name={link.icon}/><div><h2>{link.name}</h2><p>{link.description}</p></div><div className="tag">{link.label} ↗</div></GlowCard>)}
        <GlowCard className="sand contact-card" revealDelay={280}><div><div className="tag">// CONTACT</div><h2 className="section-heading">GET IN TOUCH</h2></div><div className="contact-rows"><a className="contact-row" href={content.contact.whatsapp}><Icon name="whatsapp"/><span>{content.contact.phone}</span></a><a className="contact-row" href={`mailto:${content.contact.email}`}><Icon name="whatsapp"/><span>{content.contact.email}</span></a><a className="contact-row" href={content.contact.instagram}><Icon name="instagram"/><span>DM me on Instagram</span></a></div></GlowCard>
      </main>
      <footer className="reveal">ABED FX · VISUAL IDENTITIES · RETRO TRANSMISSION</footer>
    </div>
    <div className="crt-scanlines" aria-hidden="true"/><div className="crt-vignette" aria-hidden="true"/>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
