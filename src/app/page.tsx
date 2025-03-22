import Navbar from "@/components/Navbar";
import { client } from "@/sanity/client";
import { IProject } from "@/types/IProject";
import { fetchOptions } from "@/constants/constants";

// const PROJECTS_WITH_IMAGES = `*[_type == "homepage"]{media[]{_key, title, style, images[]{asset}, muxvideo{asset->{playbackId}}}}`;

export default async function IndexPage() {
  // const projects = await client.fetch<IProject[]>(PROJECTS_WITH_IMAGES, {}, fetchOptions);
  // const images = projects.map((project) => project.media).flat();

  return (
    <main className="flex h-dvh w-screen flex-col font-semibold sm:h-screen">
      <Navbar />
    </main>
  );
}
