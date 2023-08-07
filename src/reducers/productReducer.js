
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL
} from "../constant/productConstant";

// get all products 

export const productsReducer = (state = { products: [] }, action) => {
           switch(action.type){
            // if i get product request from clint site then i set loading true and also return empty product objet

             case ALL_PRODUCT_REQUEST:
                  return{
                     loading:true,
                     products:[]
                  }
                //   if the request is success then set loading false and return product 
             case ALL_PRODUCT_SUCCESS:
                  return{
                     loading:false,
                     products:action.payload.products,
                     productsCount:action.payload.productsCount,
                     resultPerPage:action.payload.resultPerPage,
                     filteredProductsCount:action.payload.filteredProductsCount,
                  }
             case ALL_PRODUCT_FAIL:
                  return{
                     loading:false,
                     error:action.payload
                  }

             case CLEAR_ERRORS:
                  return{
                     ...state,
                     error:null,
                  }

              default:
                 return state;    
           }
  };
  

//   for single product details 
export const productDetailsReducer = (state = { product: {} }, action) => {
   switch(action.type){
    // if i get product request from clint site then i set loading true and also return empty product objet

     case PRODUCT_DETAILS_REQUEST:
          return{
             loading:true,
             ...state,
          }
        //   if the request is success then set loading false and return product 
     case PRODUCT_DETAILS_SUCCESS:
          return{
             loading:false,
             product:action.payload,
             
          }
     case PRODUCT_DETAILS_FAIL:
          return{
             loading:false,
             error:action.payload
          }

     case CLEAR_ERRORS:
          return{
             ...state,
             error:null,
          }

      default:
         return state;    
   }
};

// product new review request 
export const newReviewReducer = (state = {},action) =>{
     switch(action.type){
 
       case NEW_REVIEW_REQUEST:
         return{
            ...state,
            loading:true

         }
      case NEW_REVIEW_SUCCESS:
         return{
            loading:false,
            success:action.payload
         }   
      case NEW_REVIEW_RESET:
         return{
            ...state,
            success:false

         } 
      case NEW_REVIEW_FAIL:
         return{
            ...state,
            loading:false,
            error:action.payload
         }
      case CLEAR_ERRORS:
         return{
            ...state,
            error:null
         }        
         default:
            return state;


     }
}