import axios from 'axios'
import { message } from 'antd';

const usePostReq = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const postReq = (api: string, data: any) => {
        return new Promise((resolve) => {
            axios.post(`http://localhost:8633${api}`, data).then(
                res => {
                  if(res.data.code == 200) {
                    messageApi.open({
                      type: 'success',
                      content: `${res.data.msg}`,
                    });
                    resolve(true);
                  }
                  else {
                    messageApi.open({
                      type: 'error',
                      content: `${res.data.msg}`,
                    });
                  }
                  resolve(false);
                },
                err => {
                  messageApi.open({
                    type: 'error',
                    content: `${err.message}`,
                  });
                  resolve(false);
                }
            )
        })
    }
    return { contextHolder, postReq }
}

export { usePostReq }