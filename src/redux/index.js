import React from "react";

const ADD_PAGE = 'add';
const REMOVE_PAGE = 'remove';
const CHANGE_PAGE = 'change';

const initState = {
    panes: [],
    activeKey: ''
};
export function pages(state=initState, action){
    const page = action.page;
    const actKey = action.actKey;
    const removeKey = action.removeKey;
    const manage = {...state};
    switch(action.type){
        case ADD_PAGE:
            let flag = true;
            manage.panes.forEach(pane=>{
                if(pane.key.toString() === page.key.toString()){
                    flag = false;
                }
            });
            if(flag){
                manage.panes.push(page);
            }
            manage.activeKey = page.key.toString();
            return manage;
        case CHANGE_PAGE:
            manage.activeKey = actKey.toString();
            return manage;
        case REMOVE_PAGE:
            let lastIndex;
            manage.panes.forEach((pane,i)=>{
                if (pane.key.toString() === removeKey.toString()) {
                    lastIndex = i - 1;
                }
            });
            const panes = manage.panes.filter(pane => pane.key.toString() !== removeKey.toString());
            if (lastIndex >= 0 && manage.activeKey === removeKey) {
                manage.activeKey = panes[lastIndex].key.toString();
            }
            if(lastIndex === -1 && panes.length>0){
                manage.activeKey = panes[0].key.toString();
            }
            if(panes.length === 0){
                manage.activeKey = '';
            }
            manage.panes = panes;
            return manage;
        default:
            return manage;
    }
}
function add(page){
    return {
        type: ADD_PAGE,
        page: page
    }
}
export function addPage(page){
    return dispatch=>{
        import(`../pages/${page.href}`).then(data => {
            const Home = data.default;
            page.content = <Home />;
            dispatch(add(page));
        })
    }
}
export function removePage(removeKey){
    return {
        type: REMOVE_PAGE,
        removeKey: removeKey
    }
}
export function changePage(actKey){
    return {
        type: CHANGE_PAGE,
        actKey: actKey
    }
}