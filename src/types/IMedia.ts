import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { SanityDocument } from "next-sanity";

export interface IMedia extends SanityDocument {
  images: SanityAsset[];
  title: string;
}
