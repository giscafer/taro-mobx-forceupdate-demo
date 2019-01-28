import { Text, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import Taro, { Component } from '@tarojs/taro';
import { toJS } from 'mobx';
import './index.scss';


@inject(stores => ({
  data: stores.productStore.data,
  loadData: stores.productStore.loadData,
}))
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: 'mobx issue reproduce',
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
  }


  componentDidMount() {
    this.query();

  }

  componentWillUnmount() { }

  componentDidShow() { }

  query() {
    const { loadData } = this.props;
    loadData().then((res) => {
      if (res) {
        console.log('这里如果不强制刷新一下this.forceUpdate()，mobx观察的对象data不会得到值');
        // this.forceUpdate();
        return;
      }
    });
  }

  render() {
    const { data } = this.props;
    const productList = toJS(data) || [];
    return (
      <View className='index'>
        <Text>共{productList.length}条记录</Text>
        {
          productList.length && productList.map((pd, index) => {
            return <View key={pd._id} className='list'>
              <Text>{pd.title}</Text>
            </View>
          })
        }

      </View>
    )
  }

}

export default Index
