//AWS-AMPLIFY
import { API } from 'aws-amplify';
import {
    createUser,
    createRestaurant,
    createUserfriend, deleteUserfriend,
    createUserrestaurant, deleteUserrestaurant,
    createRestaurantuserreview, deleteRestaurantuserreview, editRestaurantuserreview,
    createRestaurantuserreviewpersonalization, deleteRestaurantuserreviewpersonalization, editRestaurantuserreviewpersonalization
} from '../../graphql/mutations';
//GATSBY
import { navigate } from 'gatsby';
//SWEETALERT2
import { successAlert, errorAlert } from '../../alerts';
//REDUX-TOOLKIT ( accessing redux outside react component )
import { store } from '../../toolkit/store';
import { changeIsLoading } from '../../toolkit/isLoadingSlice';







export const handleCreateUser = async(name: string) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));
    

    try {
        await API.graphql({
            query: createUser,
            variables: {
                name
            }
        });
    }
    catch(error) {
        console.log('error createuser:', error);
        //send text & error as parameter
        errorAlert('CreateUser', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleCreateRestaurant = async({ name, cuisine, address }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await API.graphql({
            query: createRestaurant,
            variables: {
                name,
                cuisine,
                address
            }
        });


        //send text as parameter
        successAlert('Registered');
        //routing back to welcome page
        navigate(-1);
    }
    catch(error) {
        console.log('error createrestaurant:', error);
        //send text & error as parameter
        errorAlert('CreateRestaurant', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







export const handleCreateUserfriend = async({ idFrom, idTo }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));
    

    try {
        await API.graphql({
            query: createUserfriend,
            variables: {
                idFrom,
                idTo
            }
        });
    }
    catch(error) {
        console.log('error createuserfriend:', error);
        //send text & error as parameter
        errorAlert('CreateUserfriend', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleDeleteUserfriend = async({ idFrom, idTo }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));
    

    try {
        await API.graphql({
            query: deleteUserfriend,
            variables: {
                idFrom,
                idTo
            }
        });
    }
    catch(error) {
        console.log('error deleteuserfriend:', error);
        //send text & error as parameter
        errorAlert('DeleteUserfriend', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







export const handleCreateUserrestaurant = async({ idFrom, idTo }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));
    

    try {
        await API.graphql({
            query: createUserrestaurant,
            variables: {
                idFrom,
                idTo
            }
        });
    }
    catch(error) {
        console.log('error createuserrestaurant:', error);
        //send text & error as parameter
        errorAlert('CreateUserrestaurant', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleDeleteUserrestaurant = async({ idFrom, idTo }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));
    

    try {
        await API.graphql({
            query: deleteUserrestaurant,
            variables: {
                idFrom,
                idTo
            }
        });
    }
    catch(error) {
        console.log('error deleteuserrestaurant:', error);
        //send text & error as parameter
        errorAlert('DeleteUserrestaurant', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







export const handleCreateRestaurantuserreview = async({ idFrom, idTo, hisName, text }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await API.graphql({
            query: createRestaurantuserreview,
            variables: {
                idFrom,
                idTo,
                hisName,
                text
            }
        });


        //send text as parameter
        successAlert('Reviewed');
    }
    catch(error) {
        console.log('error createRestaurantuserreview:', error);
        //send text & error as parameter
        errorAlert('CreateRestaurantuserreview', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleDeleteRestaurantuserreview = async({ idFrom, idTo }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));

    try {
        await API.graphql({
            query: deleteRestaurantuserreview,
            variables: {
                idFrom,
                idTo
            }
        });
    }
    catch(error) {
        console.log('error deleteRestaurantuserreview:', error);
        //send text & error as parameter
        errorAlert('DeleteRestaurantuserreview', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleEditRestaurantuserreview = async({ idFrom, idTo, text }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await API.graphql({
            query: editRestaurantuserreview,
            variables: {
                idFrom,
                idTo,
                text
            }
        });
    }
    catch(error) {
        console.log('error editRestaurantuserreview:', error);
        //send text & error as parameter
        errorAlert('EditRestaurantuserreview', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}







export const handleCreateRestaurantuserreviewpersonalization = async({ idFrom, idTo, hisId, hisName, useful }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await API.graphql({
            query: createRestaurantuserreviewpersonalization,
            variables: {
                idFrom,
                idTo,
                hisId,
                hisName,
                useful
            }
        });


        //send text as parameter
        successAlert('Rated');
    }
    catch(error) {
        console.log('error createRestaurantuserreviewpersonalization:', error);
        //send text & error as parameter
        errorAlert('CreateRestaurantuserreviewpersonalization', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleDeleteRestaurantuserreviewpersonalization = async({ idFrom, idTo, hisId }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await API.graphql({
            query: deleteRestaurantuserreviewpersonalization,
            variables: {
                idFrom,
                idTo,
                hisId
            }
        });
    }
    catch(error) {
        console.log('error deleteRestaurantuserreviewpersonalization:', error);
        //send text & error as parameter
        errorAlert('DeleteRestaurantuserreviewpersonalization', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}

export const handleEditRestaurantuserreviewpersonalization = async({ idFrom, idTo, hisId, useful }) => {
    //dispatching redux, for start loading
    store.dispatch(changeIsLoading(true));


    try {
        await API.graphql({
            query: editRestaurantuserreviewpersonalization,
            variables: {
                idFrom,
                idTo,
                hisId,
                useful
            }
        });
    }
    catch(error) {
        console.log('error editRestaurantuserreviewpersonalization:', error);
        //send text & error as parameter
        errorAlert('EditRestaurantuserreviewpersonalization', error.errors[0].message);
    }


    //dispatching redux, for stop loading
    store.dispatch(changeIsLoading(false));
}
