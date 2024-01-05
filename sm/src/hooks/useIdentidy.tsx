import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hook';
import { setUsername } from '../store/slice/userInfo';

const useIdentidy = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const userInfo = localStorage.getItem('SM_user');
        if(!userInfo) {
          navigate('/Login')
        }
        else {
          dispatch(setUsername(JSON.parse(userInfo).username))
        }
      },[])
}

export { useIdentidy }