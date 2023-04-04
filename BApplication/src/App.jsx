import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { ListScreen } from './components/ListScreen';
import { Spinner } from './components/Spinner/Spinner';

function App() {

  const [healthStatus, setHealthStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const checkHealthStatus = useCallback(async () => {
    try {
      const { data } = await axios.get('https://private-anon-22d3fdc680-blissrecruitmentapi.apiary-mock.com/health');
      if (data && data.status === 'OK') {
        setHealthStatus(true);
      } else {
        setHealthStatus(true);
      }
      setIsLoading(false);
    } catch (error) {
      setHealthStatus(false);
      setIsLoading(false);
    }
  }, [healthStatus]);

  useEffect(() => {
    checkHealthStatus();
  }, [checkHealthStatus]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="App">
      {!healthStatus ?
          <button onClick={checkHealthStatus}>Retry</button>
          :
          <ListScreen />
      }
    </div>
  )
}

export default App
