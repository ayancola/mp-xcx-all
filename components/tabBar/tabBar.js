// components/tabBar/tabBar.js
const router = getApp().globalData.router;;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    main_color:{
      type: String,
      value: '#1677fe'
    },
    current:{
      type: Number,
      value:-1
    },
    iconPath:{
      type: String,
      value:''
    },
    content:{
      type: Array,
      value:[
        {
          "custom": false,
          "iconPath": "02tab-1.png",
          "selectedIconPath": "02tab_on-1.png",
          "text": "首页"
        },
        {
          "custom": false,
          "iconPath": "02tab-2.png",
          "selectedIconPath": "02tab_on-2.png",
          "text": "关于我们"
        },
        {
          "custom": false,
          "iconPath": "02tab-3.png",
          "selectedIconPath": "02tab_on-3.png",
          "text": "产品中心"
        },
        {
          "custom": false,
          "iconPath": "02tab-4.png",
          "selectedIconPath": "02tab_on-4.png",
          "text": "新闻资讯"
        },
        {
          "custom": false,
          "iconPath": "02tab-5.png",
          "selectedIconPath": "02tab_on-5.png",
          "text": "联系我们"
        },
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    OnButtonTap(e){
      let idx = e.currentTarget.dataset.index;
      console.log('Taped tab item %s.',idx)
      if (Object.hasOwnProperty.call(this.data.content[idx],'custon') && this.data.content[idx].custom==true){
        this.triggerEvent('tabBarTap', {
          index : idx,
          detail : this.data.content[idx]
        })
        return;
      }
      switch (Number(idx)) {
        case 0:
          router.redirect('index');
          break;

        case 1:
          router.redirect('about');
          break;

        case 2:
          router.redirect('products');
          break;

        case 3:
          router.redirect('news');
          break;

        case 4:
          router.redirect('contact');
          break;
      
        default:
          break;
      }
    },
    boundingClientRect(){
      return new Promise((resolve,reject)=>{
        let query2 = this.createSelectorQuery();
        query2.select('.tabBarContainer').boundingClientRect(rect => {
          resolve(rect)
        }).exec();
      });
    }
  }
})
