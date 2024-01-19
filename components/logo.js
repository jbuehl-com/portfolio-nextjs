import * as React from 'react'
import { forwardRef } from 'react';
import './logo.scss'
import { Link } from "gatsby"
const Logo = forwardRef(function Logo({ menuItems }, ref) {
  return (
    <header ref={ref}>
      <div id="logo" className="logo"><Link to="/">JB</Link></div>
      {/* if menuItems */}
      {menuItems && menuItems.length > 0 (
        <div className="logo__content">
          {menuItems.map((node) => (
            <Link key={node.id} to={'/' + node.slug} activeClassName="is-active">
              {node.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
});

export default Logo
