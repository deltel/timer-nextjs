"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number | null>(null);

  const handleSecondsChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSeconds(+e.target.value);
  };

  const [intervalId, setIntervalId] = useState<any>(null);

  const clearTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    if (!initialTime) return;

    clearTimer();
    setSeconds(initialTime);
  };

  const setTime = () => {
    setInitialTime(seconds);
  };

  const startTimer = () => {
    if (intervalId) {
      clearTimer();
    }

    const interval = setInterval(
      () => setSeconds((seconds) => seconds - 1),
      1000,
    );
    setIntervalId(interval);
  };

  useEffect(() => {
    if (!intervalId) return;

    if (seconds === 0) {
      clearTimer();
    }
  }, [clearTimer, seconds, intervalId]);

  return (
    <div>
      <main>
        <h1>Timer</h1>
        {intervalId ? (
          <div>
            <div>{seconds}</div>
            <button onClick={clearTimer}>Stop</button>
            {initialTime && <button onClick={reset}>Reset</button>}
          </div>
        ) : (
          <div>
            <input
              type="number"
              name="seconds"
              id="seconds"
              value={seconds}
              onChange={handleSecondsChange}
            />
            {seconds !== 0 && <button onClick={setTime}>Set Time</button>}
            {initialTime && seconds !== 0 && (
              <button onClick={startTimer}>Start</button>
            )}
            {initialTime && <button onClick={reset}>Reset</button>}
          </div>
        )}
      </main>
    </div>
  );
}
