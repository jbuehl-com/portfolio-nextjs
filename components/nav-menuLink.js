import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useRouter } from 'next/router';

const MenuLink = ({ blok, number, className, subKey }) => {

    const router = useRouter();
    const currentRoute = router.asPath;

    return (
        <li 
        className={currentRoute === "/" + blok.link.cached_url ? "nav-item is-active " + className : "nav-item not-active " + className}
        key={"li" + subKey}
        >
            <Link
                className={
                    currentRoute === "/" + blok.link.cached_url ? "is-active" : "not-active"}
                href={blok.link.cached_url}
                key={"link" + subKey}
                {...storyblokEditable(blok)}
            >
                {blok.name}
                { number ?
                <div 
                key={"number" + subKey}
                className="nav-item-number">
                    {number + 1}
                </div>
                : false}
            </Link>
        </li>
    )
};
export default MenuLink