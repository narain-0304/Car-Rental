import { useEffect } from 'react'
import { useAppContext } from '../AppContext/Context'
import { useLocation } from 'react-router-dom'

const Loader = () => {
  
  const {navigate} = useAppContext()
  let {search} = useLocation()
  const query = new URLSearchParams(search)
  const nextURL = query.get('next')

  useEffect(() => {
    if(nextURL){
        setTimeout(() => {
            navigate(`/${nextURL}`)
        }, 5000);
    }
  }, [nextURL]);


  return (
    <div className='flex justify-center items-center h-screen'>
        <div className="animate-spin rounded-full h-24 w-24 border-gray-300 border-4 border-t-primary"></div>
    </div>
  )
}

export default Loader;