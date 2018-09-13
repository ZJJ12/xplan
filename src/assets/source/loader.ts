import { IMAGE_URLS } from '../ts/constant';
export const loadObject = (Loader: any, imageName: string) => {
  return Loader.load(IMAGE_URLS[imageName]);
}