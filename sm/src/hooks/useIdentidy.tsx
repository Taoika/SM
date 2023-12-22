import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useIdentidy = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        const userInfo = localStorage.getItem('SM_user');
        if(!userInfo) {
          navigate('/Login')
        }
      },[])
}

export { useIdentidy }