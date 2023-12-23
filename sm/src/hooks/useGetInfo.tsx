import { useAppDispatch, useAppSelector } from '../store/hook';
import { setUsername, setAddress, setPhone, setUserId } from '../store/slice/userInfo';
import { setStoreGoods } from '../store/slice/allStore';
import { useReq } from './request';

const useGetInfo = () => {

    const dispatch = useAppDispatch()
    const { contextHolder, getReq } = useReq();
    const { username, store, currentStore, userId } = useAppSelector(state => state.userInfo)

    const getUserInfo = () => {
        if(!username) return ;
        getReq('/personInfo', 'username', username).then(
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

    const getStoreId = () => {
        if(!currentStore) return -1;
        return store.filter(value => value.storeName == currentStore)[0].storeId
    }

    const getGoods = () => {
        if(!currentStore) return -1;
        getReq('/goodsInfo', 'storeId', getStoreId()).then(
            res => {
              const data = res as any[];
              dispatch(setStoreGoods(data))
            }
          )
    }

    return { contextHolder, getUserInfo, getStoreId, getGoods }
}

export default useGetInfo