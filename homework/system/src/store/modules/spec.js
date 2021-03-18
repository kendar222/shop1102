import { specsTotal,  specsList } from '../../utils/request'
const state = {
    specsList:[],
    total:0,
    size:2,
    page:1
}

const mutations = {
    changeSpecsTotal(state,num){
        state.total = num
    },
    changeSpecsList(state,arr){
        state.specsList = arr
    },
    changeSpecsPage(state,page){
        state.page = page
    }
}

const actions = {
    //请求总数
    specsCountActions(context){
        specsTotal().then(res=>{
            context.commit('changeSpecsTotal',res.data.list[0].total)
        })
    },
    //请求分页列表详情
    specsListActions(context){
        var params = {
            size:context.state.size,
            page:context.state.page
        }
        specsList(params).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page - 1
                context.commit('changeSpecsPage',p)
                //自调
                context.dispatch('specsListActions')
                return
            }
            context.commit('changeSpecsList',res.data.list)
        })
    },
    specsPageActions(context,page){
        context.commit('changeSpecsPage',page)
    }
}

const getters = {
    specsTotal(state){
        return state.specsTotal
    },
    specsList(state){
        return state.specsList
    }
}

export default {
    state,mutations,actions,getters,namespaced:true
}
