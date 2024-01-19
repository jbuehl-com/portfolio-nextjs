import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const HeaderMenu = ({blok}) => (
    <div id="navigation" {...storyblokEditable({blok})}>
        HEADER MENU
        {blok.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
)
export default HeaderMenu