// 等待DOM元素載入完成
document.addEventListener("DOMContentLoaded", function () {
  // 獲取表單元素
  const form = document.getElementById("inputForm");

  // 監聽表單提交事件
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 防止表單提交刷新頁面

    // 獲取使用者輸入的數值
    const newCard = [
      parseInt(document.getElementById("input0").value),
      parseInt(document.getElementById("input1").value),
      parseInt(document.getElementById("input2").value),
      parseInt(document.getElementById("input3").value),
      parseInt(document.getElementById("input4").value),
      parseInt(document.getElementById("input5").value),
    ];
    const cookNumber = [
      parseInt(document.getElementById("input6").value),
      parseInt(document.getElementById("input7").value),
      parseInt(document.getElementById("input8").value),
      parseInt(document.getElementById("input9").value),
      parseInt(document.getElementById("input10").value),
      parseInt(document.getElementById("input11").value),
    ];
    const jobRadioButtons = document.getElementsByName("job");
    let selectedJob;
    for (let i = 0; i < jobRadioButtons.length; i++) {
      if (jobRadioButtons[i].checked) {
        selectedJob = jobNumbers[jobRadioButtons[i].id];
        break;
      }
    }
    const eatLvRadioButtons = document.getElementsByName("lv");
    let eatLv;
    for (let i = 0; i < eatLvRadioButtons.length; i++) {
      if (eatLvRadioButtons[i].checked) {
        eatLv = eatLvMagnification[eatLvRadioButtons[i].id];
        break;
      }
    }

    // 執行計算函式
    cook(newCard, cookNumber, selectedJob, eatLv);
  });
});

// 計算函式
function cook(newCard, cookNumber, job, eatLv) {
  let gap = 0;
  let jobs = [];
  const results = document.getElementById("results");
  if (cookNumber[5] > newCard[5]) {
    gap = cookNumber[5] - newCard[5];
    for (let i = 0; i < 5; i++) {
      jobs[i] = Math.floor(
        Math.floor(
          (Math.floor((job[i] * gap + newCard[i]) / 2) + cookNumber[i]) * 0.59
        ) * eatLv
      );
    }
  } else if (cookNumber[5] == newCard[5] || cookNumber[5] == 0) {
    for (let i = 0; i < 5; i++) {
      jobs[i] = Math.floor(
        Math.floor(Math.floor(newCard[i] / 2 + cookNumber[i]) * 0.59) * eatLv
      );
    }
  } else {
    console.log("目標等級不會低於新卡等級");
  }

  let cook2 = [" 勇武: ", " 睿智: ", " 活力: ", " 靈巧: ", " 強運: "];
  for (let i = 0; i < cook2.length; i++) {
    results.innerHTML = cook2[i] += jobs[i];
  }
  results.innerHTML = cook2;
}

// 職業數值
let jobNumbers = {
  job1: [5, 2, 6, 3, 2], // 武
  job2: [3, 2, 3, 5, 5], // 響
  job3: [2, 6, 3, 4, 3], // 仙
  job4: [2, 6, 3, 3, 4], // 策
  job5: [3, 3, 3, 4, 5], // 工
};

// 要食用的升變英雄等級，的倍率
let eatLvMagnification = {
  lv0: 1,
  lv1: 0.8,
  lv2: 0.4,
  lv3: 0.2,
  lv4: 0.1,
};
