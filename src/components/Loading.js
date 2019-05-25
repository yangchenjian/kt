import React from "react";
class Loading extends React.Component {

  render() {
    let {loading} = this.props;

    if(loading.isDisabled === true){ //如果被禁用了.
        return <span></span>;
    }

    let count = loading.count;
    const wrapStyle = {
        display: count > 0? "block":"none",
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#777',//'transparent', //'#fff',
        opacity: 0.8,
        zIndex: 9999
    };
    const loadingStyle = {
        fontSize: '50px',
        color: '#e86b0c',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-10px',
        margintLeft: '-20px'
    };
    return <div style={ wrapStyle }>
              <div className="loading" style={ loadingStyle }>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
          </div>;
  }


}

export default Loading;
