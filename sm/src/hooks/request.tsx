import axios from 'axios'
import { message } from 'antd';

const useReq = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const postReq = (api: string, data: any) => {
        return new Promise((resolve, reject) => {
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
                  reject(true);
                },
                err => {
                  messageApi.open({
                    type: 'error',
                    content: `${err.message}`,
                  });
                  reject(true);
                }
            )
        })
    }

    const getReq = (api: string, query?: string) => {
      return new Promise((resolve: any) => {
        axios.get(`http://localhost:8633${api}${query ? `?${query}=${query}` : ''}`).then(
          res => {
            if(res.data.code == 200) {
              resolve(res.data.resd)
            }
            else {
              messageApi.open({
                type: 'error',
                content: `${res.data.msg}`,
              });
            }
          },
          err => {
            messageApi.open({
              type: 'error',
              content: `${err.message}`,
            });
          }
        )
      })
    }

    return { contextHolder, postReq, getReq }
}

export { useReq }