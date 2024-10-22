import styles from "./Footer.module.css";
import { HeadLines } from "@niklaspelli/fwk4-23-components";
const Footer = () => {
  const subSubTitle = "Information:";
  return (
    <footer className={styles.footer}>
      <HeadLines className={styles.headLine} subTitle={"I-organize"} />
      <h3 className="subsubtitle">{subSubTitle}</h3>
      <a
        href="https://github.com/Niklaspelli/fwk4-23-components"
        target="_blank"
      >
        - about Components
      </a>
      <a href="https://github.com/Monchekin/fwk4-23-frontend" target="_blank">
        - about Frontend
      </a>
    </footer>
  );
};

export default Footer;
