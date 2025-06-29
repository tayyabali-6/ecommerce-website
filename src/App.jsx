import Route from './pages/Routes'
import './App.scss'
import { useAuthContext } from './context/Auth'
import Loader from './Loader/isLoader'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const { isAppLoader } = useAuthContext()
  return (
    <>
      {isAppLoader
        ?
        <Loader />
        :
        <Route />
      }
    </>
  )
}

export default App
