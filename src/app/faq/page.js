 
// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "components/modules/icon";

// ** Third Party Imports
// import axios from "axios";

// ** Demo Imports
import FAQS from "./_components/Faqs";
import FaqHeader from "./_components/FaqHeader";
import FaqFooter from "./_components/FaqFooter";
// import FaqHeader from "./_components/FaqHeader";
// import FaqFooter from "./_components/FaqFooter";

const FAQ = () => {
  // ** States\
  const apiData = {
    faqData: {
      payment: {
        id: "payment",
        title: "Payment",
        icon: "tabler:credit-card",
        subtitle: "Get help with payment",
        qandA: [
          {
            id: "order-payment",
            question: "When is payment taken for my order?",
            answer:
              "Payment is taken during the checkout process when you pay for your order. The order number that appears on the confirmation screen indicates payment has been successfully processed.",
          },
          {
            id: "order",
            question: "How do I pay for my order?",
            answer:
              "We accept Visa®, MasterCard®, American Express®, and PayPal®. Our servers encrypt all information submitted to them, so you can be confident that your credit card information will be kept safe and secure.",
          },
          {
            id: "placing-order",
            question:
              "What should I do if I'm having trouble placing an order?",
            answer:
              "For any technical difficulties you are experiencing with our website, please contact us at our support portal, or you can call us toll-free at 1-000-000-000, or email us at order@companymail.com",
          },
          {
            id: "users-license",
            question:
              "Which license do I need for an end product that is only accessible to paying users?",
            answer:
              "If you have paying users or you are developing any SaaS products then you need an Extended License. For each products, you need a license. You can get free lifetime updates as well.",
          },
          {
            id: "subscription-review",
            question: "Does my subscription automatically renew?",
            answer:
              "No, This is not subscription based item.Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps.",
          },
        ],
      },
      delivery: {
        id: "delivery",
        title: "Delivery",
        icon: "tabler:briefcase",
        subtitle: "Get help with delivery",
        qandA: [
          {
            id: "ship-order",
            question: "How would you ship my order?",
            answer:
              "For large products, we deliver your product via a third party logistics company offering you the “room of choice” scheduled delivery service. For small products, we offer free parcel delivery.",
          },
          {
            id: "delivery-cost",
            question: "What is the delivery cost of my order?",
            answer:
              "The cost of scheduled delivery is $69 or $99 per order, depending on the destination postal code. The parcel delivery is free.",
          },
          {
            id: "product-damaged",
            question: "What to do if my product arrives damaged?",
            answer:
              "We will promptly replace any product that is damaged in transit. Just contact our support team, to notify us of the situation within 48 hours of product arrival.",
          },
        ],
      },
      cancellationReturn: {
        id: "cancellation-return",
        title: "Cancellation & Return",
        icon: "tabler:rotate-clockwise-2",
        subtitle: "Get help with cancellation & return",
        qandA: [
          {
            id: "cancel-order",
            question: "Can I cancel my order?",
            answer:
              "Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund. Parcel delivery orders cannot be cancelled, however a free return label can be provided upon request.",
          },
          {
            id: "product-return",
            question: "Can I return my product?",
            answer:
              "You can return your product within 15 days of delivery, by contacting our support team, All merchandise returned must be in the original packaging with all original items.",
          },
          {
            id: "return-status",
            question: "Where can I view status of return?",
            answer:
              "Locate the item from Your Orders. Select Return/Refund status",
          },
        ],
      },
    },
  };

  const [data, setData] = useState(apiData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("payment");
  // useEffect(() => {
  //   // if (searchTerm !== "") {
  //   //   axios
  //   //     .get("/pages/faqs", { params: { q: searchTerm } })
  //   //     .then((response) => {
  //   //       if (
  //   //         response.data.faqData &&
  //   //         Object.values(response.data.faqData).length
  //   //       ) {
  //   //         setData(response.data);

  //   //         // @ts-ignore
  //   //         setActiveTab(Object.values(response.data.faqData)[0].id);
  //   //       } else {
  //   //         setData(null);
  //   //       }
  //   //     });
  //   // } else {
  //   // }
  //   setData(apiData);
  // }, [apiData]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderNoResult = (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& svg": { mr: 2 },
      }}
    >
      <Icon fontSize="1.5rem" icon="tabler:alert-circle" />
      <Typography variant="h5">No Results Found!!</Typography>
    </Box>
  );
  return (
    <Fragment>
      <FaqHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {data !== null ? (
        <FAQS data={data} activeTab={activeTab} handleChange={handleChange} />
      ) : (
        renderNoResult
      )}
      <FaqFooter />
    </Fragment>
  );
};

// export async function getStaticProps() {
//   // const res = await axios.get("/pages/faqs");

//   return {
//     props: {
//       apiData,
//     },
//   };
// }

export default FAQ;
