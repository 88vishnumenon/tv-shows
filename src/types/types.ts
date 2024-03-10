export interface TVShow {
  showName: string;
  showImage: {medium:string,original:string};
  ratings: string;
  summary: string | TrustedHTML;
  runtime: number;
  genereList:string[];
  id:number;
  officialSite:string;
  status:string;
  schedule: { time: string; days: string[] };

}

export interface TVShowDetails {
  score: string;
  show:TVShowDetailValues
}

export interface TVShowDetailValues{
    averageRuntime: number;
    dvdCountry: string;
    ended: string;
    external: { tvRange: number; thetvdb: number; imdb: string };
    genres: string[];
    id: number;
    image: {medium:string,original:string};
    language: string;
    name: string;
    network: {
      id: number;
      name: string;
      officialSite: string;
      country: { name: string; code: string; timezone: string };
    };
    officialSite: string;
    premiered: string;
    rating: { average: string };
    runTime: number;
    schedule: { time: string; days: string[] };
    status: string;
    summary: string;
    type: string;
    updated: number;
    url: string;
    webChannel: string;
    weight: number;
}
