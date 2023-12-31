import Fireworks from "https://esm.sh/@fireworks-js/react";
import type { FireworksHandlers } from "https://esm.sh/@fireworks-js/react";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";
import React, {
  useRef,
  useState,
  FC,
  RefObject,
  Dispatch,
  SetStateAction
} from "https://esm.sh/react@18.2.0";

interface ButtonProps {
  fireworkRef: RefObject<HTMLDivElement>;
}

const App = () => {
  const ref = useRef<FireworksHandlers>(null);

  return (
    <div class="container">
      <Fireworks
        ref={ref}
        options={{
          opacity: 0.5
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed"
        }}
      />
      <div class="btns">
        <Follow fireworkRef={ref} />
        <Fire fireworkRef={ref} />
        <Reset fireworkRef={ref} />
      </div>
    </div>
  );
};

const Reset: FC<ButtonProps> = ({ fireworkRef }) => {
  const resetFireworks = () => {
    fireworkRef.current.stop();
    fireworkRef.current.start();
  };
  return (
    <div class="btn" onClick={resetFireworks}>
      Reset
    </div>
  );
};

const Fire: FC<ButtonProps> = ({ fireworkRef }) => {
  const [fireCount, setFireCount] = useState(1);
  return (
    <div class="btn fire-btn">
      <div
        onClick={() => {
          fireworkRef.current.launch(fireCount);
        }}
      >
        Fire
      </div>
      <input
        min={1}
        max={15}
        type="number"
        class="fire-count"
        value={fireCount}
        onChange={(e: any) => setFireCount(e.target.value)}
      />
    </div>
  );
};

const Follow: FC<ButtonProps> = ({ fireworkRef }) => {
  const [follow, setFollow] = useState(false);
  return (
    <div
      onClick={() => {
        setFollow(!follow);
        if (fireworkRef.current.currentOptions.mouse.move) {
          fireworkRef.current.updateOptions({
            mouse: {
              move: false
            }
          });
        } else {
          fireworkRef.current.updateOptions({
            mouse: {
              move: true
            }
          });
        }
      }}
      class="btn"
    >
      {follow ? "Un-Follow" : "Follow"}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
