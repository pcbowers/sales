import S from "@sanity/desk-tool/structure-builder"
import React from "react"
import sanityClient from "part:@sanity/base/client"
import { map } from "rxjs/operators"

const getUnique = (tags) => {
  const flattenedTags = tags.flat(Infinity)

  return flattenedTags.filter((value, index) => {
    const _value = JSON.stringify(value)
    return (
      index ===
      flattenedTags.flat(Infinity).findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    )
  })
}

const listenOptions = {
  includeResult: false,
  includePreviousRevision: false,
  visibility: "query",
  events: ["welcome", "mutation", "reconnect"]
}

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .icon(() => (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
          </svg>
        ))
        .title("Products by Sale")
        .child(
          S.documentTypeList("sale")
            .title("Sales")
            .child((saleId) =>
              S.documentTypeList("product")
                .title("Products")
                .filter('_type == "product" && sale._ref == $saleId')
                .params({ saleId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-template", {
                    saleId
                  })
                ])
            )
        ),

      S.listItem()
        .icon(() => (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
              clipRule="evenodd"
            ></path>
          </svg>
        ))
        .title("Products by Tag")
        .child(
          S.documentTypeList("sale")
            .title("Sales")
            .child((saleId) =>
              sanityClient
                .withConfig({ apiVersion: "2022-03-27" })
                .listen(
                  "*[_type == 'product' && count(tags) > 0 && sale._ref == $saleId].tags[]",
                  { saleId },
                  listenOptions
                )
                .pipe(
                  map(async (update) => {
                    const tags = await sanityClient
                      .withConfig({ apiVersion: "2022-03-27" })
                      .fetch(
                        "*[_type == 'product' && count(tags) > 0 && sale._ref == $saleId].tags[]",
                        { saleId }
                      )
                    const uniqueTags = getUnique(tags)

                    return S.list()
                      .title(`Tags (${uniqueTags.length} Total)`)
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
                              S.documentTypeList("product")
                                .title("Products")
                                .filter(
                                  "_type == 'product' && count(tags) > 0 && sale._ref == $saleId && $tag in tags[].value"
                                )
                                .params({ tag: tag.value, saleId })
                                .initialValueTemplates([
                                  S.initialValueTemplateItem(
                                    "product-template",
                                    {
                                      saleId,
                                      tag
                                    }
                                  )
                                ])
                            )
                        })
                      ])
                  })
                )
            )
        ),

      S.listItem()
        .icon(() => (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        ))
        .title("Purchased Products")
        .child(
          S.documentTypeList("sale")
            .title("Sales")
            .child((saleId) =>
              S.documentTypeList("product")
                .title("Products")
                .filter(
                  '_type == "product" && sale._ref == $saleId && quantity <= totalPurchased'
                )
                .params({ saleId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-template", {
                    saleId
                  })
                ])
            )
        ),

      S.listItem()
        .icon(() => (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        ))
        .title("Available Products")
        .child(
          S.documentTypeList("sale")
            .title("Sales")
            .child((saleId) =>
              S.documentTypeList("product")
                .title("Products")
                .filter(
                  '_type == "product" && sale._ref == $saleId && quantity > totalPurchased'
                )
                .params({ saleId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-template", {
                    saleId
                  })
                ])
            )
        ),

      S.listItem()
        .icon(() => (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            ></path>
          </svg>
        ))
        .title("Products Missing Availability")
        .child(
          S.documentTypeList("sale")
            .title("Sales")
            .child((saleId) =>
              S.documentTypeList("product")
                .title("Products")
                .filter(
                  '_type == "product" && sale._ref == $saleId && !(tags[].value match "*availab*")'
                )
                .params({ saleId })
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-template", {
                    saleId
                  })
                ])
            )
        ),

      S.divider(),

      S.documentTypeListItem("sale")
        .title("Sales")
        .child(S.documentTypeList("sale").title("Sales")),

      S.documentTypeListItem("product")
        .title("Products")
        .child(
          S.documentTypeList("product")
            .title("Products")
            .initialValueTemplates([S.initialValueTemplateItem("product")])
        )
    ])
