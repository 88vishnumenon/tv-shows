//Imports
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
    const navigate = useNavigate();

    //dom methods
    const toHomePage = ()=>{
        navigate({
            pathname: "/",
          });
    }
    return (
        <section className={styles.header}>

         <button className={styles.backBtn} onClick={()=>toHomePage()}>
         <i className="fa fa-home" aria-hidden="true"></i>

         </button>
        </section>
      );
}
 
export default Header;