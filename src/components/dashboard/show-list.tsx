import { TVShow } from "../../types/types";
import styles from "./show-list.module.css";


interface ShowListValues {
  genereName: string;
  tvShowsList: TVShow[];
}
const ShowList: React.FC<ShowListValues> = ({ genereName, tvShowsList }) => {
    console.log("inside show list",tvShowsList);
  return (
    <article>
      <div className={styles.genereName}>{genereName}</div>
      <section className={styles.showWrapper}>
        {tvShowsList.map((tvShowsList: TVShow) => {
          if (tvShowsList.genereList.indexOf(genereName) > -1) {
            return <div className={styles.showItem} key={tvShowsList.id}>
                <img src={tvShowsList?.showImage?.medium} className={styles.showImg}>
                </img>
                <div className={styles.showDetails}>
                    <span>
                        {tvShowsList.showName}
                    </span>
                </div>
                
            </div>;
          }
        })}
      </section>
    </article>
  );
};

export default ShowList;
