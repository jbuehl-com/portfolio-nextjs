import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
 
export default function Home({ story }) {
  story = useStoryblokState(story);
 
  return (
      <StoryblokComponent blok={story.content} />
  );
}
 
export async function getStaticProps() {
  let slug = "home";
 
  let sbParams = {
    version: "draft", // or 'published'
    resolve_links: "url",
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: config } = await storyblokApi.get('cdn/stories/config');
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
    revalidate: 10,
  };
}