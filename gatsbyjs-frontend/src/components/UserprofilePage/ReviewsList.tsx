import React, { useState, useEffect } from 'react';
//MATERIAL-UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectIsUserSignedin } from '../../toolkit/isUserSignedinSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
import { selectHoldNameOfUserUntilSignedIn } from '../../toolkit/holdNameOfUserUntilSignedInSlice';
//GATSBY
import { navigate } from 'gatsby';
//SWEETALERT2
import { toastAlert, notSignedinAlert } from '../../alerts';
//STYLISH-LOADING
import Loading from '../_stylishLoading/Loading';
//STYLISH-READMODAL
import ReadModal from '../_stylishReadModal/ReadModal';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
//APPSYNC-MUTATIONS
import { handleCreateRestaurantuserreviewpersonalization, handleEditRestaurantuserreviewpersonalization, handleDeleteRestaurantuserreviewpersonalization } from '../../appsync_functions/mutations';
//APPSYNC-QUERIES
import { fetchAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId, fetchAllRestaurants /* for grap particular restaurant's name only */ } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnRestaurantuserreview, subscribeOnRestaurantuserreviewpersonalization, subscribeOnRestaurant } from '../../appsync_functions/subscriptions';


const truncate = (str: string, n: number) => str?.length > n ? `${str.substr(0, n-1)}` : str;


type ReviewsListProps = {
    id: string;
}

