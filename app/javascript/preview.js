document.addEventListener("turbo:load", function () {
  const fileField = document.querySelector(
    'input[type="file"][name="post_facility[image]"'
  );
  const previewList = document.getElementById("preview");

  fileField.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const blob = window.URL.createObjectURL(file);

      // 既存のプレビューをクリアする
      previewList.innerHTML = "";

      // 画像を表示するためのdiv要素を生成
      const previewWrapper = document.createElement("div");
      previewWrapper.setAttribute("class", "preview");

      // 表示する画像を生成
      const previewImage = document.createElement("img");
      previewImage.setAttribute("class", "preview-image");
      previewImage.setAttribute("src", blob);

      // 生成したHTMLの要素をブラウザに表示させる
      previewWrapper.appendChild(previewImage);
      previewList.appendChild(previewWrapper);

      // Blob URLのクリーンアップ
      previewImage.onload = function () {
        window.URL.revokeObjectURL(this.src);
      };
    }
  });
});
