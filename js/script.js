'use strict'; {
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = [{
      q: '世界で一番大きな湖は?',
      c: ['カスピ海', '琵琶湖', 'ネス湖']
    },
    {
      q: '2の８乗は?',
      c: ['256', '64', '1024']
    },
    {
      q: '次のうち最初にリリースされた言語は?',
      c: ['Python', 'PHP', 'JavaScript']
    }
  ];
  let currentNum = 0;

  //回答したかどうかを管理する変数 isAnswered を定義する
  let isAnswered;
  //正頭数を管理する変数
  let score = 0;

  //フィッシャーイェーツのシャッフル関数
  function shuffle(arr) {
    //ランダムで選ぶ範囲の終点のインデックスをiに。
    for (let i = arr.length - 1; i > 0; i--) {
      //0からi番目のランダムな整数値を生成する
      const j = Math.floor(Math.random() * (i + 1));
      //分割代入。arr[j]とarr[i]を配列にして順番をひっくり返した配列を代入する
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  //正誤判定の関数
  function checkAnswer(li) {
    //回答していたらそれ以降の処理をしない
    //if (isAnswered === true) {
    // === trueを省略して記述。上記と同意になる
    if (isAnswered) {
      return;
    } //セミコロン不要
    isAnswered = true;
    //テキストが成功かクイズカレントの0番目だったら正解。
    if (li.textContent === quizSet[currentNum].c[0]) {
      //class correctを付与
      li.classList.add('correct');
      score++;
    } else {
      //class wrongを付与
      li.classList.add('wrong');

    }
    //ボタンを表示させる
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
    //最初の問題がある限り、最初の問題を消す
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }


    //スプレッド演算子（関数の前に3点リーダーをつける）
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    //問題文の埋め込み
    //quizSet のcurrentNum番目のqに置き換える
    //forEachは繰り返し文のこと
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      //liをクリックした時に正誤判定の関数を実行する
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    //最後の問題にクリックした時に正答数（スコアを計算）
    if (currentNum === quizSet.length - 1) {
      // alert(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      //次の選択肢を表示する
      currentNum++;
      setQuiz();
    }
  });

}
