import * as React from "react";
import styles from "./dashboard.module.css";
import { listallTvShows, listShowsBySearch } from "../../services/api";
import useDebounce from "../../shared/hooks/useDebounceHook";
import { TVShow, TVShowDetailValues, TVShowDetails } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  recievedGeneres,
  recievedShowList,
  updateError,
  updateSearchString,
} from "../../store/showSlice";
import ShowList from "./show-list";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

type ShowList = TVShowDetails & TVShowDetailValues;

const Dashboard: React.FC = () => {
  //intialise values
  const dispatch = useAppDispatch();

  //state values
  const genereList = useAppSelector((state) => state.tvshow.generesList);
  const showList = useAppSelector((state) => state.tvshow.showList);
  const searchText = useAppSelector((state) => state.tvshow.searchString);
  const error = useAppSelector((state) => state.tvshow.error);
  //useStates
  const [searchQuery, setSearchQuery] = useState<string>(searchText);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchQuery, 500);

  //use effects
  useEffect(() => {
    if (!searchQuery) {
      getAllshows();
    }
  }, []);

  useEffect(() => {
    if (!debouncedValue && !searchQuery) {
      getAllshows();
      dispatch(updateSearchString(""));
    } else {
      if (searchQuery != searchText) {
        getShowsBySearch(debouncedValue);
        dispatch(updateSearchString(debouncedValue));
      }
    }
  }, [debouncedValue]);

  // api integration methods
  const getAllshows = async () => {
    try {
      setLoading(true);
      const tvShowsList: TVShowDetailValues[] = await listallTvShows();
      getGeneres(tvShowsList as ShowList[]);
      getShowList(tvShowsList as ShowList[]);
    } catch (error) {
      dispatch(updateError(true));
    } finally {
      setLoading(false);
    }
  };

  const getShowsBySearch = async (searchValue: string) => {
    try {
      setLoading(true);
      const tvShowsList: TVShowDetails[] = await listShowsBySearch(searchValue);
      getGeneres(tvShowsList as ShowList[]);
      getShowList(tvShowsList as ShowList[]);
    } catch (error) {
      dispatch(updateError(true));
    }
    finally{
      setLoading(false);
    }
  };

  // helper methods

  const getGeneres = (tvShowsList: ShowList[]) => {
    const generreList = tvShowsList.reduce(
      (genereList: string[], tvShowsListValue: ShowList) => {
        if (tvShowsListValue?.show?.genres ?? tvShowsListValue?.genres) {
          genereList.push(
            ...(tvShowsListValue?.show?.genres ?? tvShowsListValue?.genres)
          );
        }
        return genereList;
      },
      []
    );
    dispatch(recievedGeneres([...new Set(generreList)]));
  };

  const getShowList = (tvShowsList: ShowList[]) => {
    const showList: TVShow[] = tvShowsList.map((tvShowsListValue: ShowList) => {
      return {
        showName: tvShowsListValue?.show?.name ?? tvShowsListValue?.name,
        showImage: tvShowsListValue?.show?.image ?? tvShowsListValue?.image,
        ratings:
          tvShowsListValue?.show?.rating?.average ??
          tvShowsListValue?.rating?.average,
        summary: tvShowsListValue?.show?.summary ?? tvShowsListValue?.summary,
        runtime: tvShowsListValue?.show?.runTime ?? tvShowsListValue?.runTime,
        genereList: tvShowsListValue?.show?.genres ?? tvShowsListValue?.genres,
        id: tvShowsListValue?.show?.id ?? tvShowsListValue?.id,
        officialSite:
          tvShowsListValue?.show?.officialSite ??
          tvShowsListValue?.officialSite,
        status: tvShowsListValue?.show?.status ?? tvShowsListValue?.status,
        schedule:
          tvShowsListValue?.show?.schedule ?? tvShowsListValue?.schedule,
      } as TVShow;
    });
    dispatch(recievedShowList(showList));
  };

  return (
    <article className={styles.dashboardWrapper}>
      <section className={styles.inputWrapper}>
        <input
          data-testid="search-bar"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search your favourite tv show"
          className={styles.searchInput}
        ></input>
      </section>
      {loading && (
        <div  className={styles.loaderWrapper}>
          <Circles
            height="80"
            width="80"
            color="#A8CABA"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          ></Circles>
        </div>
      )}
      {error && (
        <section className={styles.noResults}>
          <div className={styles.noResultsData}>
            <img src={"assets/images/error.png"}></img>
          </div>
        </section>
      )}
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
            <img
              src={"assets/images/welcome.png"}
              className={styles.welcomeImg}
            ></img>
            <span
              className={styles.noDataMessage}
              data-testid="welcome-message"
            >
              You can search for your favourite TV shows here!
            </span>
          </div>
        </section>
      )}
    </article>
  );
};

export default Dashboard;
