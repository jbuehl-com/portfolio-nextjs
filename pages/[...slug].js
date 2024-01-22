'use static'
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import { useIsomorphicLayoutEffect } from '../helpers/isomorphicEffect';
import {
  animateCssVarCols
} from '../components/animations';

export default function Page({ story }) {
  story = useStoryblokState(story);

    let col = {
      accent: 'rgba(255, 94, 233, 1)',
      type: '#000',
      background: 'transparent',
      logo: 'rgba(255, 94, 233, 1)',
      nav: '#B3B3B3'
    }
    if (story.content && story.content.colAccent) {
      col = {
        accent: story.content.colAccent.color.length > 0 ? story.content.colAccent.color : 'rgba(255, 94, 233, 1)',
        type: story.content.colType.color.length > 0 ? story.content.colType.color : '#000',
        background: story.content.colBackground.color.length > 0 ? story.content.colBackground.color : 'transparent',
      }
      col.logo = story.content.colLogo.color.length > 0 ? story.content.colLogo.color : col.accent
      col.nav = story.content.colNav.color.length > 0 ? story.content.colNav.color : '#B3B3B3'
    }

  useIsomorphicLayoutEffect(() => {
    if (col) {
      animateCssVarCols(col.background, col.logo, col.type, col.accent, col.nav);
    }
  }, [])

  return (
    <StoryblokComponent
      blok={story.content}
      color={col}
    />
  );
}


export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";
  // path for the config slug (in every root a config is needed)
  let configSlug = slug.split('/')[0] + '/config'


  console.log('slug', slug)
  console.log('configSlug', configSlug)

  let sbParams = {
    version: process.env.SB_DATA_VERSION,
    resolve_links: "url",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  console.log('data ' + JSON.stringify(data))
  console.log('completeConfigSlug  ' + 'cdn/stories/' + configSlug)
  let { data: config } = await storyblokApi.get('cdn/stories/' + configSlug, sbParams);
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/", {
    version: 'draft'
  });

  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}