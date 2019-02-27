export default class URI{
    static getPath(mode){
        let hash = window.location.hash;
        if(mode == 'history')
            hash = window.location.pathname;
        if(hash == null || hash.length < 1)
            return "index";
        let start = hash.indexOf('#') + 1;
        let index = hash.indexOf('?');
        if(index<= 1) index = hash.length;
        hash = hash.substring(start,index)
        return hash;
    }
}