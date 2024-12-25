document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.circle-button');
    const gallery = document.getElementById('image-gallery');
    const baseImagePath = './images/'; // 画像フォルダのパス
    const imageData = {
      blue: ['blue-image1', 'blue-image2', 'blue-image3'], // 青は3つ
      red: ['red-image1'], // 赤は1つ
      pink: ['pink-image1', 'pink-image2'], // ピンクは2つ
      orange: [], // オレンジは画像がない
      green: ['green-image1'], // 緑は1つ
      purple: ['purple-image1', 'purple-image2', 'purple-image3'], // 紫は3つ
      black: [], // 黒は画像がない
      white: ['white-image1'] // 白は1つ
    };
  
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const color = this.classList[0]; // ボタンのクラス名から色を取得
        const images = imageData[color]; // 該当色の画像データを取得
  
        gallery.innerHTML = ''; // ギャラリーをリセット
  
        if (images && images.length > 0) {
          // 画像がある場合は表示
          images.forEach(image => {
            const img = document.createElement('img');
            img.src = `${baseImagePath}${image}.jpg`; // フォルダパスと画像名を結合
            img.alt = image; // alt属性を設定
            gallery.appendChild(img); // ギャラリーに画像を追加
          });
          gallery.style.display = 'block'; // ギャラリーを表示
        } else {
          // 画像がない場合はメッセージを表示
          const noImageMessage = document.createElement('p');
          noImageMessage.textContent = '画像がありません。';
          noImageMessage.style.color = '#555'; // メッセージのスタイルを調整
          gallery.appendChild(noImageMessage);
          gallery.style.display = 'block'; // ギャラリーを表示
        }
      });
    });
  });
