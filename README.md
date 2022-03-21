# `Sales` Admin Studio

For help, see these resources:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## GROQ Queries

Add `| order(name asc, description asc)` or some variation of this for ordering. This should be added right before the first opening curly bracket.

```
*[] | order(name asc, description asc) {
  ...
}
```

You can also slice for pagination using the `0...10` syntax (10 is an example, you can grab more or less than this if desired). Make sure to sort if this is the case!

```
*[0...5] {
  ...
}
```

### Sales

```
*[_type == "sale"][]{
  ...,
  "logo": logo.asset->url
}
```

### Products By Sale

```
*[_type == "product" && sale->_id == 'MY_ID'][] | order(price asc) {
  ...,
  "tags": tags[].value,
  "images": images[].asset->url
}
```

### Products By Category

```
*[_type == "product" && "TAG" in tags[].value][] {
  ...,
  "tags": tags[].value,
  "images": images[].asset->url
}
```

### Products By Search

```
*[_type == "product" && [name, description] match "*SEARCH*"][] {
  ...,
  "tags": tags[].value,
  "images": images[].asset->url
}
```

### All Product Tags

This is not distinct! Make sure to filter first.

```
*[_type == "product" && count(tags) > 0].tags[].value
```
