import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    SimpleGrid,
    ModalFooter,
    Stack,
    Radio,
    RadioGroup,
  } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import baseAxios from "../../../utility/axiosConfig";





function Form({
    handleSubmit,packagedata, 
    priceId, errors, values,
    setFieldValue, touched, exterRealestete
  }) {
    const [checkoutId, setCheckoutId] = useState("")
    useEffect(()=>{
      baseAxios.post(
        `/checkout-id/${packagedata.id}/`
      )
      .then(res=>{
        setCheckoutId(res.data.data.id)
      })
      .catch(err=>{
        console.log(err)
      })
    }, [])

    const handleChange = (e)=>{
      let cardForm;
      let hyperpayForm;
      try {
        hyperpayForm = document.getElementsByClassName("wpwl-form")
        hyperpayForm[0].parentElement.remove()
        document.getElementById("form-container").innerHTML = `<form id="card-form" action="http://www.localhost:5173">
      
        </form>`
      } catch (error) {
        
      }
      cardForm = document.getElementById("card-form")
      if (!cardForm.classList.contains("paymentWidget")){
        cardForm.classList.add("paymentWidgets")
      }
      
      cardForm.setAttribute(
        "data-brands", e.target.value
      )
      // Load external script dynamically
    const script = document.createElement('script');
    script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    script.defer = true;
    document.head.appendChild(script);
    }
  return (
    
    <>
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
          <FormControl>
            <FormLabel
              color="secondary.600"
              fontWeight="semibold"
              fontSize="0.9rem"
            >
              Package price
            </FormLabel>
            <Input
              type="number"
              value={
                packagedata.pricing_approach ===
                "Based on number of real estate only"
                  ? values.price
                  : packagedata.default_price
              }
              ref={priceId}
              disabled
              color={"black"}
              fontWeight={"black"}
            />
          </FormControl>
          {packagedata.pricing_approach ===
            "Based on number of real estate only" || exterRealestete && (
            <FormControl isInvalid={errors.real_estate_number}>
              <FormLabel
                color="secondary.600"
                fontWeight="semibold"
                fontSize="0.9rem"
              >
                Number of Real Estate
              </FormLabel>
              <Input
                type="number"
                name="real_estate_number"
                value={values.real_estate_number}
                placeholder="Number of Real Estate"
                onChange={(e) => {
                  handleChange(e);
                  const { value } = e.target;
                  setFieldValue(
                    "price",
                    (
                      packagedata.price_per_real_estate * parseInt(value)
                    ).toString()
                  );
                }}
              />
            </FormControl>
          )}
        </SimpleGrid>
      </Box>
      <FormControl
        isInvalid={errors.payment_method && touched.payment_method}
        mb={3}
      >
        <FormLabel
          color="secondary.600"
          fontWeight="semibold"
          fontSize="0.9rem"
        >
          Payment Method
        </FormLabel>
        <RadioGroup
          onChange={(e) => {
            setFieldValue("payment_method", e);
          }}
          value={values.payment_method}
          name="payment_method"
        >
          <Stack direction="row">
            <Radio value="MADA" onChange={handleChange}>
              Mada
            </Radio>
            <Radio value="VISA MASTER" onChange={handleChange}>
              Credit Card
            </Radio>
            <Radio value="STC_PAY" onChange={handleChange}>
              STC Pay
            </Radio>
            <Radio value="APPLEPAY">
              Apple Pay
            </Radio>
          </Stack>
        </RadioGroup>
        </FormControl>
    </form>
    <div id="form-container">
    <form id="card-form" action="http://www.localhost:5173">
      
      </form>
    </div>
    
    </>
  );
}

export default Form;
