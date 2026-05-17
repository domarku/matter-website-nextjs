"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Scene3D from "@/components/Scene3D";
import type { PageFields } from "@/lib/contentful-helpers";
import { SITE_FOOTER_MENU_LINKS } from "@/lib/site-menu-links";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface HeaderProps {
  siteName: string;
  logoUrl?: string;
  navigation: any[];
}

function isCurrentNavPage(slug: string, pathname: string) {
  if (slug === "home") return pathname === "/";
  return pathname === `/${slug}`;
}

export default function Header({ siteName, navigation }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstOverlayLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuWasOpenRef = useRef(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      menuWasOpenRef.current = true;
      queueMicrotask(() => firstOverlayLinkRef.current?.focus());
    } else if (menuWasOpenRef.current) {
      menuWasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container">
        <Link
          href="/"
          className="logo-text"
          aria-label={`${siteName} — home`}
        >
          {siteName}
        </Link>

        <Scene3D className="scene-3d" />

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          <ul>
            {navigation.map((page: any) => {
              const fields = page.fields as unknown as PageFields;
              const slug = fields.slug;
              const href = slug === "home" ? "/" : `/${slug}`;
              const isCurrent = isCurrentNavPage(slug, pathname);
              return (
                <li key={page.sys.id}>
                  <Link
                    href={href}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {fields.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="site-header__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-menu-overlay"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="material-symbols-sharp" aria-hidden>
            {menuOpen ? "close" : "menu"}
          </span>
          <span className="visually-hidden">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
        </button>
      </div>

      <div
        id="site-menu-overlay"
        className="site-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!menuOpen}
      >
        <nav className="site-menu-overlay__nav" aria-label="Site">
          <ul className="site-menu-overlay__list">
            {navigation.map((page: any, navIndex: number) => {
              const fields = page.fields as unknown as PageFields;
              const slug = fields.slug;
              const href = slug === "home" ? "/" : `/${slug}`;
              const isCurrent = isCurrentNavPage(slug, pathname);
              return (
                <li key={page.sys.id}>
                  <Link
                    ref={navIndex === 0 ? firstOverlayLinkRef : undefined}
                    href={href}
                    className="site-menu-overlay__link"
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {fields.title}
                  </Link>
                </li>
              );
            })}
            {navigation.length > 0 && SITE_FOOTER_MENU_LINKS.length > 0 ? (
              <li
                className="site-menu-overlay__separator"
                role="presentation"
                aria-hidden="true"
              />
            ) : null}
            {SITE_FOOTER_MENU_LINKS.map((item, i) => {
              const footerRef =
                navigation.length === 0 && i === 0 ? firstOverlayLinkRef : undefined;
              return (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      ref={footerRef}
                      href={item.href}
                      className="site-menu-overlay__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      ref={footerRef}
                      href={item.href}
                      className="site-menu-overlay__link"
                      aria-current={
                        pathname === item.href ? "page" : undefined
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
