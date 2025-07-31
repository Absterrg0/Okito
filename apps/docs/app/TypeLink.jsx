'use client'

export default function  TypeLink ({ href, children }) {
    return <a 
      href={href}
      style={{ color: '#ff7f50', textDecoration: 'none', cursor: 'pointer' }}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(href.substring(1))?.scrollIntoView({behavior: 'smooth'});
      }}
    >
      {children}
    </a>
  }