import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { listallTvShows, listShowsBySearch } from "../../services /api";
import useDebounce from "../../shared/hooks/useDebounceHook";
import { TVShow, TVShowDetails } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { recievedGeneres, recievedShowList } from "../../store/showSlice";
import ShowList from "./show-list";

const Dashboard = () => {
  //intialise values
  const dispatch = useAppDispatch();

  //state values
  const genereList = useAppSelector((state) => state.generesList);
  const showList = useAppSelector((state) => state.showList);

  //useStates
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedValue = useDebounce(searchQuery, 500);

  //use effects
  useEffect(() => {
    getAllshows();
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      getShowsBySearch(debouncedValue);
    }
  }, [debouncedValue]);

  // api integration methods
  const getAllshows = async () => {
    const tvShowsList = await listallTvShows();
    console.log("tvshows", tvShowsList);
  };

  const getShowsBySearch = async (searchValue: string) => {
    const tvShowsList: TVShowDetails[] = await listShowsBySearch(searchValue);
    console.log("searchedtvshows", tvShowsList);
    getGeneres(tvShowsList);
    getShowList(tvShowsList);
  };

  // helper methods

  const getGeneres = (tvShowsList: TVShowDetails[]) => {
    const generreList = tvShowsList.reduce(
      (genereList: string[], tvShowsListValue: TVShowDetails) => {
        if (tvShowsListValue.show.genres) {
          genereList.push(...tvShowsListValue.show.genres);
        }
        return genereList;
      },
      []
    );
    console.log("generreList", generreList);
    dispatch(recievedGeneres([...new Set(generreList)]));
  };

  const getShowList = (tvShowsList: TVShowDetails[]) => {
    const showList: TVShow[] = tvShowsList.map(
      (tvShowsListValue: TVShowDetails) => {
        return {
          showName: tvShowsListValue.show.name,
          showImage: tvShowsListValue.show.image,
          ratings: tvShowsListValue.show.rating.average,
          summary: tvShowsListValue.show.summary,
          runtime: tvShowsListValue.show.runTime,
          genereList: tvShowsListValue.show.genres,
          id: tvShowsListValue.show.id,
        } as TVShow;
      }
    );
    dispatch(recievedShowList(showList));
  };

  return (
    <article className={styles.dashboardWrapper}>
      <section className={styles.inputWrapper}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            // add type
            setSearchQuery(e.target.value);
          }}
          placeholder="Search"
          className={styles.searchInput}
        ></input>
      </section>
      {genereList && showList && (
        <section className={styles.list}>
          {genereList.map((genereName: string, index: number) => {
            return (
              <ShowList
                genereName={genereName}
                tvShowsList={showList}
                key={index}
              ></ShowList>
            );
          })}
        </section>
      )}
    </article>
  );
};

export default Dashboard;
