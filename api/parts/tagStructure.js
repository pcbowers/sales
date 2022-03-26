import S from "@sanity/desk-tool/structure-builder"
import React from "react"
import documentStore from "part:@sanity/base/datastore/document"
import { map } from "rxjs/operators"
import countItems from "./countStructure"

const getCount = async (query, params) => {
  const count = await client.fetch(`count(*[${query}])`, params)
  return count + " " + (count === 1 ? "Product" : "Products")
}

// Get all an array of all tags defined on all 'post' type
const getProductFilter = (saleId = false, tag = false) =>
  `_type == 'product' && count(tags) > 0 ${
    saleId ? `&& sale._ref == '${saleId}'` : ""
  } ${tag ? "&& $tag in tags[].value" : ""}`

const getTagQuery = (saleId = false) => `*[${getProductFilter(saleId)}].tags[]`

export default (saleId = false) =>
  documentStore.listenQuery(getTagQuery(saleId)).pipe(
    map((tags) => {
      const flattenedTags = tags.flat(Infinity)

      const uniqueTags = flattenedTags.filter((value, index) => {
        const _value = JSON.stringify(value)
        return (
          index ===
          flattenedTags.flat(Infinity).findIndex((obj) => {
            return JSON.stringify(obj) === _value
          })
        )
      })

      return S.list()
        .title("Tag")
        .items([
          ...uniqueTags.map((tag) => {
            return S.listItem()
              .title(tag.label)
              .id(tag.value.replace(/\s/g, "__"))
              .icon(() => (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ))
              .child(
                countItems(
                  getProductFilter(saleId, true),
                  { tag: tag.value },
                  (count, filter, params) =>
                    S.documentTypeList("product")
                      .title(`Product (${count} Total)`)
                      .filter(filter)
                      .params(params)
                      .initialValueTemplates([
                        S.initialValueTemplateItem("product-template", {
                          saleId,
                          tag
                        })
                      ])
                )
              )
          })
        ])
    })
  )
