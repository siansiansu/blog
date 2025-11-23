import React from 'react';
import styles from './styles.module.css';

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://instagram.com/siansiansu',
    icon: 'fab fa-instagram',
    label: 'Instagram',
  },
  {
    href: 'https://threads.net/@siansiansu',
    icon: 'fab fa-threads',
    label: 'Threads',
  },
  {
    href: 'https://x.com/siansiansu',
    icon: 'fab fa-x-twitter',
    label: 'X',
  },
  {
    href: 'https://github.com/siansiansu',
    icon: 'fab fa-github',
    label: 'GitHub',
  },
];

export default function FooterSocialLinks(): JSX.Element {
  return (
    <div className={styles.socialLinks}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={styles.socialLink}>
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
}
