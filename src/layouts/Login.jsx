// react core
import React from "react";
import { withRouter } from 'react-router-dom';
import { connect,dispatch } from 'react-redux';
// 实现在jsx中添加多个className的需求
import classNames from "classnames";
import PropTypes from 'prop-types';

// material-ui core
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// 自身静态资源 引入
import logo from "assets/img/katian_logo.png";



// 数据请求
import axios from "axios";

// css样式
const styles = theme => ({
  root:{
    flexGrow: 1,
  },
  container:{
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginWrap:{
    width: '300px',
    backgroundColor: '#fff',
    padding: '15px 0',
    borderRadius: 5
  },
  loginBtn:{
    backgroundColor: '#2463af',
    margin: '20px 0',
    marginLeft: 5
  },
  loginHeader:{
    textAlign: 'center',
  },
  logoPic:{
    width: 100
  },
  headerTxt: {
    fontSize: 18,
    margin: 0
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200,
  },
  contentWrap:{
    width: 250,
    margin: '10px auto',
    overflow: 'hidden'
  },
  fullWidth:{
    width: '100%',
  },
  fullHeight:{
    height: '100%',
  },
  passwordMar:{
    marginTop: 5,
  },
  passEye:{
    padding: 6,
  }

});

class Login extends React.Component{
  state = {
    account: '',
    accInput: false,
    accountError: '',
    password: '',
    passInput: false,
    passwordError: '',
    respAccountInfo: null,
    isLogin: false,
    showPassword: false,
    open: false,
    vertical: 'top',
    horizontal: 'center',
    autoHideBar: 2000,
    statusMessage: '',
    isDisable: false,
    progressToggle: 0,
  };
  // login组件为了数据获取的便捷，先把React.Component的属性继承下来
  constructor(props){
    super(props)
  }
  // -------------各种相关方法 全部都写到这个class类里面去--------------------
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  showSnackbar(targetEle){
    let delayTime = this.state.autoHideBar
    if(targetEle.id === 'adornment-account'){
       this.setState({
          statusMessage: '请输入正确的账号/手机号码'
        })
    }else if( targetEle.id === 'adornment-password' ){
       this.setState({
          statusMessage: '密码为6-20位数字或字母或下划线!'
       })
    }else if(targetEle.currentTarget.id === 'loginBtn'){
       this.setState({
          statusMessage: '请填写登录信息！'
       })
    }
    this.state.open = true
    setTimeout(()=>{
      this.handleClose()
    }, delayTime)

  }
  /*  
   showSnackbar = (targetEle)=>{
   }
  */
  trimAll(val){
    let regTrim = /(^\s*)|(\s*$)/g
    val = val.replace(regTrim,'')
    return val
  }
  isTel(val){
    let regTel = /^1[34578]\d{9}$/
    let result = regTel.test(val)
    return result
  }
  isPassword(val){
    let regPassword=/^\w{6,20}$/
    let result = regPassword.test(val)
    return result
  }
  accountCheck(event){
    let tel = this.tel = event.target.value
    let targetEle = event.target
    tel = this.trimAll(tel)
    if(this.isTel(tel) === false){
      this.showSnackbar(targetEle)
      targetEle.focus()
      return 
    }else{
      this.setState({ accInput: true });
    }
  }
  passwordCheck(event){
    let password = this.password = event.target.value
    let targetEle = event.target
    if(this.isPassword(password) === false){
      this.showSnackbar(targetEle)
      targetEle.focus()
      return
    }else{
      this.setState({ passInput: true }); 
   }
  }
  getData(){
    axios.post('http://rap2api.taobao.org/app/mock/177373/userInfo',
          {
            account: this.state.account,
            password: this.state.password
          })
         .then(
          (res)=>{
            this.handleLogin(res)
          })
         .catch((err)=>{
           this.state.isDisable = false
            console.log('request fail')
         })
  }

/*

 */
  handleLogin(dataInfo){
    let statusInfo = dataInfo.status
    let respAccountInfo = this.state.respAccountInfo = dataInfo.data.data
    let inputAccount = this.state.account
    let inputPassword = this.state.password
    if(respAccountInfo.accound !== inputAccount){
      alert('数据库没有该账户!');
      this.handleTaggle()
      return
    }else if(respAccountInfo.password !== inputPassword){
       alert("密码错误！");
      this.handleTaggle()
      return
    }else{
      let userToken = respAccountInfo.userId
      this.goConsole(userToken)
    }
  }
  handleTaggle(){
    this.setState({isDisable : false});
    this.setState({progressToggle : 0});
  }



  /*
    
    handleProgress(){
    let ele = document.getElementById('progressLine')
    ReactDom.findDOMNode(ele).style.visibility = 'hidden'
  }

  componentDidMount(){
    this.handleProgress()
  }


event.target.innerText = '请求中···'

 */

  goConsole(userToken){
    const {history,toPath} = this.props
    let url = toPath
    window.sessionStorage.setItem("userId", userToken)
    if(url.toPath==='' || url.toPath==='undefined'){
       history.push('/admin/dashboard');  
    }else{
      history.push(url.toPath); 
      url.toPath = '' 
    }
  }
  login(event){
    if(this.state.account === '' && this.state.password === '' ){
      this.showSnackbar(event)
    }else if( this.state.accInput && this.state.passInput ){  
        this.state.isDisable = true
        this.state.progressToggle = ''
        this.getData()
     }
  } 
  render(){
  // 初期已然完成继承 现在是用继承数据的时候了
    const { classes } = this.props;
    const { vertical, horizontal, open,autoHideDuration,statusMessage,isDisable,progressToggle } = this.state;
     {
      document.getElementsByTagName('html')[0].style.height = '100%'
      document.body.style.height = '100%'
      document.getElementById('root').style.height = '100%'
     }
    return (

      <div className={classes.container}>
        <div className={classes.loginWrap}>

        <div className={classes.loginHeader}>
          <img className={classes.logoPic} src={logo}></img>
          <p className={classes.headerTxt}>卡田科技-后台管理系统</p>
        </div>
        <div className={classes.contentWrap}>
           <FormControl className={classNames(classes.margin, classes.textField,classes.fullWidth)}>
            <InputLabel htmlFor="adornment-account">账号</InputLabel>
              <Input
                id="adornment-account"
                type="text"
                value={this.state.account}
                onChange={this.handleChange('account')}
                onBlur={(eve)=>{this.accountCheck(eve)}}
            />
           </FormControl>

           <FormControl className={classNames(classes.margin, classes.textField,classes.fullWidth,classes.passwordMar)}>
              <InputLabel htmlFor="adornment-password">密码</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                onBlur={(eve)=>{this.passwordCheck(eve)}}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      className={classNames(classes.passEye)}
                      aria-label="显示与隐藏切换"
                      onClick={this.handleClickShowPassword}
                    >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
              }
            />
            </FormControl>
            <LinearProgress style={{opacity: progressToggle}}/>
            <Button
              id="loginBtn"
              variant="contained"
              color="primary"
              className={classNames(classes.button,classes.loginBtn)}
              onClick={(event)=>{this.login(event)}}
              disabled={isDisable}
            >
            登录
            {/* 

              onBlur={(eve)=>{this.accountCheck(eve)}}

                <LinearProgress />
      <br />
      <LinearProgress color="secondary" />




            */}
          </Button>
         
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            ContentProps={{
              'aria-describedby': 'statusMessage',
            }}
            message={<span id="statusMessage">{statusMessage}</span>}
          />
          </div>
        </div>
        
      </div>
    )
  }//render函数结束

}// 组建类的声明结束


// 不懂这玩意儿是干啥的
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};



// 处理自己的css样式 与ui组件融合
let _Login = withStyles(styles)(Login);

// 通过映射完成数据联通

let mapStoreDataToProps = function(storeData){
  return {
    loading: storeData.loading,
    toPath: storeData.loginState
  };   
}

let mapDispatchToProps = function(dispatch){
  return {

  };
}
const PageConnected = connect(
    mapStoreDataToProps,
    mapDispatchToProps
)(_Login)


export default PageConnected;
