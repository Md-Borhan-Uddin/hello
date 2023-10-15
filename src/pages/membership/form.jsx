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
import { useRef } from "react";






function Form({
    handleSubmit,handleChange,packagedata, 
    priceId, errors, values, onClose,
    handleMembership,setFieldValue, touched, exterRealestete
  }) {
  return (
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
            console.log(values);
          }}
          value={values.payment_method}
          name="payment_method"
        >
          <Stack direction="row">
            <Radio value="mada" onChange={handleChange}>
              Mada
            </Radio>
            <Radio value="credit" onChange={handleChange}>
              Credit Card
            </Radio>
            <Radio value="STC" onChange={handleChange}>
              STC Pay
            </Radio>
            <Radio value="Apple" onChange={handleChange}>
              Apple Pay
            </Radio>
          </Stack>
        </RadioGroup>
        {errors.payment_method && touched.payment_method ? (
          <FormErrorMessage>{errors.payment_method}</FormErrorMessage>
        ) : null}
      </FormControl>

      <Box mb={2}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {values.payment_method === "STC" && (
            <FormControl
              isInvalid={errors.mobile_number && touched.mobile_number}
            >
              <FormLabel
                color="secondary.600"
                fontWeight="semibold"
                fontSize="0.9rem"
              >
                Mobile Number
              </FormLabel>
              <Input
                type="text"
                name="mobile_number"
                value={values.mobile_number}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
              {errors.mobile_number && touched.mobile_number ? (
                <FormErrorMessage>{errors.mobile_number}</FormErrorMessage>
              ) : null}
            </FormControl>
          )}
        </SimpleGrid>
      </Box>
      {(values.payment_method === "mada" ||
        values.payment_method === "credit") && (
        <Box mb={2}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <FormControl
              isInvalid={errors.card_holder_name && touched.card_holder_name}
            >
              <FormLabel
                color="secondary.600"
                fontWeight="semibold"
                fontSize="0.9rem"
              >
                Card Holder Name
              </FormLabel>
              <Input
                type="text"
                name="card_holder_name"
                value={values.card_holder_name}
                onChange={handleChange}
                placeholder="Card Holder Name"
              />
              {errors.card_holder_name && touched.card_holder_name ? (
                <FormErrorMessage>{errors.card_holder_name}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.card_number && touched.card_number}>
              <FormLabel
                color="secondary.600"
                fontWeight="semibold"
                fontSize="0.9rem"
              >
                Card Number
              </FormLabel>
              <Input
                type="text"
                name="card_number"
                value={values.card_number}
                onChange={handleChange}
                placeholder="Card number"
              />
              {errors.card_number && touched.card_number ? (
                <FormErrorMessage>{errors.card_number}</FormErrorMessage>
              ) : null}
            </FormControl>

            <FormControl isInvalid={errors.expire_date && touched.expire_date}>
              <FormLabel
                color="secondary.600"
                fontWeight="semibold"
                fontSize="0.9rem"
              >
                Expiration Date
              </FormLabel>
              <Input
                type="month"
                name="expire_date"
                value={values.expire_date}
                onChange={handleChange}
                placeholder="Expiration Date"
              />
              {errors.expire_date && touched.expire_date ? (
                <FormErrorMessage>{errors.expire_date}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={errors.cvv}>
              <FormLabel
                color="secondary.600"
                fontWeight="semibold"
                fontSize="0.9rem"
              >
                CVV
              </FormLabel>
              <Input
                type="text"
                name="cvv"
                value={values.cvv}
                onChange={handleChange}
                placeholder="CVV"
                maxLength="3"
              />
              {errors.cvv && touched.cvv ? (
                <FormErrorMessage>{errors.cvv}</FormErrorMessage>
              ) : null}
            </FormControl>
          </SimpleGrid>
        </Box>
      )}

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>

        <Button
          type="submit"
          variant="outline"
          colorScheme="primary"
          transition="ease-in-out 0.5s"
          _hover={{ bgColor: "primary.600", color: "#fff" }}
          onClick={handleMembership}
        >
          Pay
        </Button>
      </ModalFooter>
    </form>
  );
}

export default Form;
