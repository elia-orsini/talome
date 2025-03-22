import { SanityDocument } from "next-sanity";
import { IMedia } from "./IMedia";

export interface IProject extends SanityDocument {
  title: string;
  client: string;
  type: { name: string }[];
  services: { name: string }[];
  media: IMedia[];
  publishedAt: string;
}
