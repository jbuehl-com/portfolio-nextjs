import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useRouter } from 'next/router';

const MenuLink = ({ blok, number }) => {

    const router = useRouter();
    const currentRoute = router.asPath;

    return (

        <li className="nav-item" key={number}>
            <Link className={
                currentRoute === "/" + blok.link.cached_url ? "is-active" : "not-active"
            } href={blok.link.cached_url} {...storyblokEditable(blok)}>
                {blok.name}
                <div className="nav-item-number">{number + 1}</div>
            </Link>
        </li>
    )
};
export default MenuLink