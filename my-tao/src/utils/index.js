import axios from 'axios'
const baseURL=process.env.NODE_ENV == 'development' ? '/api/admin' : '/'
const instance=axios.create({
  baseURL,
  timeout:15000,
})
const xhr={
  get(url,data,config){
    return new Promise((resolve,reject)=>{
      instance.get(url,{params:data},config).then(res=>{
        resolve(res.data)
      })
    })
  },
  post(url,data,config,method='post'){
    instance.headers={'Content-Type': 'application/x-www-form-urlencoded'}
    return new Promise((resolve,reject)=>{
      instance[method](url,data,config).then(res=>{
        resolve(res.data)
      })
    }).catch(err=>{
      reject(err)
    })
  },
  put (url, data, config) {
    return this.post(url, data, config, 'put')
  },
  delete (url, data, config) {
    return this.post(url, data, config, 'delete')
  },
  transformtime(t){
    var date = new Date(t);
    var updatetime = date.getTime();
    let time = new Date().getTime() - updatetime
    let arr = []
    let str = 999;
    let str2 = "刚刚"
    arr.push(Math.floor(time / (1000 * 3600 * 24 * 365)))
    arr.push(Math.floor(time / (1000 * 3600 * 24 * 30)))
    arr.push(Math.floor(time / (1000 * 3600 * 24)))
    arr.push(Math.floor(time / (1000 * 3600)))
    arr.push(Math.floor(time / (1000 * 60)))
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        str = i;
        switch (i) {
          case 0:
            str2 = "年"
            break
          case 1:
            str2 = "月"
            break
          case 2:
            str2 = "天"
            break
          case 3:
            str2 = "小时"
            break
          case 4:
            str2 = "分钟"
            break
          default:
            str2 = "刚刚"
            break
        }
        break
      }
    }
    if(str==999){
      return str2
    }
    return arr[str] + str2 + "前"
  }
}

export const $axios= xhr
