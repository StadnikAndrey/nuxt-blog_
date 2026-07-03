<script>
import { parse, stringify } from "himalaya";
import tags from "@/assets/data-files/tags.js";
import tooltip from "@/components/Tooltip.vue";
import typecode from "@/components/TypeCode.vue";
import typevideo from "@/components/TypeVideo.vue";
import carousel from "@/components/Carousel.vue";
import accordeon from "@/components/Accordeon.vue";

import { decode } from "html-entities";

export default {
  name: "TypeText",
  props: ["contentStr"],
  components: {
    tooltip,
    typecode,
    typevideo,
    carousel,
    accordeon,
  },
  data() {
    return {
      componentsArticle: [
        "tooltip",
        "typecode",
        "typevideo",
        "carousel",
        "accordeon",
      ],
    };
  },
  render: function (createElement) {
    let content = parse(decode(this.contentStr));
    let createChildrenVNode = (item) => {
      if (item.type == "text") {
        return item.content;
      } else if (item.type == "element" && item.tagName != "component") {
        if (tags.includes(item.tagName)) {
          let paramsElement = {};
          paramsElement.attrs = {};
          let attrsHtml = [
            "href",
            "id",
            "title",
            "hidden",
            "src",
            "alt",
            "url",
            "autoplay",
            "poster",
            "width",
            "height",
            "controls",
          ];
          item.attributes.forEach((item) => {
            // class
            if (item.key == "class") {
              paramsElement.class = item.value;
            }
            // style
            if (item.key == "style") {
              paramsElement.style = item.value;
            }
            // regular HTML attributes
            let checkAttrHtml = attrsHtml.indexOf(item.key) != -1;
            if (checkAttrHtml) {
              paramsElement.attrs[item.key] =
                item.value != undefined ? item.value : true;
            }
          });

          if (item.children.length > 0) {
            return createElement(
              item.tagName,
              paramsElement,
              item.children.map(createChildrenVNode)
            );
          } else {
            if (item.tagName == "template") {
              return item.content;
            } else {
              return createElement(item.tagName, paramsElement, "");
            }
          }
        }
      } else if (item.type == "element" && item.tagName == "component") {
        try {
          let params0 = stringify(item.children);
          let params = JSON.parse(params0);
          console.log(params);
          // checking for the presence of a component (components from the components property)
          let checkComponents =
            this.componentsArticle.indexOf(params.COMPONENT) != -1;
          if (checkComponents) {
            return createElement(params.COMPONENT, {
              props: params.props,
            });
          }
        } catch (error) {
          console.log("-----error parse params component ", item);
        }
      }
    };
    return createElement("div", content.map(createChildrenVNode));
  },
};
</script>

<style lang="scss" scoped>
.bg-green {
  background-color: green;
}
</style>