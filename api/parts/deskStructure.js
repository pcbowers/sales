import S from "@sanity/desk-tool/structure-builder"
import React from "react"

import documentStore from "part:@sanity/base/datastore/document"
import { map } from "rxjs/operators"

import tagItems from "./tagStructure"

// Get all an array of all tags defined on all 'post' type
const query = (saleId = "") =>
  `*[_type == 'product' && count(tags) > 0 && sale._ref match "*${saleId}*"].tags[]`

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
            .title("Sale")
            .child((saleId) =>
              S.documentTypeList("product")
                .title("Product")
                .filter('_type == "product" && sale._ref == $saleId')
                .params({ saleId })
            )
        ),
      S.listItem()
        .title("Products by Tag")
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
        .child(() => tagItems()),
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
        .title("Products by Sale & Tag")
        .child(
          S.documentTypeList("sale")
            .title("Sale")
            .child((saleId) => {
              return tagItems(saleId)
            })
        ),
      S.divider(),
      ...S.documentTypeListItems()
    ])
