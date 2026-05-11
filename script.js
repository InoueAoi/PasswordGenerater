/*Copyright 2019 井上葵*/
'use strict';
const doCopy = document.getElementById('do-copy'),
      doCreate = document.getElementById('do-create'),
      //doPaste = document.getElementById('do-paste'),
      numberOfNumbers = document.getElementById('NONs'),
      passWordLength = document.getElementById('pswd-length'),
      passWordOption = document.getElementsByClassName('pswd-opt'),
      passWordResult = document.getElementById('pswd-result');
var password = '';

doCreate.onclick = () => {
  passWordResult.value = createPassWord();
};
//  コピーボタン
doCopy.onclick = () => {
  passWordResult.select();
  document.execCommand("Copy");
};
/*ペーストボタンの残骸
document.querySelector("#do-paste").addEventListener("click", paste);
*/

// createPassWord関数が2つある。おそらく上の方が出来がいい。

function createPassWord(){
  password = '';
  let
    length = passWordLength.value,
    charset = 'abcdefghijklmnopqrstuvwxyz';
  if(passWordOption[0].checked){
    charset = charset + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if(passWordOption[1].checked) {
    charset = charset + '1234567890';
  }
  if(passWordOption[2].checked) {
    charset = charset + '-+/*~!#$%&=_';
  }
  return sortLetter(charset, length);
}
function sortLetter(charset, length){
  let
    password = '',
    includeUpper = passWordOption[0].checked,
    includeNumber = passWordOption[1].checked,
    numberLength = Number(numberOfNumbers.value),
    includeMark = passWordOption[2].checked;
  while(true) {
    //  パスワードの生成
    //  パスワードの初期化
    password = '';
    //  文字セット(charset)からランダムな文字をpasswordにセットしていく
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * (charset.length - 1))];
  }
  //  continue; でwhile文の先頭に戻れるらしい
  //  小文字が含まれているか
  if(!/[a-z]/.test(password)){
    continue;
  }
  if(includeUpper) {
    if(!/[A-Z]/.test(password)) {
      continue;
    } 
  }
  if(includeNumber) {
    if(!password.match(/[0-9]/g)) {
      // console.log('数字が含まれていません');
      continue;
    } else {
      /*  エラー出し numberLength が文字列だった
      console.log(password);
      console.log(numberLength);
      console.log(password.match(/[0-9]/g).length);
      */
      if(numberLength !== password.match(/[0-9]/g).length) {
        // console.log('数字の数が合いません');
        continue;
      }
    }
  }
  if (includeMark) {
    if(!password.match(/[-+/*~!#$%&=_]/g)) {
      continue;
    } else {
      if(password.match(/[-+/*~!#$%&=_]/g).length > 2) {
        continue;
      }
    }
  }
  break;
  }
  return password;
}


/* 多分こちらの方が古い。乱数を出して、Unicodeに当てはめてランダムに文字を作っている
    数字が1つしか入らないので改良したんだったか。
function createPassWord(){
  let passWord = new Array,
      length = passWordLength.value;
  while (passWord.length < length) {
    let n = String.fromCharCode(Math.floor(Math.random() * 26) + 97)//,
    //    s = String.fromCharCode(n);
    //console.log(n);
    passWord.push(n);
  }
  if(passWordOption[0].checked){
    let up = passWord[0].toUpperCase();
    passWord.shift(0);
    passWord.unshift(up);
  }
  if (passWordOption[1].checked) {
    //数字を含む処理
    let x = new Map;
    //・乱数で含む数字を出す
    while(numberOfNumbers.value > x.size) {
      x.set((Math.floor(Math.random() * (length - 1)) + 1), Math.floor(Math.random() * 9));
      //・乱数で入れ替える文字の配列順番を出す。
    }
    console.log(x);
    // ・splice関数で.splice(入れ替えるところの順番, 1(消す文字数), 入れる数字);
    for(let i = 1; 10 >= i; i++) {
      if(x.has(i)) {
        passWord.splice(i, 1, x.get(i));
      }
    }
    //・↑を入れる数字分繰り返す。インデックスが被らないようにする
    }
  passWord = passWord.join('');
  passWordResult.value = passWord;
}
*/

/*  ペーストボタンはブラウザのセキュリティで弾いてしまうので未実装
function paste () {
  console.log('Begin');
  let text = document.querySelector("#string");
  text.focus();
  document.execCommand("paste");
  console.log('Done');
}
*/
