/*
const targetsID= [
    1,
    2,
    3,
]
のように募集欄から消したいユーザーIDを追加してください。
*/
//対象ID(募集欄から消したいユーザーID 42200はしゅんです)
const targetsID = [
    42200,
    1,
    2
];

//監視設定
const CONFIG = {
    childList: true,
    attribute: true,
    subtree: true
};

$(window).load(function() {
    console.log(window.myid);
})

//監視開始
const layer_observer = new MutationObserver(stream);
layer_observer.observe(document.getElementById('co_layerroot'), CONFIG);


//募集欄監視
function stream() {
    if(document.getElementsByClassName('layer layer_yobikomi')[0] != null) {
        const list_observer = new MutationObserver(hide);
        list_observer.observe(document.getElementsByClassName('layer layer_yobikomi')[0], CONFIG);
    }
    if(document.getElementsByClassName('sourcespace')[0] != null) {
        const boshu_observer = new MutationObserver(dispData);
        boshu_observer.observe(document.getElementsByClassName('sourcespace')[0], CONFIG);
    }
}

//対象IDに該当するユーザを非表示
function hide() {
    const collection = document.getElementsByClassName('yobikomiul');
    const list = Array.prototype.slice.call(collection);
    list.forEach(element => {
       const elemID = element.getAttribute('onclick').replace(/[^0-9]/g, "");
       targetsID.forEach(targetID => {
           if(elemID == targetID) {
               element.remove();
           }
       });
    });
}

//アカウント情報表示
function dispData() {
    //表示用span作成
    $(function() {
            $('.yobikomi_form').append('<span></span>')
            $('.yobikomi_form').find('span').css({'background-color':'white'});
    })
    //表示
    $('.yobikomiul').each(function(){
        $(this).mouseover(function() {
            $('.yobikomi_form').find('span').eq(0).text('ユーザ名:' + $(this).find('span').eq(0).text())
            $('.yobikomi_form').find('span').eq(1).text('ユーザID:' + $(this).attr('onclick').replace(/[^0-9]/g, ""))
        }).mouseout(function() {
            $('.yobikomi_form').find('span').text('');
        })
    })
}
