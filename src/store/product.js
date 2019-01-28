import { observable, action } from 'mobx';
import promiseHandler from '../utils/promiseHandler';
import { anonymousPost } from '../services/http.services';


class ProductStore {

  constructor() { }

  @observable data = [];


  @action.bound
  async loadData() {
    const params = {
      curr: 1,
      status: 0,
      category: 'factory'
    }
    let [err, result] = await promiseHandler(anonymousPost(`https://family.1ziton.com/web/get_products_by_status`, params));
    if (err || !result) {
      // TODO:查询错误提示
      return false;
    }
    this.data = result.data;
    return true;
  }

}


export default new ProductStore();
