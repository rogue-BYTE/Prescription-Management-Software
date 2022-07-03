import { useDispatch } from 'react-redux';
import { setSelectedSession } from '../store/session/sessionSlice'
const Session = ({ sessionType }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="rounded-3xl"
      style={{border: 'none', height: '316px', marginBottom: '30px', width: '479px', backgroundColor: '#ABD1C6', boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 20px 20px 0 rgba(0, 0, 0, 0.19)'}}
      onClick={() => dispatch(setSelectedSession(sessionType))}
    >
      { sessionType }
    </button>
 )
};
export default Session;