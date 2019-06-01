import React from "react";

//redux-thunk react-redux redux 区别 特点 ？
import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";
import {getConfList} from "api/testApi.js";
import {getAdminList} from "api/testApi.js";



import store from "../../store.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


class TestPage extends React.Component {
  constructor(props) {
    super(props);
  }

  //componentWillMount 生命周期之一  意义 组件即将被装载、渲染到页面上
  componentWillMount(){
    // 要注意到 this 就是指向当前的 TestPage 组件
    console.log('test page 已经渲染.')
    if (     this.props.test
          && this.props.test != null
          && this.props.test != ""
        ){
      // 一般来说 这儿得加个return 为什么这儿不用添加呢？
      console.log('test data exist.');
    }else{
      this.loadConfListData()
    }
  }

  loadConfListData(){
    let parms = {
      pageNum: 1
    }
    getConfList(parms).then((res)=>{
      let data = res.data.data
       store.dispatch({
             type:'GET_CONFLIST',
             configListData: data,  
          })
    }).catch((err)=>{
       console.log('请求数据出错！',err);
    })

  }


  filterAutoload(data){
    if(data===1){
      let str = '处于自动加载'
      return str
    }else if(data===0){
      let str = '处于手动加载'
      return str
    }
  }





// 渲染方法
// 很重要 比如 创建虚拟dom diff算法比对替换 更新视图dom树都在这个生命阶段进行
  render() {
    const { configListData,classes, ...rest } = this.props;
    // 为啥 组件的props的test属性中没有数据，既然没有数据 为什么不影响渲染,为啥还能遍历？
    // jsx的语法还要熟悉一下 jsx的注释写法要注意 不然会报错的 例子  {/*console.log('my-key',test)*/}
    // console.log('key',test);
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            {configListData.map(row => (
              <TableCell align="center" key={row.id}>{row.title}</TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow >
                 {configListData.map(row => (
                <TableCell key={row.id} component="th" align="center" scope="row">{row.value}</TableCell>
                 ))}
              </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

}

let pageObj = withStyles(styles)(TestPage);

let mapStoreDataToProps = function(storeData){
  return {
    loading: storeData.loading,
    configListData: storeData.configListData
  };
}

let mapDispatchToProps = function(dispatch){
  return {};
}
const PageConnected = connect(
    mapStoreDataToProps,
    mapDispatchToProps
)(pageObj)

export default PageConnected;
