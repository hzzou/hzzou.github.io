import React from "react";
import styles from "./index.module.scss";
import {Calendar} from "hzlzh-react-ui";

const CustCalendar: React.FC = () => {
  const handleSelect = (data)=>{
    console.log("data",data);
  }
  return(
    <div className={styles.calendar}>
      <Calendar onSelectDay={handleSelect} />
    </div>
  )
};
export default CustCalendar;
