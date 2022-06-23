import React, { useContext, useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "styled-components";
import * as globalConstants from "../globals/globalConstants";

import * as globalStyles from "../globals/globalStyles";

import { GlobalStateContext } from "../globals/globalContextProvider";
import { graphql } from "gatsby";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

// import Dialog, {
//   DialogHeader,
//   DialogBody,
//   YesNoButtons,
// } from "../components/Dialog"
// import ShowDrawersBackDrop from "../components/ShowDrawersBackdrop"

const ContentContainer = styled.div`
   position: fixed;
   display: flex;
   margin-top: 8em;
   width: 100%;
   z-index: 1;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   @media ${({ theme }) => theme.currentDevice.laptop} {
   }
`;

const FormContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const FieldContainer = styled.div`
   margin-top: -0.1rem;
`;

const InputField = styled.fieldset`
   border: 1px solid ${({ error }) => (error ? "red" : "white")};
   border-radius: 5px;
   margin: -0.1rem 0;
   width: 21em;
   @media ${({ theme }) => theme.currentDevice.tablet} {
   }
   &:hover {
      border-color: ${({ theme, error }) =>
         error
            ? theme.colors.errorFieldHoverBorderColor
            : theme.colors.fieldHoverColor};
   }

   legend {
      padding: 0 7px;
      color: white;
   }

   Input {
      background-color: hsl(0, 0%, 15%);
      color: white;
      border: none;
      width: 100%;
      :focus {
         outline: none;
      }
   }

   TextArea {
      background-color: hsl(0, 0%, 15%);
      font-family: "Roboto";
      font-weight: 500;
      color: white;
      border: none;
      width: 100%;
      :focus {
         outline: none;
      }
   }
`;

const Input = styled.input``;

const TextArea = styled.textarea`
   height: 6em;
   resize: none;
`;

const FieldErrorText = styled.label`
   margin: 0.7em;
   padding: 0;
   color: red;
   font-size: 0.8em;
`;

const SendButtonAndMandatoryText = styled.div`
   margin-top: 0.3em;
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

const SendButton = styled(globalStyles.Button)``;

const MandatoryText = styled.div``;

const ShowImage = styled(GatsbyImage)`
   max-width: 375px;
   width: 23em;

   @media ${({ theme }) => theme.currentDevice.mobileS} {
      display: none;
   }
   @media ${({ theme }) => theme.currentDevice.mobileL} {
      display: none;
   }
   @media ${({ theme }) => theme.currentDevice.tablet} {
      display: block;
      margin-left: 1em;
   }
   @media ${({ theme }) => theme.currentDevice.laptop} {
   }
`;

// function phoneStyles(what, error, hover) {
function phoneStyles(what) {
   let styleObject = null;
   switch (what) {
      case "phoneContainerStyle":
         styleObject = {
            width: "14em",
            border: "none",
            marginTop: "-0.5em",
            marginBottom: "-0.3em",
         };
         break;
      case "phoneInputStyle":
         styleObject = {
            backgroundColor: globalStyles.globalTheme.colors.darkGrayColor,
            width: "15em",
            color: globalStyles.globalTheme.colors.whiteColor,
            border: "none",
         };
         break;
      case "phoneButtonStyle":
         styleObject = {
            backgroundColor: globalStyles.globalTheme.colors.darkGrayColor,
            border: "none",
         };
         break;
      case "phoneDropdownStyle":
         styleObject = {
            backgroundColor: globalStyles.globalTheme.colors.lightGrayColor,
            color: globalStyles.globalTheme.colors.blackColor,
            fontWeight: "bold",
         };
         break;
      case "phoneCountryStyle":
         styleObject = {
            marginLeft: "13px",
            color: globalStyles.globalTheme.colors.lightGrayColor,
            pointerEvents: "none",
         };
         break;
      case "phoneErrorHelperTextStyle":
         styleObject = {
            marginLeft: "13px",
            marginTop: "3px",
            fontSize: "12.5px",
            color: globalStyles.globalTheme.colors.errorFieldColor,
            pointerEvents: "none",
            marginBottom: 0,
         };
         break;

      default:
         break;
   }
   return styleObject;
}

const defaultValues = {
   contactName: "",
   companyName: "",
   companyWebsite: "",
   phoneNumber: "",
   email: "",
   address: "",
   message: "",
};

const defaultErrorValuesRef = {
   contactName: "",
   companyName: "",
   companyWebsite: "",
   phoneNumber: "",
   email: "",
   address: "",
   message: "",
};
// const countryDefaultValues = {
//   countryCode: "",
//   dialCode: "",
//   format: "",
//   name: "",
// }

const initialTouchedOrError = {
   contactName: false,
   companyName: false,
   companyWebsite: false,
   phoneNumber: false,
   email: false,
   address: false,
   message: false,
};

const requiredFields = {
   contactName: true,
   companyName: true,
   companyWebsite: false,
   phoneNumber: false,
   email: true,
   address: false,
   message: true,
};

const contactName = "contactName";
const companyName = "companyName";
const companyWebsite = "companyWebsite";
const phoneNumber = "phoneNumber";
const email = "email";
const address = "address";
const message = "message";

const Contact = ({ data }) => {
   const { globalState, globalDispatch } = React.useContext(GlobalStateContext);

   const [formValues, setFormValues] = useState(defaultValues);
   const [touched, setTouched] = useState(initialTouchedOrError);
   //   const [country, setCountry] = useState(countryDefaultValues)
   const [disableSendButton, setDisableSendButton] = useState(false);
   const [forceRender, setForceRender] = useState(false);
   // By changing this state value, as any other, a render will be forced

   const errorMessagesRefValues = useRef(defaultErrorValuesRef);

   //   const [canShowDialogLeavingPage, setCanShowDialogLeavingPage] =
   //     useState(false)

   //   const [showDialogLeavingPage, confirmNavigation, cancelNavigation] =
   //     useNavigatingAway(canShowDialogLeavingPage)

   let errorsForStyling = errorMessagesRefValues.current;

   useEffect(() => {
      globalDispatch({
         type: globalConstants.setCurrentComponent,
         currentComponent: globalConstants.contactPath,
      });
      globalDispatch({ type: globalConstants.notFirstTimeInApp });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   for (let key in errorsForStyling) {
      errorsForStyling[key] =
         touched[key] && formValues[key].length !== 0
            ? errorsForStyling[key]
            : "";
   }

   const handleInputChange = (e) => {
      let { name, value } = e.target;
      setFormValues({
         ...formValues,
         [name]: value,
      });
      if (value === "") {
         setTouched({
            ...touched,
            [name]: false,
         });
      } else {
         setTouched({
            ...touched,
            [name]: true,
         });
      }
   };

   //   const [hoverPhone, setHoverPhone] = useState(false)

   //   function handlePhoneChange(value, country) {
   function handlePhoneChange(value) {
      setFormValues({
         ...formValues,
         phoneNumber: value,
      });
      if (value === "") {
         setTouched({
            ...touched,
            [phoneNumber]: false,
         });
      } else {
         setTouched({
            ...touched,
            [phoneNumber]: true,
         });
      }
   }

   function checkFieldWithRegex(field) {
      const fullNameRE = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
      const emailRE = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/u;
      const websiteRE =
         /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
      const phoneNumberRE =
         /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/g;
      const companyNameRE = /(.|\s)*\S(.|\s)*/;
      const addressRE = /(.|\s)*\S(.|\s)*/;
      const messageRE = /(.|\s)*\S(.|\s)*/;
      const noError = true;
      let result = noError;
      switch (field) {
         case contactName:
            result = new RegExp(fullNameRE).test(formValues[field]);
            break;
         case email:
            result = new RegExp(emailRE).test(formValues[field]);
            break;
         case companyWebsite:
            result = new RegExp(websiteRE).test("http://" + formValues[field]);
            break;
         case phoneNumber:
            result = new RegExp(phoneNumberRE).test(formValues[field]);
            break;
         case message:
            result = new RegExp(messageRE).test(formValues[field]);
            break;
         case companyName:
            result = new RegExp(companyNameRE).test(formValues[field]);
            break;
         case address:
            result = new RegExp(addressRE).test(formValues[field]);
            break;
         default:
            break;
      }

      return result;
   }

   function getErrorFieldHelperText(errorField) {
      switch (errorField) {
         case contactName:
            return "Please, complete a valid Contact Name";

         case companyWebsite:
            return "Please, complete a valid Company Website";

         case companyName:
            return "Please, complete a valid Company Name";

         case phoneNumber:
            return "Please, complete a valid phone number";

         case email:
            return "Please, complete a valid email";

         case address:
            return "Please, complete a valid Company Address";

         case message:
            return "Please, complete a valid message";

         default:
            return "";
      }
   }

   function validateField(field) {
      const error = false,
         noError = true;
      let validateFieldResult = noError;
      switch (field) {
         case contactName:
            if (formValues.contactName.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(contactName);
            }
            break;
         case companyName:
            if (formValues.companyName.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(companyName);
            }
            break;
         case companyWebsite:
            if (formValues.companyWebsite.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(companyWebsite);
            }
            break;
         case phoneNumber:
            if (formValues.phoneNumber.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(phoneNumber);
            }
            break;
         case email:
            if (formValues.email.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(email);
            }
            break;
         case address:
            if (formValues.address.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(address);
            }
            break;
         case message:
            if (formValues.message.length === 0) {
               validateFieldResult = error;
            } else {
               validateFieldResult = checkFieldWithRegex(message);
            }
            break;
         default:
            break;
      }
      let prevError = errorMessagesRefValues.current[field];
      if (!validateFieldResult) {
         errorMessagesRefValues.current[field] = getErrorFieldHelperText(field);
      } else {
         errorMessagesRefValues.current[field] = "";
      }
      if (prevError !== errorMessagesRefValues.current[field])
         setForceRender(!forceRender);
      return validateFieldResult;
   }

   useEffect(
      () => {
         let fieldValidations = [];
         Object.keys(touched).forEach((field) => {
            fieldValidations.push({ field, valid: validateField(field) });
         });

         setDisableSendButton(
            fieldValidations.some((fieldValidations) => {
               return (
                  requiredFields[fieldValidations.field] &&
                  !fieldValidations.valid
               );
            })
         );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [formValues]
   );

   function handleSubmit() {
      // console.log(formValues)
   }
   return (
      <ContentContainer>
         <globalStyles.BackgroundText>Contact Us</globalStyles.BackgroundText>

         {/* <Dialog
        show={showDialogLeavingPage}
        setShow={setCanShowDialogLeavingPage}
        dialogButtons={YesNoButtons}
        responseYes={confirmNavigation}
        responseNo={cancelNavigation}
      >
        <DialogHeader>You're trying to leave this page</DialogHeader>
        <DialogBody>
          Your changes could be lost. Are you sure you want to proceed?
        </DialogBody>
      </Dialog>
      {showDialogLeavingPage && (
        <ShowDrawersBackDrop closeDrawer={cancelNavigation} />
      )} */}

         <FormContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[contactName] &&
                     errorMessagesRefValues.current.contactName !== ""
                  }
               >
                  <legend>Contact Name *</legend>
                  <Input
                     type="text"
                     name={contactName}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter your full Name"
                     value={formValues.name}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[contactName] &&
                     errorMessagesRefValues.current.contactName}
               </FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[companyName] &&
                     errorMessagesRefValues.current.companyName !== ""
                  }
               >
                  <legend>Company Name *</legend>
                  <Input
                     type="text"
                     name={companyName}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter the company Name"
                     value={formValues.company}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[companyName] &&
                     errorMessagesRefValues.current.companyName}
               </FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[companyWebsite] &&
                     errorMessagesRefValues.current.companyWebsite !== ""
                  }
               >
                  <legend>Company Website</legend>
                  <Input
                     type="text"
                     name={companyWebsite}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter the company Website"
                     value={formValues.website}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[companyWebsite] &&
                     errorMessagesRefValues.current.companyWebsite}
               </FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[phoneNumber] &&
                     errorMessagesRefValues.current.phoneNumber !== ""
                  }
               >
                  <legend>Phone</legend>

                  <PhoneInput
                     id="phoneNumberContainer"
                     placeholder="Enter your Phone Number"
                     name={phoneNumber}
                     country="us"
                     value={formValues.phoneNumber}
                     containerStyle={phoneStyles(
                        "phoneContainerStyle"
                        // touched[phoneNumber] &&
                        //   errorMessagesRefValues.current.phoneNumber !== "",
                        // hoverPhone
                     )}
                     inputStyle={phoneStyles(
                        "phoneInputStyle"
                        // touched[phoneNumber] &&
                        //   errorMessagesRefValues.current.phoneNumber !== "",
                        // hoverPhone
                     )}
                     buttonStyle={phoneStyles(
                        "phoneButtonStyle"
                        // touched[phoneNumber] &&
                        //   errorMessagesRefValues.current.phoneNumber !== "",
                        // hoverPhone
                     )}
                     dropdownStyle={phoneStyles(
                        "phoneDropdownStyle"
                        // touched[phoneNumber] &&
                        //   errorMessagesRefValues.current.phoneNumber !== "",
                        // hoverPhone
                     )}
                     onChange={(value, country) =>
                        handlePhoneChange(value, country)
                     }
                  />
               </InputField>
               <FieldErrorText>
                  {touched[phoneNumber] &&
                     errorMessagesRefValues.current.phoneNumber}
               </FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[email] &&
                     errorMessagesRefValues.current.email !== ""
                  }
               >
                  <legend>E Mail *</legend>
                  <Input
                     type="text"
                     name={email}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter your email"
                     value={formValues.email}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[email] && errorMessagesRefValues.current.email}
               </FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField>
                  <legend>Address</legend>
                  <Input
                     type="text"
                     name={address}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter your address"
                     value={formValues.address}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText></FieldErrorText>
            </FieldContainer>
            <FieldContainer>
               <InputField
                  error={
                     touched[message] &&
                     errorMessagesRefValues.current.message !== ""
                  }
               >
                  <legend>Message *</legend>
                  <TextArea
                     type="textarea"
                     name={message}
                     autoComplete="new-password"
                     size="50"
                     placeholder="Enter message"
                     value={formValues.message}
                     onChange={handleInputChange}
                  />
               </InputField>
               <FieldErrorText>
                  {touched[message] && errorMessagesRefValues.current.message}
               </FieldErrorText>
            </FieldContainer>
            <SendButtonAndMandatoryText>
               <SendButton
                  disabled={disableSendButton}
                  type="submit"
                  onClick={handleSubmit}
               >
                  SEND
               </SendButton>
               <MandatoryText>* = mandatory field</MandatoryText>
            </SendButtonAndMandatoryText>
         </FormContainer>
         <ShowImage image={getImage(data.file)} alt="Example Gatsby Image" />
      </ContentContainer>
   );
};

export default Contact;

export const otherImageQuery = graphql`
   query {
      file(relativePath: { eq: "vikingBack.jpg" }) {
         childImageSharp {
            gatsbyImageData(
               quality: 100
               layout: CONSTRAINED
               placeholder: BLURRED
            )
         }
      }
   }
`;
