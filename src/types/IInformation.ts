import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { SanityDocument } from "next-sanity";
import { IProject } from "./IProject";

export interface IInformation extends SanityDocument {
  bio: string;
  email: string;
  instagram: string;
  projects: IProject[];
  headshot: SanityAsset;
}
