/* eslint-disable import/prefer-default-export */


import Taro from '@tarojs/taro';
import { showToast, showLoading } from '../utils/messegeUtil';


/**
 * 请求,需要token
 */
export const post = (endpoint, params, _showLoading = true) => {
  // TODO
  const token = { Authorization: 'bearer anonymous' };
  return _post(endpoint, params, _showLoading, token);
}

/**
 * 匿名请求，一些不需要token的请求
 */
export const anonymousPost = (endpoint, params, _showLoading = true) => {
  // const token = { Authorization: 'bearer anonymous' };
  return _post(endpoint, params, _showLoading);
}

/**
 * post请求
 * @param {String} endpoint 接口路径名称
 * @param {Object<any>} params 参数对象
 * @param {Boolean} _showLoading 是否全局展示请求loading
 */
function _post(endpoint, params, _showLoading = true, token = {}) {

  if (_showLoading) {
    showLoading('正在加载...');
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${endpoint}`,
      method: 'POST',
      data: params,
      header: {
        'content-type': 'application/json',
        ...token
      },
    })
      .then(res => {
        const { statusCode, data } = res;
        if (_showLoading) {
          Taro.hideLoading();
        }
        if (statusCode !== 200) {
          showToast(res.data.message)
          return reject(res);
        }
        return resolve(data);
      })
      .catch(err => {
        // do error handler
        if (_showLoading) {
          Taro.hideLoading();
        }
        return reject(err);
      });
  });
};
