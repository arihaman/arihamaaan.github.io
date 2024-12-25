function showImages(color) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = ''; // Clear existing images
    gallery.style.display = 'block'; // Make gallery visible
  
    // Add images based on color
    for (let i = 1; i <= 3; i++) { 
        const img = document.createElement('img');
        img.src = `images/${color}-image${i}.jpg`; // Replace with actual image paths
        img.alt = `${color} image ${i}`;
        
        // 画像が正しく読み込めるかをチェック
        img.onload = function() {
          gallery.appendChild(img);  // 画像が読み込まれたらギャラリーに追加
        };
      
        img.onerror = function() {
          // 画像が読み込めない場合は何もしない、もしくは代替処理をする
          // 例えば、エラーメッセージを表示することもできます
        };
      }
  }
