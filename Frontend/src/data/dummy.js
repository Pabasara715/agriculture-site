import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";

export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "Order Request",
        path: "orderrequest",
        icon: <IoMdContacts />,
      },

      {
        name: "Order History",
        path: "orderhistory",
        icon: <AiOutlineShoppingCart />,
      },
    ],
  },
];

export const links_2 = [
  {
    title: "Pages",
    links: [
      {
        name: "Orders",
        path: "order",
        icon: <IoMdContacts />,
      },

      {
        name: "Update Products",
        path: "productupdate",
        icon: <AiOutlineShoppingCart />,
      },
    ],
  },
];
