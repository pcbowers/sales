import T from "@sanity/base/initial-value-template-builder"

export default [
  ...T.defaults(),
  T.template({
    id: "product-template",
    title: "Product Sale",
    schemaType: "product",
    value: (parameters) => {
      let res = {}
      if (parameters.saleId)
        res.sale = {
          _ref: parameters.saleId,
          _type: "reference"
        }

      return res
    }
  })
]
