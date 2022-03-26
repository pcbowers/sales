import Tags from "./Tags"

export default {
  name: "tags",
  title: "Tags",
  type: "array",
  inputComponent: Tags,
  of: [{ type: "tag" }]
}
