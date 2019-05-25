import classNames  from 'classnames';
/*
 * 该General类,是通用类。它提供一些通用的方法。
 */
class General {

	/*
	 *	获取URL上查询的参数
	 *
	 */
    static getQueryParameter(paraName) {
        // let sUrl = window.location.href;
        // sUrl = sUrl.substr(0,sUrl.indexOf('#')); //去除hash部分
        let sUrl = window.location.search;
        let reg = "(?:\\?|&){1}" + paraName + "=([^&]*)";
        let regresult = new RegExp(reg, "gi");
        regresult.exec(sUrl);
        return RegExp.$1;
    }

    /*
     *  获取指定长度的随机字符串。
     *  默认长度是8
     */
    static getRandomString(resultLength) {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        let string_length = 8;
        if(typeof(resultLength) == 'number' && resultLength > 0){
            string_length = resultLength;
        }
        let randomstring = '';
        for (let i=0; i<string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    /*
     *  获取，屏幕宽度或高度，较小的那个值
     *
     */
    static getScreenNarrowSideSize(){

        if(window.innerWidth < window.innerHeight){
            return window.innerWidth;
        }else{
            return window.innerHeight;
        }
    }
    /*
     * 重置图片的大小，图片要铺满父标签（全屏），不能变形，把多余的宽度或高度都去除掉。
     * 使用方法如下：
     * <div className="page-bg">
     *   <img onLoad={General.resetImgSizeToMatchParent.bind(this)} className="background-img" src="/wf/campaigns/newshop/img/p01-bg.jpg" alt="" />
     * </div>
     * 父标签和子标签都必须是 diaplay block，和 position absolute，并且标签有固定的宽度和高度。
     * 原始图片默认是 visibility:hidden;
     * 设置好新的位置后将会 显示，visibility:visible;
     */
    static resetImgSizeToMatchParent(ele) {

      let newPos = {};

      let imgRatio    = ele.target.offsetWidth/ele.target.offsetHeight;
      let parentRatio = ele.target.parentNode.offsetWidth/ele.target.parentNode.offsetHeight;

      if(imgRatio > parentRatio){//图片较宽(需要把宽度裁掉一部分)
        ele.target.style.height = '100%';
        let leftPosition = (ele.target.offsetWidth - ele.target.parentNode.offsetWidth) / 2;
        ele.target.style.left = '-' + leftPosition + 'px';

        newPos.height = "100%;"
        newPos.left = '-' + leftPosition + 'px';

      }else{//图片较窄(需要把高度裁掉一部分)
        ele.target.style.width = '100%';
        let topPosition = (ele.target.offsetHeight - ele.target.parentNode.offsetHeight) / 2;
        ele.target.style.top = '-' + topPosition + 'px';

        newPos.width = "100%;"
        newPos.top =  '-' + topPosition + 'px';

      }
      ele.target.style.visibility = 'visible';
      return newPos;
    }

    /*
     *  获取，屏幕宽度或高度，较大的那个值
     *
     */
    static getScreenWideSideSize(){

        if(window.innerWidth < window.innerHeight){
            return window.innerHeight;
        }else{
            return window.innerWidth;
        }
    }

    /*
     *  获取，屏幕宽度
     */
    static getScreenWidth(){
        return window.innerWidth;
    }

    /*
     *  获取，屏幕高度
     */
    static getScreenHeight(){
        return window.innerHeight;
    }

    //file 是(单个)文件对象
    //fileTypes 是文件后缀数组
    static isValidFile=(file,fileTypes)=> {

      fileTypes = fileTypes || [];

      const storeData = store.getState();

      var sFileName = file.name;
      var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
      var iFileSize = file.size;
      // var iConvert = (file.size / storeData. ).toFixed(2);

      if(     fileTypes.length > 0
          &&  fileTypes.indexOf(sFileExtension) != -1
          &&  iFileSize <= storeData.config.fileMaxSize
          ){
        // console.log("yes a");
        return true;
      }else if(fileTypes.length == 0 && iFileSize <= storeData.config.fileMaxSize ){
        // console.log("yes b");
        return true;
      }

      return false;
    }

    static isValidEmail=(email)=>{
      let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;
      if(!reg.test(email)){
        return false;
      }
      return true;
    }

    static checkMobile=(v)=>{
       var myreg = /^1[3|4|5|7|8][0-9]\d{8}$/;
       if(!myreg.test(v))
       { return false; }
       else
       { return true; }
    }

}

export default General;
