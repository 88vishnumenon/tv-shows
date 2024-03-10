import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { listallTvShows, listShowsBySearch } from "../../services /api";
import useDebounce from "../../shared/hooks/useDebounceHook";
import { TVShow, TVShowDetailValues, TVShowDetails } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { recievedGeneres, recievedShowList, updateError, updateSearchString } from "../../store/showSlice";
import ShowList from "./show-list";
import noData from "../../assets/images/no-data.png";
import welcome from "../../assets/images/welcome.png";

const Dashboard = () => {
    console.log("Dashboard Rendered");
  //intialise values
  const dispatch = useAppDispatch();

  //state values
  const genereList = useAppSelector((state) => state.generesList);
  const showList = useAppSelector((state) => state.showList);
  const searchText = useAppSelector((state) => state.searchString);
  const error = useAppSelector((state) => state.error);
  console.log(genereList);
  //useStates
  const [searchQuery, setSearchQuery] = useState<string>(searchText);
  const debouncedValue = useDebounce(searchQuery, 500);

  //use effects
  useEffect(() => {
    //getAllshows();
  }, []);

  useEffect(() => {
    if(searchQuery != searchText){
    getShowsBySearch(debouncedValue);
    dispatch(updateSearchString(debouncedValue));
    }
  }, [debouncedValue]);



  // api integration methods
  const getAllshows = async () => {
    const tvShowsList:TVShowDetailValues[] = await listallTvShows();
    // getGeneres(tvShowsList);
    // getShowList(tvShowsList);
   // console.log("tvshows", tvShowsList);
  };

  const getShowsBySearch = async (searchValue: string) => {
    try{
    const tvShowsList: TVShowDetails[] = await listShowsBySearch(searchValue);
    getGeneres(tvShowsList);
    getShowList(tvShowsList);
    }
    catch(error){
        dispatch(updateError(true));
    }
  };

  // helper methods

  const getGeneres = (tvShowsList: TVShowDetails[]) => {
    const generreList = tvShowsList.reduce(
      (genereList: string[], tvShowsListValue: TVShowDetails) => {
        if (tvShowsListValue.show.genres ) {
          genereList.push(...tvShowsListValue.show.genres);
        }
        return genereList;
      },
      []
    );
     dispatch(recievedGeneres([...new Set(generreList)]));
  };

  const getShowList = (tvShowsList: TVShowDetails[]) => {
    const showList: TVShow[] = tvShowsList.map(
      (tvShowsListValue: TVShowDetails) => {
        return {
          showName: tvShowsListValue?.show?.name,
          showImage: tvShowsListValue?.show?.image,
          ratings: tvShowsListValue?.show?.rating.average,
          summary: tvShowsListValue?.show?.summary,
          runtime: tvShowsListValue?.show?.runTime,
          genereList: tvShowsListValue?.show?.genres,
          id: tvShowsListValue?.show?.id,
          officialSite: tvShowsListValue?.show?.officialSite,
          status: tvShowsListValue?.show?.status,
          schedule: tvShowsListValue?.show?.schedule,
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
      {
        error &&<section className={styles.noResults}>
        <div className={styles.noResultsData}>
          {/* <img src={noData} style={}></img> */}
          <span className={styles.noDataMessage}>
            Error
          </span>
        </div>
      </section>
      }
      {genereList.length > 0 && showList.length > 0 && !error && (
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
      {showList.length == 0 && searchQuery && !error && (
        <section className={styles.noResults}>
          <div className={styles.noResultsData}>
            {/* <img src={noData} style={}></img> */}
            <span className={styles.noDataMessage}>
              We cannot find the item you are searching for,may be a little
              spelling mistake?
            </span>
          </div>
        </section>
      )}

      {showList.length == 0 && !searchQuery && !error && (
        <section className={styles.noResults}>
          <div className={styles.noResultsData}>
            <img src={welcome} className={styles.welcomeImg}></img>
            <span className={styles.noDataMessage}>
              You can search for your favourite TV shows here!
            </span>
          </div>
        </section>
      )}
    </article>
  );
};

export default Dashboard;
