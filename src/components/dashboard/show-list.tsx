import { createSearchParams, useNavigate } from "react-router-dom";
import { TVShow } from "../../types/types";
import styles from "./show-list.module.css";

interface ShowListValues {
  genereName: string;
  tvShowsList: TVShow[];
}
const ShowList: React.FC<ShowListValues> = ({ genereName, tvShowsList }) => {
  const navigate = useNavigate();

  //dom methods
  const showDetailsPage = (showId: number) => {
    navigate({
      pathname: "/showDetails",
      search: createSearchParams({ id: showId.toString() }).toString(),
    });
  };
  return (
    <article className={styles.showListrows}>
      <div className={styles.genereName}>{genereName}</div>
      <section className={styles.showWrapper}>
        {tvShowsList.map((tvShowsList: TVShow) => {
          if (tvShowsList.genereList.indexOf(genereName) > -1) {
            return (
              <div
                className={styles.showItem}
                key={tvShowsList.id}
                onClick={() => showDetailsPage(tvShowsList.id)}
              >
                <img
                  src={tvShowsList?.showImage?.medium}
                  className={styles.showImg}
                ></img>
                <div className={styles.showDetails}>
                  <span className={styles.title}>{tvShowsList.showName}</span>
                  <section className={styles.showDetailsValues}>
                    {tvShowsList.ratings && (
                      <div className={styles.favouriteSection}>
                        <span className={`fa fa-star ${styles.checked}`}></span>
                        <span> {tvShowsList.ratings}</span>
                      </div>
                    )}
                    <div>
                      <span
                        className={`${styles.genereList} ${
                          tvShowsList.ratings ? styles.genereLeft : ""
                        }`}
                      >
                        {tvShowsList.genereList.join(" | ")}
                      </span>
                    </div>
                  </section>
                </div>
              </div>
            );
          }
        })}
      </section>
    </article>
  );
};

export default ShowList;
