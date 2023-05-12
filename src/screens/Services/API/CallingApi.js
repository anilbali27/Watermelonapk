/** @format */

import api from "../apiservice";

/*
/Watermelon Suppliers API Start here
*/

//Forgot Password API
const ForgotPassword = async (api_url, data) => {
  const response = await api.post(api_url, data);

  return response.data;
};

//getParticularProduct
const getParticularProduct = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//getInvoice

const getInvoice = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//signup
const createSupplier = async (api_url, data) => {
  const response = await api.post(api_url, data);
  return response.data;
};
// const createSupplier = async (access_token: any,api_url:any,data:any) => {
//   const response = await api.get(api_url,data, {
//     headers: {
//       'Authorization': `Bearer ${access_token}`
//     }
//   });
//   // console.log("GetAllRestaurant RESULTS::", response.data);
//   return response.data;
// };
//Add Catelogue
const createProduct = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//Login Api
const Login = async (api_url, data) => {
  const response = await api.post(api_url, data);

  return response.data;
};
//getCategory
const getAllCategory = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//createTier
const createtier = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.message, "CFTRDGH");
  return response.data;
};
//getProduct
const getProduct = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//Filter by order
const getFilter = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//getorders
const getorders = async (token, api_url, data) => {
  console.log(token, api_url, data, "prajju");
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//getTier
const getTier = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//getReviews
const getReviews = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//getAllSubCategory

const getAllSubCategory = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//getCatelogue
const getCatelogue = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//gethashtag
const gethashtag = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//getSKUS
const getSKUS = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//getUOM
const getUOM = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
const ChangePassword = async (token, api_url, data) => {
  console.log(data, api_url, "tok678en");
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//getCountry
const getCountry = async (token, api_url, data) => {
  console.log(data, api_url, "tok678en");
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Refresh token
const RefreshTokenGenerator = async (emailId, password) => {
  const response = await api.post(
    `UserRegistration/RefreshToken/refreshToken`,
    JSON.stringify({
      userName: emailId,
      password: password,
    })
  );
  return response.data;
};

//Edittier
const edittier = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data.message, "CFTRDGH");
  return response.data;
};

//Create User
const createUser = async (token, api_url, data) => {
  console.log(token, api_url, data, "prajju");
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //console.log(response.data,"CFTRDGH")
  return response.data;
};

const CreateMasterData = async (type, access_token, data) => {
  // Alert.alert('OrderI')
  const response = await api.post(type, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

//Update User
const updateUser = async (token, api_url, data) => {
  console.log(token, api_url, data, "prajju");
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//getProfile

const getProfile = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//orderss
const getorderslist = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//importProductCSV
const addfile = async (token, api_url, data) => {
  console.log(token, api_url, data, "prajju");
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//get payments
const getPayments = async (type, access_token, data) => {
  // Alert.alert('OrderI')
  const response = await api.post(type, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

//get outlets_list
// const getOutletsList = async (type, access_token, data) => {
//   // Alert.alert('OrderI')
//   const response = await api.post(type, data, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

const getOutletsList = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//update product
const updateProduct = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//get subCatalogue list

const getsubCatalogueList = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//get Invoices Details
const getInvoiceDetails = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//get dashboard details

const getDashboardDetails = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//subcatalogue
const getsubCatList = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//add subcatalogue

const createSubCatalogue = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//changeStatus
const changeStatus = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//getWarehouse
const getWarehouse = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//update subcatlogue
const updateSubcatalogue = async (token, api_url, data) => {
  const response = await api.post(api_url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  ForgotPassword,
  ChangePassword,
  Login,
  getSKUS,
  getUOM,
  getCountry,
  createSupplier,
  gethashtag,
  createProduct,
  getAllSubCategory,
  getAllCategory,
  getCatelogue,
  CreateMasterData,
  getProduct,
  createtier,
  getTier,
  getParticularProduct,
  edittier,
  createUser,
  updateUser,
  getProfile,
  addfile,
  getPayments,
  getorders,
  updateProduct,
  getReviews,
  getOutletsList,
  getorderslist,
  getsubCatalogueList,
  getDashboardDetails,
  getInvoiceDetails,
  getsubCatList,
  createSubCatalogue,
  updateSubcatalogue,
  getFilter,
  getInvoice,
  changeStatus,
  getWarehouse

};
