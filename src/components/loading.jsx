import { useNavigate } from "react-router-dom"
import '../styles/loading.css'
import { usePosts } from "../context/appContext"

export function Loading({ message, path = '/' }) {

  const { newCreation, setNewCreation } = usePosts()

  const navigate = useNavigate()

  return (
    <div id='isLoading' className='isLoading'>
      <div id='isResponse1' className='isResponse'></div>
      <div id='loadNew1' className='loadingNew'>
        <p id='loadingP'>{message}</p>
        <div id='loadNew2' className="lds-ringNew"><div></div><div></div><div></div><div></div></div>
        {newCreation.status ? <button id='loadingbtn' type='button' className='loadingbtn' onClick={() => {
          setNewCreation({
            status: true,
            loading: false
          })
          navigate(path)
        }}>OK</button> : <button id='loadingbtnerror' type='button' className='errorbtn' onClick={() => {
          setNewCreation({
            status: false,
            loading: false
          })
        }}>OK</button>}
      </div>
    </div>
  )
}