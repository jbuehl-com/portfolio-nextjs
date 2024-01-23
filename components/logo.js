import * as React from 'react'
import { forwardRef } from 'react';
import Link from "next/link";

const Logo = forwardRef(function Logo({ menuItems }, ref) {
  return (
    <header ref={ref}>
      <div id="logo" className="logo"><Link href="/">JB</Link></div>
      {/* if menuItems */}
      {menuItems && menuItems.length > 0 (
        <div className="logo__content">
          {menuItems.map((node) => (
            <Link key={node.id} href={'/' + node.slug} activeClassName="is-active">
              {node.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
});

export default Logo
