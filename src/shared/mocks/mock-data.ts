import { TVShow } from "../../types/types";

export const mockGenereList: string[] = ["DRAMA", "COMEDY", "THRILLERS"];

export const mockShowList: TVShow[] = [
  {
    showName: "Professor T",
    showImage: {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/482/1205757.jpg",
        "original": "https://static.tvmaze.com/uploads/images/original_untouched/482/1205757.jpg"
      },
    ratings: "7.6",
    summary: "",
    runtime: 60,
    genereList: ["DRAMA", "COMEDY", "THRILLERS"],
    id: 0,
    officialSite: "",
    status: "ENDED",
    schedule: { time: "", days: ["Monday"] },
  },
];





