import React, { useEffect, useState } from 'react'
import './App.css'
import "../node_modules/flag-icons/css/flag-icons.min.css"

function App() {

  const [data, setData] = useState<{ message: string, flag: string } | null>(null)
  const clock = `${(new Date).toLocaleString('it-IT')} IT`
  const [italianClock, setItalianClock] = useState(clock)
  const baseURL = "http://localhost:3000";
  const eventSource = new EventSource(`${baseURL}/sse`);

  useEffect(() => {
    const fetchData = async () => {

      // eventSource.onmessage = (event) => {
      //   // console.log(event)
      //   setData([...data, event.data])
      // };

      eventSource.addEventListener("time-update", (event) => {
        console.log(event)
        const parsedEvent = JSON.parse(event.data)
        setData({ flag: parsedEvent.flag, message: parsedEvent.message })
        // eventSource.close();
      });

      eventSource.addEventListener("close", (event) => {
        console.log('Received "close" event. Closing connection...');
        eventSource.close();
      });

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
      };
    }
    fetchData()
  }, []);

  setInterval(() => {
    setItalianClock(`${(new Date).toLocaleString('it-IT')} IT`)
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <span className={`fi fi-it`} style={{ width: "6em", lineHeight: "6em" }}></span>
          <h2>{italianClock}</h2>
        </div>
        {data ? <div>
          <span className={`fi fi-${data.flag}`} style={{ width: "6em", lineHeight: "6em" }}></span>
          <h3>{data.message}</h3>
        </div> : null}

      </header>
    </div>
  );
}

export default App;
