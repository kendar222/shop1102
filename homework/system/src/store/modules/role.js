import {getRoleList} from '../../utils/request'

const state = {
    RoleList:[]
}

const mutations = {
    changeRoleList(state,arr){
        state.RoleList = arr
    }
}

const actions = {
    roleListActions(context){
        getRoleList().then(res=>{
            
            context.commit('changeRoleList',res.data.list)
        })
    }
}

const getters = {
    roleList(state){
        return state.RoleList
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}