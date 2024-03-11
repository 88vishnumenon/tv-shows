//Imports
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import * as React from "react";

const Header = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const shouldShowHomeBtn = path == "/showDetails";
  //dom methods
  const toHomePage = () => {
    navigate({
      pathname: "/",
    });
  };
  return (
    <section className={styles.header}>
      {shouldShowHomeBtn && (
        <button
          className={styles.backBtn}
          onClick={() => toHomePage()}
          data-testid="header-home-btn"
        >
          <i className="fa fa-home" aria-hidden="true"></i>
        </button>
      )}
    </section>
  );
};

export default Header;