function ReviewsList({
    id
}: ReviewsListProps) {
    const isUserSignedin = useSelector(selectIsUserSignedin);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);
    const holdNameOfUserUntilSignedIn = useSelector(selectHoldNameOfUserUntilSignedIn);


    //fetching data from APPSYNC
    const [ all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId, setAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId ] = useState<any>(false);
    const [ allRestaurants, setAllRestaurants ] = useState<any>(false);
    useEffect(() => {
        /* in case of user is currently SignedIn in the application */
        if(isUserSignedin) {
            const fetchFunction1 = async() => {
                setAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(
                    await fetchAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId({
                        id    : id,
                        hisId : holdIdOfUserUntilSignedIn
                    })
                );
            }
            //fetching for first time
            fetchFunction1();
            //'subscription' for first time
            subscribeOnRestaurantuserreview(fetchFunction1);
            subscribeOnRestaurantuserreviewpersonalization(fetchFunction1);
        }
        /* in case of user is currently SignedIn in the application */
        else {
            const fetchFunction1 = async() => {
                setAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(
                    await fetchAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId({
                        id    : id,
                        hisId : "" /* api trick ( getting only reviews no need of personalizations because used not SignedIn ) */
                    })
                );
            }
            //fetching for first time
            fetchFunction1();
            //'subscription' for first time
            subscribeOnRestaurantuserreview(fetchFunction1);            
        }


        /* for grap particular restaurant's name only */
        const fetchFunction2 = async() => {
            setAllRestaurants(await fetchAllRestaurants());
        }
        //fetching for first time
        fetchFunction2();
        //'subscription' for first time
        subscribeOnRestaurant(fetchFunction2);            
        /* for grap particular restaurant's name only */
    }, []);
    //fetching data from APPSYNC
    

    const screen510 = useMediaQuery('(max-width:510px)');

   
    return (
        <Grid
            container
            className="reviewslist bg-light rounded border border-warning border-3 w-100"
            style={{ display: (
                all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId === null
             || all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId?.length === 0
             || allRestaurants === null
              ) ? `none` : `block` 
            }}
        >
            {
                (
                    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId === false
                 || allRestaurants === false
                ) ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Loading
                            sentence="Loading"
                        />
                    </div>
                ) : (
                    <Grid item xs={12}>
                        <Typography gutterBottom id="fontfam" className="d-flex justify-content-center w-100 fw-bold mt-4" style={{ fontSize: "1.415rem", letterSpacing: 0.555, wordSpacing: 0.425 }}>
                            Restaurant's Reviews
                        </Typography>
        
                        <div className="w-100 h-100">
                            <List dense={false}>
                                {
                                    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId
                                    ?.map(({
                                        r_id,
                                        r_restaurantId_ExistInRestaurantsTable,
                                        r_userId_ExistInUsersTable,
                                        r_userName_ExistInUsersTable,
                                        r_text,
                                        /* in case of user is currently SignedIn in the application */
                                        p_id,                             //nullable   ( if user not SignedIn OR user is SingnedIn but his personalization not exist so mymsql retrun null )
                                        p_reviewId_ExistInReviewsTable,   //nullable   ( if user not SignedIn OR user is SingnedIn but his personalization not exist so mymsql retrun null )
                                        p_userId_ExistInUsersTable,       //nullable   ( if user not SignedIn OR user is SingnedIn but his personalization not exist so mymsql retrun null )
                                        p_userName_ExistInUsersTable,     //nullable   ( if user not SignedIn OR user is SingnedIn but his personalization not exist so mymsql retrun null )
                                        p_useful                          //nullable   ( if user not SignedIn OR user is SingnedIn but his personalization not exist so mymsql retrun null )
                                        /* in case of user is currently SignedIn in the application */
                                    }) => (
                                        <Zoom>
                                        <div key={r_id} className="d-flex flex-column">
                                            <ListItem className="mt-3">
                                                <ListItemAvatar style={{ display: screen510 ? "none" : "block" }}>
                                                    <Avatar style={{ height: '2rem', width: '2rem', backgroundColor: 'rgba(247, 202, 24, 1)' }}>
                                                        <StarIcon fontSize="small" style={{ color: 'rgba(207, 0, 15, 1)' }}/>
                                                    </Avatar>
                                                </ListItemAvatar>
    
                                                <ListItemText
                                                    style={{ marginLeft: screen510 ? "-0.1rem" : "-0.7rem" }}
                                                    primaryTypographyProps={{
                                                        style: {
                                                            fontSize: "0.85rem"
                                                        }
                                                    }}
                                                    primary={
                                                        r_text.length > 12
                                                        ?
                                                        <> {truncate(r_text, 12)} <ReadModal title="review" notes={r_text}/> </>
                                                        :
                                                        r_text
                                                    }
                                                />
        
                                                <div className="mt-3">
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            onClick={async() => {
                                                                if(isUserSignedin) {
                                                                /* in case of user is currently SignedIn in the application */
                                                                    if( /* means SignedIn user not personalized */
                                                                        p_userId_ExistInUsersTable === null
                                                                        /* additional check for create */
                                                                     && p_useful === null
                                                                    ) {
                                                                        await handleCreateRestaurantuserreviewpersonalization({
                                                                            idFrom  : r_restaurantId_ExistInRestaurantsTable,
                                                                            idTo    : r_id,
                                                                            hisId   : holdIdOfUserUntilSignedIn,
                                                                            hisName : holdNameOfUserUntilSignedIn,
                                                                            useful  : true  /* liked */
                                                                        })


                                                                        //calling alert
                                                                        toastAlert('Liking..', 'top-start', 'info');
                                                                    }

                                                                    else if(
                                                                        /* means SignedIn user have personalized */
                                                                        p_userId_ExistInUsersTable === holdIdOfUserUntilSignedIn
                                                                        /* additional check for edit */
                                                                     && p_useful === false
                                                                    ) {
                                                                        await handleEditRestaurantuserreviewpersonalization({
                                                                            idFrom : r_restaurantId_ExistInRestaurantsTable,
                                                                            idTo   : r_id,
                                                                            hisId  : holdIdOfUserUntilSignedIn,
                                                                            useful : true  /* liked */
                                                                        })


                                                                        //calling alert
                                                                        toastAlert('Liking..', 'top-start', 'info');
                                                                    }

                                                                    else if(
                                                                        /* current personalization givenby SignedIn user matches & is liked already */
                                                                        (p_userId_ExistInUsersTable === holdIdOfUserUntilSignedIn)
                                                                     && (p_userName_ExistInUsersTable === holdNameOfUserUntilSignedIn)
                                                                     && (p_useful === true)
                                                                    ) {
                                                                        await handleDeleteRestaurantuserreviewpersonalization({
                                                                            idFrom : r_restaurantId_ExistInRestaurantsTable,
                                                                            idTo   : r_id,
                                                                            hisId  : holdIdOfUserUntilSignedIn
                                                                        })


                                                                        //calling alert
                                                                        toastAlert('Undo..', 'top-start', 'info');
                                                                    }
                                                                /* in case of user is currently SignedIn in the application */
                                                                }
                                                                else {
                                                                    notSignedinAlert();
                                                                }
                                                            }}
                                                        >
                                                            <ThumbUpAltIcon
                                                                fontSize="small"
                                                                style={
                                                                     /* if user is SignedIn & current review givenby same user matches & is liked */
                                                                     /* not his review but it is his personalization & if he liked already */
                                                                    (p_userId_ExistInUsersTable === holdIdOfUserUntilSignedIn)
                                                                 && (p_userName_ExistInUsersTable === holdNameOfUserUntilSignedIn)
                                                                 && (p_useful === true)                                                                        
                                                                    ? { color: '#0d6efd' } : {}
                                                                }
                                                            />
                                                        </IconButton>
            
                                                        <IconButton
                                                            onClick={async() => {
                                                                if(isUserSignedin) {
                                                                    /* in case of user is currently SignedIn in the application */
                                                                    if( /* means SignedIn user not personalized */
                                                                        p_userId_ExistInUsersTable === null
                                                                        /* additional check for create */
                                                                     && p_useful === null
                                                                    ) {
                                                                        await handleCreateRestaurantuserreviewpersonalization({
                                                                            idFrom  : r_restaurantId_ExistInRestaurantsTable,
                                                                            idTo    : r_id,
                                                                            hisId   : holdIdOfUserUntilSignedIn,
                                                                            hisName : holdNameOfUserUntilSignedIn,
                                                                            useful  : false  /* disliked */
                                                                        })


                                                                        //calling alert
                                                                        toastAlert('Disliking..', 'top-start', 'info');
                                                                    }

                                                                    else if(
                                                                        /* means SignedIn user have personalized */
                                                                        p_userId_ExistInUsersTable === holdIdOfUserUntilSignedIn
                                                                        /* additional check for edit */
                                                                     && p_useful === true
                                                                    ) {
                                                                        await handleEditRestaurantuserreviewpersonalization({
                                                                            idFrom : r_restaurantId_ExistInRestaurantsTable,
                                                                            idTo   : r_id,
                                                                            hisId  : holdIdOfUserUntilSignedIn,
                                                                            useful : false  /* disliked */
                                                                        })


                                                                        //calling alert
                                                                        toastAlert('Disliking..', 'top-start', 'info');
                                                                    }

                                                                    else if(
                                                                        /* current personalization givenby SignedIn user matches & is liked already */
                                                                        (p_userId_ExistInUsersTable === holdIdOfUserUntilSignedIn)
                                                                     && (p_userName_ExistInUsersTable === holdNameOfUserUntilSignedIn)
                                                                     && (p_useful === false)
                                                                    ) {
                                                                        await handleDeleteRestaurantuserreviewpersonalization({
                                                                            idFrom : r_restaurantId_ExistInRestaurantsTable,
                                                                            idTo   : r_id,
                                                                            hisId  : holdIdOfUserUntilSignedIn
                                                                        })


                                                                        //calling alert
                                                                        toastAlert('Undo..', 'top-start', 'info');                                                                                        
                                                                    }
                                                                /* in case of user is currently SignedIn in the application */
                                                                }
                                                                else {
                                                                    notSignedinAlert();
                                                                }
                                                            }}
                                                        >
                                                            <ThumbDownAltIcon
                                                                fontSize="small"
                                                                style={
                                                                   /* if user is SignedIn & current personalization givenby same user matches & is unliked */
                                                                   /* not his personal review but his personalization & if he unliked already */
                                                                   (p_userId_ExistInUsersTable === holdIdOfUserUntilSignedIn)
                                                                && (p_userName_ExistInUsersTable === holdNameOfUserUntilSignedIn)
                                                                && (p_useful === false)
                                                                   ? { color: '#0d6efd' } : {}
                                                                }
                                                            />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </div>
                                            </ListItem>

                                            <div className="d-flex justify-content-end w-100" id="fontfam">
                                                <button
                                                    className="btn btn-link ms-5"
                                                    id="stylelikeanchor"
                                                    onClick={() => {                /* for grap particular restaurant's name only */ 
                                                        navigate(`/restaurantprofile/${allRestaurants.filter(({id}) => id === r_restaurantId_ExistInRestaurantsTable)[0].name}`);
                                                    }}
                                                >
                                                                                  { /* for grap particular restaurant's name only */ }
                                                    —<cite>{allRestaurants.filter(({id}) => id === r_restaurantId_ExistInRestaurantsTable)[0].name}</cite>
                                                </button>
                                            </div>
                                        </div>
                                        </Zoom>
                                    ))
                                }
                            </List>
                        </div>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default ReviewsList;