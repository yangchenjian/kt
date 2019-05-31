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
import {getUserList} from "api/testApi.js";


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

// 利用class关键字与React.Component创建名为 TestPage 的组件
//   组建名字必须是大写
//   class类选择器 在使用时应更正成 className
//   在class关键字内部框架默认使用的而是严格模式

class TestPage extends React.Component {
// function TestPage(props) {
  // const { classes } = props;
  // TestPage 继承 React.Component 的所有属性
  constructor(props) {
    super(props);
}

//  componentWillMount 生命周期之一  意义 组件即将被装载、渲染到页面上
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
      this.loadConfListData();
    }
  }

  /*
  
   if(res&&res.data){
          let data = res.data
          store.dispatch({
             type:'SET_TEST',
             data     
          })
        }
   */

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
       console.table(data);
    }).catch((err)=>{
       console.log('请求数据出错！',err);
    })

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
              <TableCell>姓名</TableCell>
              <TableCell align="right">ID标识</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configListData.map(row => (
              // 凡是要遍历那就必须挂上key值
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>

              </TableRow>
            ))}
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
