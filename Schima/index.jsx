import * as Yup from 'yup'

export const changePasswordSchima = Yup.object({
  new_password: Yup.string().min(8).max(20).required('Enter Password').matches(
    /^(?=.*[a-z])/,
    " Must Contain One Lowercase Character"
  )
  .matches(
    /^(?=.*[A-Z])/,
    "  Must Contain One Uppercase Character"
  )
  .matches(
    /^(?=.*[0-9])/,
    "  Must Contain One Number Character"
  )
  .matches(
    /^(?=.*[!@#\$%\^&\*])/,
    "  Must Contain  One Special Case Character"
  ),
  confirm_password: Yup.string().min(8).max(20).oneOf([Yup.ref('new_password'),null],"Password Don't Match").required('Enter Password again').required('Enter Password again')
})

export const registrationSchima = Yup.object({
    first_name: Yup.string().max(10,"Maximum 10 Character").required('Enter First Name '),
    last_name: Yup.string().max(10,"Maximum 10 Character").required('Enter Last Name'),
    middle_name: Yup.string().max(10,"Maximum 10 Character").optional(),
    username: Yup.string().max(20, "Maximum 20 Character").required('Enter username'),
    email: Yup.string().max(50, "Maximum 50 Character").email().required('Enter Email').matches(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
    "wrong Email format"),
    mobile_number: Yup.string().required('Enter The Mobile Number'),//.matches(/^(\d{2})\s(\d{3})\s(\d{4})$/,'Invalid phone Number'),
    password: Yup.string().min(8).max(20).required('Enter Password').matches(
        /^(?=.*[a-z])/,
        " Must Contain One Lowercase Character"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "  Must Contain One Uppercase Character"
      )
      .matches(
        /^(?=.*[0-9])/,
        "  Must Contain One Number Character"
      )
      .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        "  Must Contain  One Special Case Character"
      ),
    password2: Yup.string().min(8).max(20).oneOf([Yup.ref('password'),null],"Password Don't Match").required('Enter Password again')
})


export const userEditSchima = Yup.object({
  first_name: Yup.string().max(10,"Maximum 10 Character").required('Enter First Name '),
  last_name: Yup.string().max(10,"Maximum 10 Character").required('Enter Last Name'),
  middel_name: Yup.string().max(10,"Maximum 10 Character").optional(),
  email: Yup.string().max(50, "Maximum 50 Character").email().required('Enter Email'),
  mobile_number: Yup.string(),
  
})


export const loginSchima = Yup.object({
  username:Yup.string().required("Enter Username"),
  password:Yup.string().required("Enter password"),
})



function checkIfFilesAreCorrectTypeAdd(file) {
  
  let valid = true

    if (file) {
      if (!['image/jpg','image/jfif','image/pjpeg','image/pjp','image/gif', 'image/jpeg', 'image/png'].includes(file.type)) {
        valid = false
      }
    }
  
  
  return valid
}





export const propertyAddSchima = Yup.object({
  name: Yup.string().max(100).required("Must Fill This Field"),
  photo: Yup.mixed().test(
    'filetype',
    "Only the following formats are accepted:(.jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png)",
    checkIfFilesAreCorrectTypeAdd
  ).optional(),
  country: Yup.string().required("Must Fill This Field"),
  city: Yup.string().required("Must Fill This Field"),
  type_id: Yup.string().required("Must Fill This Field"),
  property_age_years: Yup.number().max(999).required("Must Fill This Field"),
  property_age_months: Yup.number().optional(),
  rented: Yup.string().required("Must Fill This Field"),
  owner: Yup.string().required("Must Fill This Field"),
  purchasing_cost: Yup.number().required("Must Fill This Field"),
  cost_currency: Yup.string().required("Must Fill This Field"),
  cost_date: Yup.date(),
  purpose: Yup.string().required("Must Fill This Field"),
  number_of_floors: Yup.number().required("Must Fill This Field"),
  invoice_file: Yup.mixed().optional()
  .test(
    'filetype',
    "Only the following formats are accepted:(.jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png)",
    checkIfFilesAreCorrectTypeAdd
  ),
  user_id: Yup.string().optional()
})




const blobUrlToFile = (blobUrl) => new Promise((resolve) => {
  fetch(blobUrl).then((res) => {
    res.blob().then((blob) => {
      // please change the file.extension with something more meaningful
      // or create a utility function to parse from URL
      const file = new File([blob], 'file.extension', {type: blob.type})
      resolve(file)
      return file
    })
  })
  
})


function checkFileType(file) {
  
  let valid = true
  if (file) {
  blobUrlToFile(file).then(res=>{

    
      if (!['image/jpg','image/jfif','image/pjpeg','image/pjp','image/gif', 'image/jpeg', 'image/png'].includes(res.type)) {
        valid = false
      }
    })
    
  }
  return valid
}



export const propertyEditSchima = Yup.object({
  name: Yup.string().max(100).required("Must Fill This Field"),
  photo: Yup.mixed().optional().test(
    'filetype',
    "Only the following formats are accepted:(.jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png)",
    checkFileType
  ).optional(),
  country: Yup.string().required("Must Fill This Field"),
  city: Yup.string().required("Must Fill This Field"),
  type_id: Yup.string().required("Must Fill This Field"),
  property_age_years: Yup.number().max(999).required("Must Fill This Field"),
  property_age_months: Yup.number().optional(),
  rented: Yup.string().required("Must Fill This Field"),
  owner: Yup.string().required("Must Fill This Field"),
  purchasing_cost: Yup.number().required("Must Fill This Field"),
  cost_currency: Yup.string().required("Must Fill This Field"),
  cost_date: Yup.date(),
  purpose: Yup.string().required("Must Fill This Field"),
  number_of_floors: Yup.number().required("Must Fill This Field"),
  invoice_file: Yup.mixed().optional()
  .test(
    'filetype',
    "Only the following formats are accepted:(.jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png)",
    checkFileType
  ),
  user_id: Yup.string().optional()
})



export const categoryANDBrandSchima = Yup.object({
  name:Yup.string().max(20),
  is_active: Yup.bool().optional()
})

export const countrySchima = Yup.object({
  name:Yup.string(),
})

export const citySchima = Yup.object({
  name:Yup.string(),
  country_id:Yup.number(),
})


export const packageSchima = Yup.object({
  name: Yup.string().max(20).required("Must Fill This Field"),
  description: Yup.string().required("Must Fill This Field"),
  duration_date: Yup.number().required("Must Fill This Field"),
  duration_month: Yup.number().required("Must Fill This Field"),
  is_free: Yup.bool().required("Must Fill This Field"),
  is_active: Yup.bool().required("Must Fill This Field"),
  pricing_approach: Yup.string().required("Must Fill This Field"),
  default_price: Yup.number().required("Must Fill This Field"),
  default_real_estate_number: Yup.number().required("Must Fill This Field"),
  is_renewal: Yup.bool().required("Must Fill This Field"),
  enabling_adding_extra_real_estate: Yup.bool().required("Must Fill This Field"),
  price_per_real_estate: Yup.number().required("Must Fill This Field"),
  feature:Yup.array(),

})



export const paymentSchima = Yup.object({
  package_id: Yup.number().optional(),
  payment_method: Yup.string(),
  real_estate_number: Yup.number().min(1,'Please Enter a Value More than 0'),
  card_number: Yup.number(),//.test('len','Must be 16 characters',val=>val.toString().length === 16),
  card_holder_name: Yup.string(),
  expaire_date: Yup.date(),
  cvv:Yup.number(),//.test('len','Must be 3 characters',val=>val.toString().length === 3),
  mobile_number: Yup.string(),

})



export const scheduleSchima = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
  real_estate_id: Yup.number(),
  asset_id: Yup.number(),
  is_reminder: Yup.bool(),
  maintain_date: Yup.date(),
  reminder_date: Yup.date(),
  status: Yup.string(),
  invoice_file: Yup.mixed().optional()
  .test(
    'filetype',
    "Only the following formats are accepted:(.jpg , .jpeg , .jfif , .pjpeg , .pjp , .gif , .png)",
    checkFileType
  ),

  
});