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
// カートのアイテムを保存する配列
let cart = [];

// 商品画像と価格をマッピングするデータ
const productData = {
  blue: [
    { image: 'blue-image1.jpg', price: 600, name: 'Blue Bead 1' },
    { image: 'blue-image2.jpg', price: 1000, name: 'Blue Bead 2' },
    { image: 'blue-image3.jpg', price: 2000, name: 'Blue Bead 3' }
  ],
  red: [
    { image: 'red-image1.jpg', price: 600, name: 'Red Bead 1' },
   //  { image: 'red-image2.jpg', price: 1250, name: 'Red Bead 2' },
   //  { image: 'red-image3.jpg', price: 1300, name: 'Red Bead 3' }
  ],
  pink: [
    { image: 'pink-image1.jpg', price: 700, name: 'Pink Bead 1' },
   //  { image: 'pink-image2.jpg', price: 1550, name: 'Pink Bead 2' },
   //  { image: 'pink-image3.jpg', price: 1600, name: 'Pink Bead 3' }
  ],
  orange: [
    { image: 'orange-image1.jpg', price: 1000, name: 'Orange Bead 1' },
   //  { image: 'orange-image2.jpg', price: 1150, name: 'Orange Bead 2' },
   //  { image: 'orange-image3.jpg', price: 1200, name: 'Orange Bead 3' }
  ],
  green: [
    { image: 'green-image1.jpg', price: 1000, name: 'Green Bead 1' },
   //  { image: 'green-image2.jpg', price: 1350, name: 'Green Bead 2' },
   //  { image: 'green-image3.jpg', price: 1400, name: 'Green Bead 3' }
  ],
  purple: [
    { image: 'purple-image1.jpg', price: 400, name: 'Purple Bead 1' },
   //  { image: 'purple-image2.jpg', price: 1450, name: 'Purple Bead 2' },
   //  { image: 'purple-image3.jpg', price: 1500, name: 'Purple Bead 3' }
  ],
  black: [
    { image: 'black-image1.jpg', price: 400, name: 'Black Bead 1' },
   //  { image: 'black-image2.jpg', price: 1650, name: 'Black Bead 2' },
   //  { image: 'black-image3.jpg', price: 1700, name: 'Black Bead 3' }
  ],
  white: [
    { image: 'white-image1.jpg', price: 2000, name: 'White Bead 1' },
   //  { image: 'white-image2.jpg', price: 1150, name: 'White Bead 2' },
   //  { image: 'white-image3.jpg', price: 1200, name: 'White Bead 3' }
  ]
};

// 商品画像と価格を表示する関数
function showImages(color) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = ''; // Clear existing images
    gallery.style.display = 'block'; // Make gallery visible

    // 色ごとの商品のデータを取得
    const products = productData[color];

    // それぞれの画像と価格を表示
    products.forEach(product => {
        const img = document.createElement('img');
        img.src = `images/${product.image}`; // 商品画像のパス
        img.alt = product.name;

        const priceText = document.createElement('p');
        priceText.textContent = `価格: ¥${product.price}`;

        // カートに追加するボタンを作成
        const addButton = document.createElement('button');
        addButton.textContent = 'カートに追加';
        addButton.onclick = function() {
            addToCart(product.name, product.price);
        };

        // 商品画像、価格、カートに追加ボタンをギャラリーに追加
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('product-item');
        itemDiv.appendChild(img);
        itemDiv.appendChild(priceText);
        itemDiv.appendChild(addButton);

        gallery.appendChild(itemDiv);
    });
}

// 商品をカートに追加する関数
function addToCart(name, price) {
    // 商品がすでにカートに存在するか確認
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        // 既存の商品数を増加させる
        existingItem.quantity++;
    } else {
        // 新しい商品をカートに追加
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCart();
}

// カートを更新する関数
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    cartList.innerHTML = ""; // カート内を一度クリア

    let total = 0;

    // カート内の商品をリスト表示
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ¥${item.price} x ${item.quantity}`;

        // 数量変更ボタン
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.onclick = () => changeQuantity(index, 1);

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.onclick = () => changeQuantity(index, -1);

        // 削除ボタン
        const removeButton = document.createElement("button");
        removeButton.textContent = "削除";
        removeButton.onclick = () => removeFromCart(index);

        li.appendChild(increaseButton);
        li.appendChild(decreaseButton);
        li.appendChild(removeButton);
        cartList.appendChild(li);

        // 合計金額計算
        total += item.price * item.quantity;
    });

    // 合計金額の更新
    totalPrice.textContent = total;
}

// 商品の数量を変更する関数
function changeQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;

    if (item.quantity <= 0) {
        // 数量が0以下になった場合は商品を削除
        removeFromCart(index);
    } else {
        updateCart();
    }
}

// 商品をカートから削除する関数
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// カートを空にする関数
function clearCart() {
    cart = [];
    updateCart();
}
