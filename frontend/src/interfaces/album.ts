export interface displayedAlbums {
  name: string;
  id: number;
  parent: {
    id: number;
    name: string;
    parent: number;
  };
}
