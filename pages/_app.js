import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import PageFullWidth from "./../components/mod/mod-pageFullWidth"
import PageTwoColumns from "./../components/mod/mod-pageTwoColumns"
import ModAsset from "./../components/mod/mod-asset"
import Text from "./../components/mod/mod-text"
import LegendContainer from "./../components/mod/mod-legendContainer"
import LegendElement from "./../components/mod/mod-legendElement"
import TimelineContainer from "./../components/mod/mod-timelineContainer"
import TimelineElement from "./../components/mod/mod-timelineElement"
import RefDesktopMobile from "./../components/mod/ref-desktop-mobile"
import RefDetailMobile from "./../components/mod/ref-detail-mobile"
import LinkList from "./../components/mod/mod-linkListContainer"
import LinkListElement from "./../components/mod/mod-linkListElement"


import Config from "./../components/config"
import HeaderMenu from "./../components/nav-headerMenu"
import MenuLink from "./../components/nav-menuLink"
import Layout from '../Layouts/Layout';

import '../styles/layout.scss'
import '../styles/nav-main.sass'
import '../components/logo.scss'
import '../components/mod/mod-text.scss'
import '../components/mod/mod-timeline.scss'
import '../components/mod/mod-legend.sass'
import '../components/mod/ref-desktop-mobile.sass'
import '../components/mod/ref-detail-mobile.scss'
import '../components/mod/mod-asset.scss'
import '../components/mod/mod-linkList.scss'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const components = {
  config: Config,
  pageTwoColumns: PageTwoColumns,
  "page-fullwidth": PageFullWidth,
  modAsset: ModAsset,
  text: Text,
  legendContainer: LegendContainer,
  legendElement: LegendElement,
  timelineContainer: TimelineContainer,
  timelineElement: TimelineElement,
  menuLink: MenuLink,
  "header_menu": HeaderMenu,
  refDesktopMobile: RefDesktopMobile,
  refDetailMobile: RefDetailMobile,
  linkListContainer: LinkList,
  linkListElement: LinkListElement,
};
/** 2. Initialize it as usual */
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_SB_TOKEN,
  apiOptions: {
    region: "eu", 
  },
  use: [apiPlugin],
  components
});


export default function App({ Component, pageProps }) {
  // console.log('pageProps', pageProps.config)
    if (!pageProps.config) {
      // if no pageprops defined, we place a placeholder
      pageProps = {
        story: {
          full_slug: 'no-page-props-slug'
        },
        config: {
          name: 'Config',
          content: {
            _uid: '63ff96fd-4ada-41ec-b2bb-9627b9a74399',
            component: 'config',
            header_menu: [ ['Object'], ['Object'], ['Object'], ['Object'] ]
          },
        }
      }
    }
    return (
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
