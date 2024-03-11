import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { TVShow } from "../../types/types";
import styles from "./show-details.module.css";
import * as React from "react";

const ShowDetails = () => {
  const [val] = useSearchParams();
  const [selectedShow, setSelectedShow] = useState<TVShow>();
  const showList = useAppSelector((state) => state.tvshow.showList);
  const navigate = useNavigate();

  useEffect(() => {
    // check id passed and load the show information from store
    const selectedShowId = +(val.get("id") ?? 0);
    if (!selectedShowId) {
      navigate("/");
    }
    setSelectedShow(
      showList.filter(
        (tvShowItem: TVShow) => tvShowItem.id == selectedShowId
      )[0]
    );
  }, [val]);
  return (
    <section className={styles.detailsWrapper} data-testid="details-page">
      <h1 className={styles.showTitle}>{selectedShow?.showName}</h1>
      <section className={styles.detailsSection}>
        <img
          src={selectedShow?.showImage.original}
          className={styles.showImage}
          data-testid="show-image"
        ></img>
        <section className={styles.showInformaton}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: selectedShow?.summary ?? "" }}
          ></div>

          <div className={styles.showDetails}>
            <div className={styles.showDetailValues}>
              <span className={styles.label}>Schedule:</span>
              <span className={styles.values} data-testid="schedule-value">
                {selectedShow?.schedule?.days?.length ?? 0 > 0
                  ? selectedShow?.schedule?.days.join(",")
                  : ["Monday"].join(",")}{" "}
                at{" "}
                {selectedShow?.schedule.time
                  ? selectedShow?.schedule.time
                  : "10:00"}
              </span>
            </div>
            {selectedShow?.genereList && (
              <div className={styles.showDetailValues}>
                <span className={styles.label}>Genere:</span>
                <span className={styles.values} data-testid="genere-value">
                  {selectedShow?.genereList.join(" | ")}
                </span>
              </div>
            )}

            <div className={styles.showDetailValues}>
              <span className={styles.label}>Rating:</span>
              <span className={styles.values}>
                <span className={`fa fa-star ${styles.checked}`}></span>
                <span>
                  {" "}
                  {selectedShow?.ratings ? selectedShow?.ratings : 3}
                </span>
              </span>
            </div>
            {selectedShow?.status && (
              <div className={styles.showDetailValues}>
                <span className={styles.label}>Status:</span>
                <span className={styles.values} data-testid="status-value">
                  {selectedShow?.status}
                </span>
              </div>
            )}
          </div>
        </section>
      </section>
    </section>
  );
};

export default ShowDetails;
