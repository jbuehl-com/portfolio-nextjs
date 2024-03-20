import * as React from 'react'
import { forwardRef } from 'react';
import Link from "next/link";

const Logo = forwardRef(function Logo({ menuItems, activePage }, ref) {

  return (
    <header ref={ref}>
      <div id="logo" className="logo"><Link href="/">JB</Link></div>
      {menuItems ?
        <div className="logo__content">
          {menuItems.map((node) => (
            <Link 
            key={node._uid} 
            href={'/' + node.link.cached_url} 
            className={activePage === node.link.cached_url ? "is-active " : "not-active "}
            >
              {node.name}
            </Link>
          ))}
        </div>
        : false}
    </header>
  );
});

export default Logo
