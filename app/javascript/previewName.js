document.addEventListener("turbo:load", function () {
  const fileFieldName = document.querySelector(
    'input[type="file"][name="user[imageName]"]'
  );
  const previewList = document.getElementById("preview-name");

  //既存の写真が登録されている場合
  let imagePreview = document.getElementById("user_imageName");

  if (imagePreview) {
    let imageUrl = imagePreview.getAttribute("value");
    if (imageUrl) {
      let registerdWrapper = document.createElement("div");

      let registerdImage = document.createElement("img");
      registerdImage.setAttribute("class", "preview-name-image");
      registerdImage.setAttribute("src", imageUrl);

      registerdWrapper.appendChild(registerdImage);
      previewList.appendChild(registerdWrapper);
    }
  }

  if (fileFieldName) {
    fileFieldName.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const blobName = window.URL.createObjectURL(file);

        // 既存のプレビューをクリアする
        previewList.innerHTML = "";

        // 画像を表示するためのdiv要素を生成
        const previewWrapper = document.createElement("div");
        previewWrapper.setAttribute("class", "preview");

        // 表示する画像を生成
        const previewImage = document.createElement("img");
        previewImage.setAttribute("class", "preview-name-image");
        previewImage.setAttribute("src", blobName);

        // 生成したHTMLの要素をブラウザに表示させる
        previewWrapper.appendChild(previewImage);
        previewList.appendChild(previewWrapper);

        // Blob URLのクリーンアップ
        previewImage.onload = function () {
          window.URL.revokeObjectURL(this.src);
        };
      }
    });
  }
});
