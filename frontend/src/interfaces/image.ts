export interface ImageType {
  id: number;
  photoData: {
    id: number;
    data: string;
  };
  thumbnailData: {
    id: number;
    data: string;
  };
  description: string;
}

export interface ThumbnailType {
  photoId: number;
  thumbnailData: string;
  tags: string[];
}
