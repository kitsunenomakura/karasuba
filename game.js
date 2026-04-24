// =======================================
// otome game 共通スクリプト
// =======================================

// ------------------------------
// データ読み込み・保存
// ------------------------------
function loadData() {
  return JSON.parse(localStorage.getItem("otomeSave"));
}

function saveData(data) {
  localStorage.setItem("otomeSave", JSON.stringify(data));
}

// ------------------------------
// 不正遷移チェック
// ------------------------------
function checkProgress(expected) {
  const data = loadData();
  if (!data || data.progress !== expected) {
    location.replace(location.href);
  }
}

// ------------------------------
// 戻るボタン完全封印（replace方式）
// ------------------------------
function disableBack() {
  // pushState ではなく replace 方式で履歴を消す
  // → ページ遷移時に goTo() が replace を使うため、ここでは何もしない
  //   （履歴を積まないので戻る先が存在しない）
}

// ------------------------------
// ページ遷移（replace）
// ------------------------------
function goTo(page) {
  location.replace(page + ".html");
}

// ------------------------------
// タイトルへ戻る（progress リセット）
// ------------------------------
function returnToTitle() {
  const data = loadData();
  data.progress = "title";
  saveData(data);
  goTo("title");
}

// ------------------------------
// 好感度加算
// ------------------------------
function addLove(char) {
  const data = loadData();
  data.love[char] += 1;
  saveData(data);
}

// ------------------------------
// 途中再開
// ------------------------------
function continueGame() {
  const data = loadData();
  if (!data || data.progress === "title") {
    alert("続きから再開できるデータがありません");
    return;
  }
  goTo(data.progress);
}

// ------------------------------
// ゲーム開始時の初期化
// ------------------------------
function startNewGame() {
  const data = loadData();

  // 全エンドクリアならシークレットへ
  if (data.clear.A && data.clear.B && data.clear.C && data.clear.normal) {
    goTo("secret_end");
    return;
  }

  // 好感度リセット
  data.love.A = 0;
  data.love.B = 0;
  data.love.C = 0;

  // progress 初期化
  data.progress = "opening";

  saveData(data);
  goTo("opening");
}
