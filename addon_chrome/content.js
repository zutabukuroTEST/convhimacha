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

//トップ画面監視開始
const layer_observer = new MutationObserver(stream);
layer_observer.observe(document.getElementById('co_layerroot'), CONFIG);

//募集欄監視開始
function stream() {
    if(document.getElementsByClassName('layer layer_yobikomi')[0] != null) {
        const list_observer = new MutationObserver(hide);
        list_observer.observe(document.getElementsByClassName('layer layer_yobikomi')[0], CONFIG);
    }
}

//削除
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