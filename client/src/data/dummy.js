/*collection of diffrent arrays that representes our data */
import {
  AiOutlineStock,
  AiTwotoneCalendar,
  AiOutlineUserAdd,
} from "react-icons/ai";

import { BsFillPersonLinesFill, BsPersonSquare } from "react-icons/bs";
import { FaLayerGroup } from "react-icons/fa";
import { FcTimeline } from "react-icons/fc";
import { SiContactlesspayment } from "react-icons/si";

export const CancelButton = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.CancelOrder.CancelButton.name}
  </button>
);

export const barPrimaryXAxis = {
  valueType: "Category",
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: "transparent" },
};

export const colorMappingData = [
  [
    { x: "Jan", y: 6.96 },
    { x: "Feb", y: 8.9 },
    { x: "Mar", y: 12 },
    { x: "Apr", y: 17.5 },
    { x: "May", y: 22.1 },
    { x: "June", y: 25 },
    { x: "July", y: 29.4 },
    { x: "Aug", y: 29.6 },
    { x: "Sep", y: 25.8 },
    { x: "Oct", y: 21.1 },
    { x: "Nov", y: 15.5 },
    { x: "Dec", y: 9.9 },
  ],
  ["#FFFF99"],
  ["#FFA500"],
  ["#FF4040"],
];

export const rangeColorMapping = [
  { label: "1 to 50", start: "1", end: "50", colors: colorMappingData[1] },

  {
    label: "51 to 100",
    start: "51",
    end: "100",
    colors: colorMappingData[2],
  },

  {
    label: "101 to 240",
    start: "101",
    end: "240",
    colors: colorMappingData[3],
  },
];

export const ColorMappingPrimaryXAxis = {
  valueType: "Category",
  majorGridLines: { width: 0 },
  title: "Days",
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: "{value} tables",
  title: "Tables",
};

export const userGrid = [
  {
    field: "person.first_name",
    headerText: "First name",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "person.surname",
    headerText: "Surname",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "user.email",
    headerText: "Email",
    width: "135",
    textAlign: "Center",
  },

  {
    field: "profit",
    headerText: "Profit",
    width: "120",
    textAlign: "Center",
  },
];

export const links = [
  {
    title: "Admin Panel",
    links: [
      {
        name: "AdminApp/DayManagmentCertainDay",
        namefront: "Settings",
        icon: <AiTwotoneCalendar />,
      },
    ],
  },
  {
    title: "Abonements",
    links: [
      {
        name: "AdminApp/AddAbonement",
        namefront: "add abonement",
        icon: <AiOutlineUserAdd />,
      },
    ],
  },
  {
    title: "Reports",
    links: [
      {
        name: "AdminApp/CreateReport",
        namefront: "Create Report",
        icon: <AiOutlineStock />,
      },
    ],
  },
];

export const userlinks = [
  {
    title: "Users Data",
    links: [
      {
        name: "UserApp/personalData",
        namefront: "personal data",
        icon: <BsFillPersonLinesFill />,
      },
    ],
  },
  {
    title: "Orders",
    links: [
      {
        name: "UserApp/myOrders",
        namefront: "my orders",
        icon: <FcTimeline />,
      },
    ],
  },
  {
    title: "Abonements",
    links: [
      {
        name: "UserApp/chooseAbonement",
        namefront: "choose Abonement",
        icon: <BsPersonSquare />,
      },
      {
        name: "UserApp/contactUs",
        namefront: "contact us",
        icon: <SiContactlesspayment />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const ordersGrid = [
  {
    field: "date_of_game",
    headerText: "Date of game",
    textAlign: "Center",
    width: "120",
  },
  {
    field: "start_time",
    headerText: "Start time",
    width: "120",
    editType: "dropdownedit",
    textAlign: "Center",
  },
  {
    field: "end_time",
    headerText: "End time",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "payment",
    headerText: "Payment",
    textAlign: "Center",
    editType: "numericedit",
    width: "120",
  },
  {
    field: "payment_status",
    headerText: "Payment status",
    // template: gridOrderStatus,
    textAlign: "Center",
    width: "130",
  },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

export const corsMaker = (action) => {
  const { method, body } = action;
  switch (method) {
    case "POST":
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-xsrf-token": localStorage.getItem("csrf"),
        },
        body: JSON.stringify(body),
      };
  }
};

export const handleForm = ({ target }) =>
  Object.fromEntries(new FormData(target));
