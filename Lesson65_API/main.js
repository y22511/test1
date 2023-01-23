window.addEventListener("DOMContentLoaded", function(){
  var button = document.getElementById('button'); //buttonのDOM取得
  var input  = document.getElementById("keyword");
  if(location.pathname.slice(-11) == "/index.html") {
    // ボタン押下時の処理
    button.addEventListener("click", function(){
      //input.value = this.value;
      var keyword = input.value;
    
      // scriptタグを生成
      var script = document.createElement('script');
      // srcにFlickr APIのURLを指定
    // キーワードをURLエンコードしてtagsパラメーターに指定
    script.src=
    "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + encodeURIComponent(keyword);
      // Flickr APIの呼び出し
      document.body.appendChild(script);
      // 呼び出した後にscriptタグを削除
      document.body.removeChild(script);
    });
  }
  if(location.pathname.slice(-13) == "/myalbum.html") {
    // itemsキーで検索結果を取得
    for (i=0;i<localStorage.length;i) {
      // 検索結果内の画像情報を取得
      var name = localStorage.key(i);
      var img_box = document.createElement("div");
      img_box.className = "img_box";
      var name_box = document.createElement("p");
      name_box.innerHTML = name;
      // img要素を生成
      var img = document.createElement("img");
      // img要素のsrcに検索結果の画像のURLを指定
      var img_obj = {
        class: "img_choice",
        src: localStorage.getItem(name)
      }
      for(let i of Object.entries(img_obj)) {
        img.setAttribute(i[0],i[1]);
      }
      var delete_btn = document.createElement("input");
      var delete_btn_obj = {
        type: "button",
        id: "btn",
        class: "delete",
        value: "削除"
      }
      for(let i of Object.entries(delete_btn_obj)) {
        delete_btn.setAttribute(i[0],i[1]);
      }
      photo_list.appendChild(img_box);
      img_box.appendChild(img);
      img.before(name_box);
      img.after(delete_btn);
      
      var btn = document.getElementsByClassName('delete');
      for (i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function(e) {
          var img_box = e.target.parentNode;
          var delete_img = img_box.getElementsByTagName("img");
          var img_url = delete_img[0].getAttribute('src');
          for (let j = 0; j < localStorage.length; j++) {
            var keyStr = localStorage.key(j);
            var urlStr = localStorage.getItem(keyStr);
            if (img_url == urlStr) {
              window.alert("「" + keyStr + "」を削除しました。");
              localStorage.removeItem(keyStr);
              location.reload();
            }
          }
        });
      }
    }
  } 
});

  // JSONデータを受け取る関数
function jsonFlickrFeed(data) {
  // 結果表示領域をクリア
  var photo_list = document.getElementById("photo_list");
  photo_list.innerHTML = "";

  if(location.pathname.slice(-11) == "/index.html") {
    // itemsキーで検索結果を取得
    for (i=0;i<data.items.length;i++) {
      // 検索結果内の画像情報を取得
      var item = data.items[i];
      var img_box = document.createElement("div");
      img_box.className = "img_box";
      // img要素を生成
      var img = document.createElement("img");
      // img要素のsrcに検索結果の画像のURLを指定
      // img.src = item.media.m;
      var img_obj = {
        class: "img_choice",
        src: item.media.m
      }
      for(let i of Object.entries(img_obj)) {
        img.setAttribute(i[0],i[1]);
      }
      var download_btn = document.createElement("input");
      var download_btn_obj = {
        type: "button",
        id: "btn",
        class: "download",
        value: "ダウンロード"
      }
      for(let i of Object.entries(download_btn_obj)) {
        download_btn.setAttribute(i[0],i[1]);
      }
      photo_list.appendChild(img_box);
      img_box.appendChild(img);
      img.after(download_btn);

      download_btn.addEventListener("click", function(e) {
        var result = prompt("名前を付けて保存します。");
        if(result == null) {
          window.alert("キャンセルされました。")
        } else {
          var img_box = e.target.parentNode;
          var download_img = img_box.getElementsByTagName("img");
          var img_url = download_img[0].getAttribute('src');
          window.alert("画像を「" + result + "」という名前で保存しました。");
          localStorage[result] = img_url;
        }
      });
    }
  }
};