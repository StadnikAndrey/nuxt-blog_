<template>
  <div class="rules">
    <h1 class="rules__title">Rules create article</h1>
    <ul>
      <li>
        - line break (br tag):
        <ul>
          <li>-- shift + enter</li>
        </ul>
      </li>
      <li>
        - inserting components from the "Components article" section:
        <ul>
          <li>
            -- to insert inline components (Tooltip):
            <ul>
              <li>--- insert the component code anywhere in the text</li>
            </ul>
          </li>
          <li>
            -- to insert block components:
            <ul>
              <li>
                --- select the component element in the editor and paste the component code
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        - adding code:
        <ul>
          <li>-- "Code" button in the Components article section</li>
        </ul>
      </li>
      <li>
        - adding YouTube, Vimeo videos:
        <ul>
          <li>-- "Insert media" button in the editor</li>
        </ul>
      </li>
      <li>
        - adding video:
        <ul>
          <li>-- videos are added to the article using an absolute link</li>
          <li>
            -- to add a video, click the "Video" button in the Components section article
          </li>
          <li>
            -- if the video doesn't appear in the article, the link to the video is incorrect
          </li>
        </ul>
      </li>
      <li>
        - adding images:
        <ul>
          <li>-- images are added to the article using an absolute link</li>
          <li>
            -- image management - the "images" button in the CRUD assets section
          </li>
          <li>
            -- to add images to an article from your drive, you must first upload the image to the server and copy the
            path to the image by clicking on it
          </li>
          <li>
            -- it is not recommended to resize the image using an editor
          </li>
        </ul>
      </li>
      <li>
        - Google maps can be added using an iframe using the "Insert HTML" button
        <ul></ul>
      </li>
      <li>
        - photo slider:
        <ul>
          <li>-- image links are absolute</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RulesCreateArticle",
};
</script>

<style lang="scss">
.rules {
  width: 100%;
  max-width: 1140px;

  &__title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 25px;
  }

  & li>ul {
    padding: 0 0 20px 20px;
  }
}
</style>