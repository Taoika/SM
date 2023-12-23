import { useAppDispatch, useAppSelector } from '../store/hook';
import { setUsername, setAddress, setPhone, setUserId } from '../store/slice/userInfo';
import { useReq } from './request';

const useGetInfo = () => {

    const dispatch = useAppDispatch()
    const { contextHolder, getReq } = useReq();
    const { username } = useAppSelector(state => state.userInfo)

    const getUserInfo = () => {
        getReq('/personInfo', username).then(
            res => {
              const data: any = res;
              dispatch(setUserId(data.userId))
              dispatch(setUsername(data.userName))
              dispatch(setPhone(data.phone))
              dispatch(setAddress(data.address))
              dispatch(setAddress(data.address))
            }
          )
    }

    return { contextHolder, getUserInfo }
}

export default useGetInfo