import Toast from "./Tip"

const obj = {}

obj.install = function(vue) {
    // document.body.appendChild(toast.$el)
    //1.创建组件构造器
    const tipConstructor = vue.extend(Toast);
    //2.new的方式，根据组件构造器，可以创建出一个组件对象
    const tip = new tipConstructor();
    //3.将组件对象，手动挂载到某一个元素上
    tip.$mount(document.createElement('div'));
    //4.在页面插入节点对象
    document.body.appendChild(tip.$el);

    vue.prototype.$tip = tip;
}

export default obj