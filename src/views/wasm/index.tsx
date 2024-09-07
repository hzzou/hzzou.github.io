import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.scss";
import {Universe} from "wasm-game";

const Wasm: React.FC = () => {
  const [text, SetText] = useState("");
  const universe = Universe.new();
  const preRef = useRef('');

  const renderLoop = ()=>{
    let value = universe.render();
    //universe.tick();
    SetText(value);

    requestAnimationFrame(renderLoop);
  }

  useEffect(() => {
    requestAnimationFrame(renderLoop);
  }, []);

  return(
    <div id={styles.wasm}>
      <pre id={styles.pre_canvas}>{text}</pre>
    </div>
  )
};

export default Wasm;
