import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import Slider from "@/components/Slider";
import LandingInfo from "@/components/LandingInfo";
import ILandingInfo from "@/types/ILandingInfo";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

const LANDING_INFO = `*[_type == "landingInformation"]{statement, email, instagram}`;
const LANDING_CAROUSEL = `*[_type == "landingCarousel"]{images[]}`;

export default async function IndexPage() {
  const landingInfo = await client.fetch<ILandingInfo[]>(LANDING_INFO, {}, fetchOptions);
  const landingCarousel = await client.fetch<SanityAsset[]>(LANDING_CAROUSEL, {}, fetchOptions);

  return (
    <main className="flex h-dvh w-screen flex-col justify-between font-semibold sm:h-screen">
      <LandingInfo info={landingInfo[0]} />

      <Slider mediaList={landingCarousel[0].images} />
    </main>
  );
}
