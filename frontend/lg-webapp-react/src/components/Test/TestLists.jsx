import PostLoadingComponent from '../Post/PostLoading'
import Tests from './Tests'
import React, {
  useEffect,
  useState
} from 'react'
import axiosInstance from '../../axios'

export default function TestLists() {
  const PostLoading = PostLoadingComponent(Tests);
    const [appState, setAppState] = useState({
      loading: false,
      tests: null,
    });

    // Fetch posts from the API
  const fetchTests = async () => {
    try {
      const res = await axiosInstance.get('/tests/');
      const allTests = res.data;
      setAppState({ loading: false, tests: allTests });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div className="tests">
      <h1>Tests</h1>
      <PostLoading isLoading={appState.loading} tests={appState.tests} />
    </div>
  );
}

