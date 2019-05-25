import {EventEmitter} from "fbemitter";

let instance;

/*
 * 该Event类继承 EventEmitter，目的是实现单例。是通用类。
 */
class Event extends EventEmitter{

    constructor(){
        super();
    }
    
    /*
     *  返回 单例 EventEmitter
     *
     */
    static getEmitter(){
        if(instance == null){
            instance = new Event();
        }
        return instance;
    }
	
}

export default Event;
