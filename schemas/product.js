import React from "react"

export default {
  name: "product",
  type: "document",
  title: "Product",
  icon: () => (
    <svg
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      description: "The name of the product",
      validation: (Rule) => Rule.required()
    },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "image"
        }
      ],
      title: "Images",
      description: "A list of images showcasing the product",
      validation: (Rule) => Rule.required(),
      options: {
        layout: "grid"
      }
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "A description of the product"
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      description: "The price of the product",
      validation: (Rule) => Rule.required().positive().precision(2)
    },
    {
      name: "quantity",
      type: "number",
      title: "Quantity",
      description: "The quantity of the product",
      validation: (Rule) => Rule.required().min(1).integer(),
      initialValue: 1
    },
    {
      name: "totalPurchased",
      type: "number",
      title: "Total Purchased",
      description: "The total number of this product that has been purchased",
      validation: (Rule) =>
        Rule.required().positive().max(Rule.valueOfField("quantity")).integer(),
      initialValue: 0
    },
    {
      name: "tags",
      type: "tags",
      title: "Tags",
      description: "The categories that this product belongs to"
    },
    {
      name: "sale",
      type: "reference",
      title: "Sale",
      description: "The sale this product is related to",
      to: [{ type: "sale" }],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "images.0",
      currency: "sale.currency",
      description: "description"
    },
    prepare(selection) {
      let { title, subtitle, media, currency, description } = selection

      if (description) description = " | " + description
      else description = ""

      return {
        title,
        subtitle:
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency
          }).format(subtitle) + description,
        media
      }
    }
  }
}
