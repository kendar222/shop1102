import {getMenu} from '../../utils/request'

const state = {
    menuList:[]
}

const mutations = {
    changeMenu(state,arr){
        state.menuList = arr
    }
}

const actions = {
    requestMenuActions(context){
        
        getMenu({istree:true}).then(res=>{
            context.commit('changeMenu',res.data.list)
        })
    }
}

const getters = {
    menuList(state){
        return state.menuList
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}