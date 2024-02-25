document.addEventListener("turbo:load", function () {
  const fileFields = document.querySelectorAll(
    'input[type="file"][name="post_facility[image]"], input[type="file"][name="facility[image]"]'
  );
  const previewList = document.getElementById("preview");

  fileFields.forEach(function (field) {
    field.addEventListener("change", function (e) {
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

  //既存の写真が登録されている場合
  let imagePreview = document.getElementById("item-image");
  let imageUrl = imagePreview.getAttribute("value");

  let registerdWrapper = document.createElement("div");

  let registerdImage = document.createElement("img");
  registerdImage.setAttribute("class", "preview-image");
  registerdImage.setAttribute("src", imageUrl);

  registerdWrapper.appendChild(registerdImage);
  previewList.appendChild(registerdWrapper);
});
