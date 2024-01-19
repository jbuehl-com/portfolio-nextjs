/** 1. Tag it as a client component */
"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import PageFullWidth from "./mod/mod-pageFullWidth"
import PageTwoColumns from "./mod/mod-pageTwoColumns"
import ModAsset from "./mod/mod-asset"
import Text from "./mod/mod-text"
import LegendContainer from "./mod/mod-legendContainer"
import LegendElement from "./mod/mod-legendElement"
import Config from "./config"
import HeaderMenu from "./nav-headerMenu"
import MenuLink from "./nav-menuLink"

const components = {
  pageTwoColumns: PageTwoColumns,
  "page-fullwidth": PageFullWidth,
  modAsset: ModAsset,
  text: Text,
  legendContainer: LegendContainer,
  legendElement: LegendElement,
  menuLink: MenuLink,
  "header_menu": HeaderMenu,
};
/** 2. Initialize it as usual */
storyblokInit({
  accessToken: "bdmGtBD36xR4QYTTFHN8Lwtt",
  apiOptions: {
    region: "eu", 
  },
  use: [apiPlugin],
  components
});
export default function StoryblokProvider({ children }) {
  return children;
}