import React, { FC, useCallback, useRef, useState } from "react";

const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <button type="button" onClick={showCount}>
        showParentCount
      </button>
    </div>
  );
});
const About: FC = () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert(`Current count is ${count}`);
  }, [count]);

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount((i) => i + 1);
        }}
      >
        Add Count
      </button>

      <p>
        You can click the button to see the number of sub-component renderings
      </p>

      <div style={{ marginTop: 32 }}>
        <h3>Component with useCallback function:</h3>
        {/* use callback function, ExpensiveTree component will re-render on state change */}
        <ExpensiveTree showCount={callbackFn} />
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>Component with useMemoizedFn function:</h3>
        {/* use memoized function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={callbackFn} />
      </div>
    </>
  );
};
export default About;
