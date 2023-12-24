import { useAppDispatch, useAppSelector } from '../store/hook';
import { setUsername, setAddress, setPhone, setUserId } from '../store/slice/userInfo';
import { setStoreGoods, setUserGoods, setAllGoods } from '../store/slice/goods';
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

    const getStoreGoods = () => {
        if(!currentStore) return -1;
        getReq('/goodsInfo', 'storeId', getStoreId()).then(
            res => {
              const data = res as any[];
              dispatch(setStoreGoods(data))
            }
          )
    }

    const getUserGoods = () => {
        getReq('/cartInfo', 'userId', userId).then(res => {
            console.log(res);
            
            const data = res as any[];
            dispatch(setUserGoods(data))
          })
    }

    const getAllGoods = () => {
        getReq('/allGoods').then(res => {
            const data = res as any[]
            dispatch(setAllGoods(data))
          })
    }

    return { contextHolder, getUserInfo, getStoreId, getStoreGoods, getUserGoods, getAllGoods }
}

export default useGetInfo