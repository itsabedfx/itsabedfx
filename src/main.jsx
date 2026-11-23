import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import content from './content.json';
import avatarImage from './assets/avatar.jpg';
import portfolioCover from './assets/portfolio-cover.jpg';
import './styles.css';


const icons = {
  instagram: <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />,
  behance: <path d="M3 4h8c3 0 4.7 1.4 4.7 4 0 1.5-.7 2.5-2 3.1 2 .5 3.1 1.9 3.1 3.8 0 3-2.3 5.1-5.7 5.1H3V4Zm3 2.5v3.5h4.3c1.4 0 2.3-.6 2.3-1.8 0-1.2-.9-1.7-2.2-1.7H6Zm0 6v4h4.8c1.5 0 2.5-.7 2.5-2 0-1.4-1-2-2.5-2H6ZM17 5h6v2h-6V5Zm3 5c3.1 0 5 2.3 5 5.3v.7h-7.3c.2 1.4 1.1 2.2 2.5 2.2.9 0 1.6-.4 1.9-1.1h2.6c-.6 2-2.4 3.3-4.7 3.3-3.1 0-5.1-2.1-5.1-5.2 0-3 2-5.2 5.1-5.2Zm-2.3 3.9h4.5c-.1-1.2-.9-1.9-2.2-1.9-1.2 0-2.1.7-2.3 1.9Z" />,
  pinterest: <path d="M12 2a10 10 0 0 0-3.7 19.3c-.1-.8-.2-2 0-2.8l1.4-5.7s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1.1 4.1-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-4.9-4.8-3.3 0-5.3 2.5-5.3 5.1 0 1 .4 2 .8 2.6.1.2.1.4 0 .6l-.3 1.2c-.1.4-.3.4-.6.2-1.5-.7-2.4-2.8-2.4-4.5 0-3.7 2.7-7.1 7.8-7.1 4.1 0 7.3 2.9 7.3 6.8 0 4.1-2.6 7.4-6.1 7.4-1.2 0-2.4-.7-2.8-1.5l-.8 3c-.3 1.1-1 2.4-1.5 3.2A10 10 0 1 0 12 2Z" />,
  linkedin: <path d="M5.2 3a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6 0h3.6v1.7h.1a4 4 0 0 1 3.6-2c3.9 0 4.6 2.4 4.6 5.5V21h-3.8v-5.3c0-1.3 0-3-2-3s-2.3 1.4-2.3 2.9V21H9.3V9Z" />,
  mail: <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.3l9 6 9-6V7H3Zm18 10V9.7l-9 6-9-6V17h18Z" />,
  whatsapp: <path d="M12.04 2a9.94 9.94 0 0 0-8.48 15.13L2.1 21.8l4.83-1.27A9.94 9.94 0 1 0 12.04 2Zm0 1.83a8.1 8.1 0 0 1 6.96 12.23 8.1 8.1 0 0 1-9.25 3.64l-.38-.12-3.25.86.87-3.17-.22-.36a8.1 8.1 0 0 1 8.52-12.92Zm4.38 10.14c-.24-.12-1.43-.7-1.65-.78-.22-.08-.18-.36-.1-.51.1-.15.24-.59.73-.73.88-.13.15-.26.17-.49.05-.23-.12-.96-.35-1.83-1.1-.67-.57-1.12-1.27-1.25-1.5-.13-.22-.01-.34.1-.45.1-.1.22-.27.33-.4.11-.14.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.12-.51-1.24-.7-1.7-.18-.43-.37-.37-.5-.38-.14-.01-.3-.01-.46-.01-.16 0-.4.06-.61.29-.22.24-.8.78-.8 1.9 0 1.12.81 2.19.92 2.34.12.15 1.59 2.42 3.88 3.39.54.23.96.37 1.29.47.54.17 1.03.15 1.42.09.43-.06 1.32-.54 1.51-1.06.19-.52.19-.96.13-1.06-.05-.1-.2-.16-.43-.28Z" />
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
