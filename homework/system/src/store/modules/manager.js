import {getManagerList,getManagerTotal} from '../../utils/request'
const state = {
    managerList:[],
    page:1,
    size:2,
    total:0
}

const mutations = {
    changeManagerList(state,arr){
        state.managerList = arr
    },
    changeManagerTotal(state,arr){
        state.total = arr
    },
    changeManagerPage(state,arr){
        state.page =  arr
    }
}

const actions = {
    managerListActions(context){
        var params = {
            size:context.state.size,
            page:context.state.page   
        }
        getManagerList(params).then(res=>{
            // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                //将page -1
                var p = context.state.page - 1;
                context.commit('changeManagerPage',p);
                // 自调
                context.dispatch('managerListActions');
                return;
            }
            context.commit('changeManagerList',res.data.list)
        })
    },
    managerTotalActions(context){
        getManagerTotal().then(res=>{
            context.commit('changeManagerTotal',res.data.list[0].total)
        })
    },
    managerPageActons(context,page){
        context.commit('changeManagerPage',page)
    }
}

const getters= {
    managerList(state){
        return state.managerList
    },
    managerTotal(state){
        return state.total
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}