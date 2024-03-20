import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

const MenuLink = ({ blok, number, className, subKey, activePage }) => {

    return (
        <li 
        className={activePage === blok.link.cached_url ? "nav-item is-active " + className : "nav-item not-active " + className}
        key={"li" + subKey}
        >
            <Link
                className={
                    activePage === blok.link.cached_url ? "is-active" : "not-active"}
                href={blok.link.cached_url}
                key={"link" + subKey}
                {...storyblokEditable(blok)}
            >
                {blok.name}
                { number ?
                <div 
                key={"number" + subKey}
                className="nav-item-number">
                    {number}
                </div>
                : false}
            </Link>
        </li>
    )
};
export default MenuLink